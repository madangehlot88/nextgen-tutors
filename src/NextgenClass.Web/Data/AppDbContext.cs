using Microsoft.EntityFrameworkCore;
using NextgenClass.Web.Models;

namespace NextgenClass.Web.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Tutor> Tutors => Set<Tutor>();
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Inquiry> Inquiries => Set<Inquiry>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tutor>(e =>
        {
            e.ToTable("tutors");
            e.HasKey(t => t.Id);
            e.Property(t => t.Name).HasMaxLength(100).IsRequired();
            e.Property(t => t.ContactNo).HasMaxLength(15).IsRequired();
            e.Property(t => t.Email).HasMaxLength(200).IsRequired();
            e.Property(t => t.Subject).HasMaxLength(100).IsRequired();
            e.Property(t => t.ClassToTeach).HasMaxLength(200).IsRequired();
        });

        modelBuilder.Entity<Student>(e =>
        {
            e.ToTable("students");
            e.HasKey(s => s.Id);
            e.Property(s => s.Name).HasMaxLength(100).IsRequired();
            e.Property(s => s.ContactNo).HasMaxLength(15).IsRequired();
            e.Property(s => s.ClassName).HasMaxLength(50).IsRequired();
            e.Property(s => s.Subject).HasMaxLength(100).IsRequired();
        });

        modelBuilder.Entity<Inquiry>(e =>
        {
            e.ToTable("inquiries");
            e.HasKey(i => i.Id);
            e.Property(i => i.Name).HasMaxLength(100).IsRequired();
            e.Property(i => i.Email).HasMaxLength(200).IsRequired();
            e.Property(i => i.Phone).HasMaxLength(15);
            e.Property(i => i.Message).HasMaxLength(1000).IsRequired();
        });

        modelBuilder.Entity<AdminUser>(e =>
        {
            e.ToTable("admin_users");
            e.HasKey(a => a.Id);
            e.Property(a => a.Username).HasMaxLength(50).IsRequired();
            e.Property(a => a.PasswordHash).HasMaxLength(200).IsRequired();

            // Seed super admin: username=admin, password=Admin@123
            e.HasData(new AdminUser
            {
                Id = 1,
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123")
            });
        });
    }
}
