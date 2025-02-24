using Microsoft.AspNetCore.Identity;

namespace BackEnd.Entities;

public class ApplicationUser : IdentityUser
{
    public bool PasswordReset { get; set; } = false;
    public bool Active { get; set; } = true;
}