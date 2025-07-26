using Npgsql;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddScoped<IDbConnection>(db => new NpgsqlConnection(connectionString));
builder.Services.AddControllers();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost",       
                                "http://localhost:3000",    // React local
                                "http://localhost:5173",    // Vite  local
                                "https://koykolu.com")      // PROD
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
// --- CORS servisini ekleme BÝTÝÞ ---

// Learn more about configuring OpenAPI at https://aka.ms/aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();