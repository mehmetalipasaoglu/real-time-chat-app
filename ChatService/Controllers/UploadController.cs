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
        private readonly MongoDbService _mongoDbService;

        public UploadController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var fileData = new byte[file.Length];
            using (var stream = file.OpenReadStream())
            {
                await stream.ReadAsync(fileData, 0, (int)file.Length);
            }

            var fileDocument = new BsonDocument
            {
                { "FileName", file.FileName },
                { "ContentType", file.ContentType },
                { "Data", new BsonBinaryData(fileData) }
            };

            await _mongoDbService.UploadedFiles.InsertOneAsync(fileDocument);

            var fileId = fileDocument["_id"].AsObjectId.ToString();
            var fileUrl = $"{Request.Scheme}://{Request.Host}/api/upload/{fileId}";
            return Ok(new { url = fileUrl, fileName=file.FileName });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(string id)
        {
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
