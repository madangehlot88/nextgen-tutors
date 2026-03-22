using Microsoft.EntityFrameworkCore;
using NextgenClass.Web.Data;
using NextgenClass.Web.Dtos;
using NextgenClass.Web.Models;

namespace NextgenClass.Web.Endpoints;

public static class TutorEndpoints
{
    public static void MapTutorEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/tutors").WithTags("Tutors");

        group.MapPost("/", async (TutorRegistrationDto dto, AppDbContext db) =>
        {
            var tutor = new Tutor
            {
                Name = dto.Name,
                ContactNo = dto.ContactNo,
                Email = dto.Email,
                Subject = dto.Subject,
                ExperienceYears = dto.ExperienceYears,
                ClassToTeach = dto.ClassToTeach,
                CreatedAt = DateTime.UtcNow
            };
            db.Tutors.Add(tutor);
            await db.SaveChangesAsync();
            return Results.Created($"/api/tutors/{tutor.Id}", tutor);
        });

        group.MapGet("/", async (AppDbContext db) =>
            Results.Ok(await db.Tutors.OrderByDescending(t => t.CreatedAt).ToListAsync()))
            .RequireAuthorization();

        group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
        {
            var tutor = await db.Tutors.FindAsync(id);
            if (tutor is null) return Results.NotFound();
            db.Tutors.Remove(tutor);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }).RequireAuthorization();
    }
}
