using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChatService.Models
{
    public class Message
    {
        // Mesaj ID'si, MongoDB ObjectId
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Id alanını nullable yapıyoruz

        // Sohbet odası
        [BsonElement("ChatRoom")]
        public string ChatRoom { get; set; } = null!;

        // Kullanıcı adı
        [BsonElement("UserName")]
        public string UserName { get; set; } = null!;

        // Mesaj içeriği
        [BsonElement("Content")]
        public string Content { get; set; } = null!;

        // Mesajın zaman damgası
        [BsonElement("Timestamp")]
        public DateTime Timestamp { get; set; }
    }
}
