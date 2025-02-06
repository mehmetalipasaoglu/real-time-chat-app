using Microsoft.AspNetCore.Mvc;
using ChatService.DataService;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        // MongoDbService nesnesi
        private readonly MongoDbService _mongoDbService;

        // Yapıcı metot, MongoDbService nesnesini enjekte ediyor.
        public UploadController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // Dosya yükleme metodu
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] IFormFile file)
        {
            // Dosya doğrulaması
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Dosya verilerini okuma
            var fileData = new byte[file.Length];
            using (var stream = file.OpenReadStream())
            {
                await stream.ReadAsync(fileData, 0, (int)file.Length);
            }

            // Dosya bilgilerini MongoDB'ye kaydetme
            var fileDocument = new BsonDocument
            {
                { "FileName", file.FileName },
                { "ContentType", file.ContentType },
                { "Data", new BsonBinaryData(fileData) }
            };

            await _mongoDbService.UploadedFiles.InsertOneAsync(fileDocument);

            // Dosya URL'sini döndürme
            var fileId = fileDocument["_id"].AsObjectId.ToString();
            var fileUrl = $"{Request.Scheme}://{Request.Host}/api/upload/{fileId}";
            return Ok(new { url = fileUrl, fileName=file.FileName });
        }

        // Dosya indirme metodu
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(string id)
        {
            // Dosya ID'si ile dosya verilerini getirme
            var fileObjectId = new ObjectId(id);
            var filter = Builders<BsonDocument>.Filter.Eq("_id", fileObjectId);
            var fileDocument = await _mongoDbService.UploadedFiles.Find(filter).FirstOrDefaultAsync();

            if (fileDocument == null)
                return NotFound();

            var fileData = fileDocument["Data"].AsByteArray;
            return File(fileData, fileDocument["ContentType"].AsString, fileDocument["FileName"].AsString);
        }
    }
}
