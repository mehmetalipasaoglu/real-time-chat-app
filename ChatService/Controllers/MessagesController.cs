using Microsoft.AspNetCore.Mvc;
using ChatService.Models;
using ChatService.DataService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        // MongoDbService nesnesi
        private readonly MongoDbService _mongoDbService;

        // Yapıcı metot, MongoDbService nesnesini enjekte ediyor.
        public MessagesController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // Belirli bir odadaki mesajları getiren metot
        [HttpGet("{room}")]
        public async Task<ActionResult<List<Message>>> GetMessages(string room)
        {
            // Mesajları veritabanından alıyoruz
            var messages = await _mongoDbService.GetMessagesAsync(room);
            return Ok(messages); // Mesajları döndürme
        }
    }
}
