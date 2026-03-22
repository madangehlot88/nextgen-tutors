using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using NextgenClass.Web.Data;
using NextgenClass.Web.Dtos;
using NextgenClass.Web.Services;

namespace NextgenClass.Web.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Auth");

        group.MapPost("/login", async (LoginDto dto, AppDbContext db, IAuthService authService) =>
        {
            var admin = await db.AdminUsers.FirstOrDefaultAsync(a => a.Username == dto.Username);
            if (admin is null || !authService.VerifyPassword(dto.Password, admin.PasswordHash))
                return Results.Unauthorized();

            var token = authService.GenerateToken(admin.Username);
            return Results.Ok(new { token, username = admin.Username });
        });

        group.MapGet("/me", (ClaimsPrincipal user) =>
        {
            return Results.Ok(new { username = user.Identity?.Name });
        }).RequireAuthorization();
    }
}
