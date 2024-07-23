using ChatService.DataService;
using ChatService.Hubs;
using ChatService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<DatabaseSettings>(
    builder.Configuration.GetSection("DatabaseSettings"));

builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt => {
    opt.AddPolicy("reactApp", policy => {
        policy.WithOrigins("http://localhost:5173")
        .AllowCredentials()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddSingleton<SharedDb>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("reactApp");

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");

app.Run();
