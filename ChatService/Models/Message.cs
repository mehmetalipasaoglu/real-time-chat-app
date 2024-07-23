using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChatService.Models
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Id alanını nullable yapıyoruz

        [BsonElement("ChatRoom")]
        public string ChatRoom { get; set; } = null!;

        [BsonElement("UserName")]
        public string UserName { get; set; } = null!;

        [BsonElement("Content")]
        public string Content { get; set; } = null!;

        [BsonElement("Timestamp")]
        public DateTime Timestamp { get; set; }
    }
}
