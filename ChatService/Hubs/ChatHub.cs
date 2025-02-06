using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChatService.Models;
using ChatService.DataService;
using System;
using System.Collections.Concurrent;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        // MongoDbService sınıfından bir örnek alıyoruz.
        private readonly MongoDbService _mongoDbService;

        // Online kullanıcıları tutmak için bir ConcurrentDictionary kullanıyoruz.
        private static readonly ConcurrentDictionary<string, string> OnlineUsers = new();

        // Yapıcı metot, MongoDbService nesnesini enjekte ediyor.
        public ChatHub(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // Bağlantı kurulduğunda çağrılan metot.
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        // Bağlantı kesildiğinde çağrılan metot.
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Bağlantı id'sine göre kullanıcıyı ve bağlantısını listelerden kaldırıyoruz.
            _mongoDbService.Connections.TryRemove(Context.ConnectionId, out _);
            OnlineUsers.TryRemove(Context.ConnectionId, out _);
            
            // Tüm kullanıcıların listesini güncelliyoruz.
            await Clients.All.SendAsync("UpdateUserList", OnlineUsers.Values);
            await base.OnDisconnectedAsync(exception);
        }

        // Belirli bir sohbet odasına katılmak için kullanılan metot.
        public async Task JoinSpecificChatRoom(UserConnection userConnection)
        {
            // Kullanıcıyı belirtilen gruba ekliyoruz.
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
            
            // Kullanıcının bağlantı bilgilerini ve adını saklıyoruz.
            _mongoDbService.Connections[Context.ConnectionId] = userConnection;
            OnlineUsers[Context.ConnectionId] = userConnection.Username;

            // Geçmiş mesajları alıyoruz ve kullanıcıya gönderiyoruz.
            var messages = await _mongoDbService.GetMessagesAsync(userConnection.ChatRoom);
            foreach (var message in messages)
            {
                await Clients.Caller.SendAsync("ReceiveSpecificMessage", message.UserName, message.Content, message.Timestamp);
            }

            // Tüm kullanıcıların listesini güncelliyoruz.
            await Clients.All.SendAsync("UpdateUserList", OnlineUsers.Values);
        }
        // Mesaj göndermek için kullanılan metot.
        public async Task SendMessage(string message)
        {
            // Kullanıcının bağlantı bilgilerini alıyoruz.
            if (_mongoDbService.Connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                var timestamp = DateTime.Now;
                
                // Yeni bir mesaj oluşturuyoruz.
                var chatMessage = new Message
                {
                    ChatRoom = userConnection.ChatRoom,
                    UserName = userConnection.Username, // Doğru kullanıcı adını alıyoruz
                    Content = message,
                    Timestamp = timestamp
                };

                // Mesajı veritabanına ekliyoruz.
                await _mongoDbService.AddMessageAsync(chatMessage);

                // Mesajı gruba (sohbet odasına) gönderiyoruz.
                await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveSpecificMessage", userConnection.Username, message, timestamp);
            }
        }
    }
}
