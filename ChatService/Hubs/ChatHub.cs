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
        private readonly MongoDbService _mongoDbService;
        private static readonly ConcurrentDictionary<string,string> OnlineUsers = new();

        public ChatHub(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _mongoDbService.Connections.TryRemove(Context.ConnectionId, out _);
            OnlineUsers.TryRemove(Context.ConnectionId, out _);
            await Clients.All.SendAsync("UpdateUserList", OnlineUsers.Values);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinSpecificChatRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
            _mongoDbService.Connections[Context.ConnectionId] = userConnection;
            OnlineUsers[Context.ConnectionId] = userConnection.Username;

            var messages = await _mongoDbService.GetMessagesAsync(userConnection.ChatRoom);
            foreach (var message in messages)
            {
                await Clients.Caller.SendAsync("ReceiveSpecificMessage", message.UserName, message.Content, message.Timestamp);
            }
            
            await Clients.All.SendAsync("UpdateUserList", OnlineUsers.Values);
        }

        public async Task LeaveSpecificChatRoom(UserConnection userConnection)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
            _mongoDbService.Connections.TryRemove(Context.ConnectionId, out _);
            OnlineUsers.TryRemove(Context.ConnectionId, out _);
            
            await Clients.All.SendAsync("UpdateUserList", OnlineUsers.Values);
        }

        public async Task SendMessage(string message)
        {
            if (_mongoDbService.Connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                var timestamp = DateTime.Now;
                var chatMessage = new Message
                {
                    ChatRoom = userConnection.ChatRoom,
                    UserName = userConnection.Username, // Doğru kullanıcı adını alıyoruz
                    Content = message,
                    Timestamp = timestamp
                };

                await _mongoDbService.AddMessageAsync(chatMessage);

                await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveSpecificMessage", userConnection.Username, message, timestamp);
            }
        }
    }
}
