using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ChatService.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Username")]
        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; set; } = null!;

        [BsonElement("Password")]
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = null!;
    }
}
