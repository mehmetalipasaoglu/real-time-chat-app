using System.Collections.Concurrent;
using ChatService.Models;

namespace ChatService.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections;
        private readonly ConcurrentDictionary<string, ConcurrentQueue<string>> _chatHistories;

        public SharedDb()
        {
            _connections = new ConcurrentDictionary<string, UserConnection>();
            _chatHistories = new ConcurrentDictionary<string, ConcurrentQueue<string>>();
        }

        public ConcurrentDictionary<string, UserConnection> Connections => _connections;

        public ConcurrentDictionary<string, ConcurrentQueue<string>> ChatHistories => _chatHistories;
    }
}
