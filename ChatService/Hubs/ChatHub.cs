using ChatService.Models;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using ChatService.DataService;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;

        public ChatHub(SharedDb shared)
        {
            _shared = shared;
        }

        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("JoinSpecificChatRoom", "admin", $"{conn.Username} has joined the chat");
        }

        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            _shared.Connections[Context.ConnectionId] = conn;

            // Ensure the chat history dictionary has an entry for this room
            _shared.ChatHistories.TryAdd(conn.ChatRoom, new ConcurrentQueue<string>());

            // Send join message to room
            await Clients.Group(conn.ChatRoom).SendAsync("JoinSpecificChatRoom", "admin", $"{conn.Username} has joined the chat room {conn.ChatRoom}");

            // Send chat history to the user who just joined
            if (_shared.ChatHistories.TryGetValue(conn.ChatRoom, out var chatHistory))
            {
                foreach (var message in chatHistory)
                {
                    await Clients.Client(Context.ConnectionId).SendAsync("ReceiveSpecificMessage", "admin", message);
                }
            }
        }

        public async Task SendMessage(string message)
        {
            if (_shared.Connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom).SendAsync("ReceiveSpecificMessage", conn.Username, message);

                // Store message in chat history
                if (_shared.ChatHistories.TryGetValue(conn.ChatRoom, out var chatHistory))
                {
                    chatHistory.Enqueue($"{conn.Username}: {message}");
                }
            }
        }
    }
}
