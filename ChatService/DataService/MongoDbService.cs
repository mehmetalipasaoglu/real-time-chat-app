using ChatService.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Concurrent;

namespace ChatService.DataService
{
    public class MongoDbService
    {
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Message> _messages;
        private readonly IMongoCollection<BsonDocument> _uploadedFiles;
        // Kullanıcı bağlantılarını tutan veri yapısı
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
        public MongoDbService(IOptions<DatabaseSettings> databaseSettings)
        {
            // MongoDB istemcisini başlatma
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            // Kullanıcı koleksiyonunu tanımlama
            _users = mongoDatabase.GetCollection<User>(databaseSettings.Value.UsersCollectionName);
            // Mesaj koleksiyonunu tanımlama
            _messages = mongoDatabase.GetCollection<Message>("Messages");
            // Yüklenen dosyalar koleksiyonunu tanımlama
            _uploadedFiles = mongoDatabase.GetCollection<BsonDocument>("UploadedFiles");
        }
        public ConcurrentDictionary<string, UserConnection> Connections => _connections;
        public IMongoCollection<BsonDocument> UploadedFiles => _uploadedFiles;

        // Belirtilen kullanıcı adını içeren kullanıcıyı alma
        public async Task<User> GetUserAsync(string username) =>
            await _users.Find(x => x.Username == username).FirstOrDefaultAsync();

        // Yeni kullanıcı oluşturma
        public async Task CreateUserAsync(User user) =>
            await _users.InsertOneAsync(user);

        // Belirtilen sohbet odasındaki mesajları alma
        public async Task<List<Message>> GetMessagesAsync(string chatRoom)
        {
            return await _messages.Find(m => m.ChatRoom == chatRoom).ToListAsync();
        }
        // Yeni mesaj ekleme
        public async Task AddMessageAsync(Message message) =>
            await _messages.InsertOneAsync(message);
    }
}
