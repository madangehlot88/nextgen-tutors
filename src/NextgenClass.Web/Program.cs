using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NextgenClass.Web.Data;
using NextgenClass.Web.Endpoints;
using NextgenClass.Web.Services;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Authentication
var jwtKey = builder.Configuration["Jwt:Key"]!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Auto-migrate database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseAuthentication();
app.UseAuthorization();

// API Endpoints
app.MapTutorEndpoints();
app.MapStudentEndpoints();
app.MapInquiryEndpoints();
app.MapAuthEndpoints();

// Dashboard stats
app.MapGet("/api/dashboard/stats", async (AppDbContext db) =>
{
    var tutors = await db.Tutors.CountAsync();
    var students = await db.Students.CountAsync();
    var inquiries = await db.Inquiries.CountAsync();
    return Results.Ok(new { tutors, students, inquiries });
}).RequireAuthorization();

// Serve React SPA
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();
