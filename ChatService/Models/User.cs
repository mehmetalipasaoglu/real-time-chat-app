using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ChatService.Models
{
    public class User
    {
        // Kullanıcı ID'si, MongoDB ObjectId
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        // Kullanıcı adı
        [BsonElement("Username")]
        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; set; } = null!;

        // Kullanıcı parolası
        [BsonElement("Password")]
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = null!;
    }
}
