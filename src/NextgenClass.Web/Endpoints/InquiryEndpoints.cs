using Microsoft.EntityFrameworkCore;
using NextgenClass.Web.Data;
using NextgenClass.Web.Dtos;
using NextgenClass.Web.Models;

namespace NextgenClass.Web.Endpoints;

public static class InquiryEndpoints
{
    public static void MapInquiryEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/inquiries").WithTags("Inquiries");

        group.MapPost("/", async (InquiryDto dto, AppDbContext db) =>
        {
            var inquiry = new Inquiry
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };
            db.Inquiries.Add(inquiry);
            await db.SaveChangesAsync();
            return Results.Created($"/api/inquiries/{inquiry.Id}", inquiry);
        });

        group.MapGet("/", async (AppDbContext db) =>
            Results.Ok(await db.Inquiries.OrderByDescending(i => i.CreatedAt).ToListAsync()))
            .RequireAuthorization();

        group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
        {
            var inquiry = await db.Inquiries.FindAsync(id);
            if (inquiry is null) return Results.NotFound();
            db.Inquiries.Remove(inquiry);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }).RequireAuthorization();
    }
}
