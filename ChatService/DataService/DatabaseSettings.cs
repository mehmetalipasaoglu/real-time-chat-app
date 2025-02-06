namespace ChatService.Models
{
    public class DatabaseSettings
    {
        // Veritabanı bağlantı dizesi
        public string ConnectionString { get; set; } = null!;
        // Veritabanı adı
        public string DatabaseName { get; set; } = null!;
        // Kullanıcı koleksiyonunun adı
        public string UsersCollectionName { get; set; } = null!;
    }
}
