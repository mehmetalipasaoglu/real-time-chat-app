using System.Collections.Concurrent;
using ChatService.Models;
using System;

namespace ChatService.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
        private readonly ConcurrentDictionary<string, ConcurrentQueue<(string User, string Message, DateTime Timestamp)>> _messages = new();

        public ConcurrentDictionary<string, UserConnection> Connections => _connections;
        public ConcurrentDictionary<string, ConcurrentQueue<(string User, string Message, DateTime Timestamp)>> Messages => _messages;
    }
}
