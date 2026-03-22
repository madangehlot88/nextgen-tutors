using Microsoft.EntityFrameworkCore;
using NextgenClass.Web.Data;
using NextgenClass.Web.Dtos;
using NextgenClass.Web.Models;

namespace NextgenClass.Web.Endpoints;

public static class StudentEndpoints
{
    public static void MapStudentEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/students").WithTags("Students");

        group.MapPost("/", async (StudentRegistrationDto dto, AppDbContext db) =>
        {
            var student = new Student
            {
                Name = dto.Name,
                ContactNo = dto.ContactNo,
                ClassName = dto.ClassName,
                Subject = dto.Subject,
                CreatedAt = DateTime.UtcNow
            };
            db.Students.Add(student);
            await db.SaveChangesAsync();
            return Results.Created($"/api/students/{student.Id}", student);
        });

        group.MapGet("/", async (AppDbContext db) =>
            Results.Ok(await db.Students.OrderByDescending(s => s.CreatedAt).ToListAsync()))
            .RequireAuthorization();

        group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
        {
            var student = await db.Students.FindAsync(id);
            if (student is null) return Results.NotFound();
            db.Students.Remove(student);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }).RequireAuthorization();
    }
}
