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
        private readonly MongoDbService _mongoDbService;

        public AuthController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _mongoDbService.GetUserAsync(user.Username);
            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            user.Password = HashPassword(user.Password);
            await _mongoDbService.CreateUserAsync(user);

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (user == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _mongoDbService.GetUserAsync(user.Username);
            if (existingUser == null || !VerifyPassword(user.Password, existingUser.Password))
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok("Login successful.");
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(bytes).Replace("-", "").ToLower();
            }
        }

        private bool VerifyPassword(string inputPassword, string storedHash)
        {
            var inputHash = HashPassword(inputPassword);
            return inputHash == storedHash;
        }
    }
}
