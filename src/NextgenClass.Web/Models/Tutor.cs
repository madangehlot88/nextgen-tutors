namespace NextgenClass.Web.Models;

public class Tutor
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ContactNo { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public int ExperienceYears { get; set; }
    public string ClassToTeach { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
