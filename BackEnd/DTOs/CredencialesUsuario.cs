using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs;
public class CredencialesUsuario
{
    [EmailAddress]
    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}