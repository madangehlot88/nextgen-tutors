using System.ComponentModel.DataAnnotations;

namespace NextgenClass.Web.Dtos;

public class TutorRegistrationDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(15)]
    public string ContactNo { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Subject { get; set; } = string.Empty;

    [Range(0, 50)]
    public int ExperienceYears { get; set; }

    [Required, MaxLength(200)]
    public string ClassToTeach { get; set; } = string.Empty;
}
