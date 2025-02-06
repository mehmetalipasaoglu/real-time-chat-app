using ChatService.DataService;
using ChatService.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;

namespace ChatService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // MongoDbService nesnesi
        private readonly MongoDbService _mongoDbService;

        // Yapıcı metot, MongoDbService nesnesini enjekte ediyor.
        public AuthController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // Kullanıcı kayıt metodu
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            // Kullanıcı verisi doğrulanıyor
            if (user == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kullanıcının varlığı kontrol ediliyor
            var existingUser = await _mongoDbService.GetUserAsync(user.Username);
            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            // Kullanıcı parolası hashleniyor ve kullanıcı oluşturuluyor
            user.Password = HashPassword(user.Password);
            await _mongoDbService.CreateUserAsync(user);

            return Ok("User registered successfully.");
        }

        // Kullanıcı giriş metodu
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            // Kullanıcı verisi doğrulanıyor
            if (user == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kullanıcı varlığı ve parolası kontrol ediliyor
            var existingUser = await _mongoDbService.GetUserAsync(user.Username);
            if (existingUser == null || !VerifyPassword(user.Password, existingUser.Password))
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok("Login successful.");
        }

        // Parola hashleme fonksiyonu
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(bytes).Replace("-", "").ToLower();
            }
        }

        // Parola doğrulama fonksiyonu
        private bool VerifyPassword(string inputPassword, string storedHash)
        {
            var inputHash = HashPassword(inputPassword);
            return inputHash == storedHash;
        }
    }
}
