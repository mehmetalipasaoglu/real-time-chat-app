using ChatService.DataService;
using ChatService.Hubs;
using ChatService.Models;

var builder = WebApplication.CreateBuilder(args);

// Veritabanı ayarlarını yapılandırma
builder.Services.Configure<DatabaseSettings>(
    builder.Configuration.GetSection("DatabaseSettings"));

// MongoDbService sınıfını singleton olarak ekleme
builder.Services.AddSingleton<MongoDbService>();

// SignalR hizmetlerini ekleme (Gerçek zamanlı iletişim)
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // API dökümantasyonu için Swagger ekleme

// CORS ayarları
builder.Services.AddCors(opt => {
    opt.AddPolicy("reactApp", policy => {
        policy.WithOrigins("http://localhost:5173")
        .AllowCredentials()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

// SharedDb hizmetini singleton olarak ekleme
// builder.Services.AddSingleton<SharedDb>();

var app = builder.Build();

// Geliştirme ortamında Swagger'ı etkinleştirme
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("reactApp"); // CORS politikasını uygulama
app.UseAuthorization(); // Yetkilendirme işlemleri

app.MapControllers(); // Kontrolcüleri haritalama
app.MapHub<ChatHub>("/chat"); // ChatHub'ı haritalama

app.Run(); // Uygulamayı çalıştırma
