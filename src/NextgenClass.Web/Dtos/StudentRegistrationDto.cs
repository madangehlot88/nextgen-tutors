using System.ComponentModel.DataAnnotations;

namespace NextgenClass.Web.Dtos;

public class StudentRegistrationDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(15)]
    public string ContactNo { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string ClassName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Subject { get; set; } = string.Empty;
}
