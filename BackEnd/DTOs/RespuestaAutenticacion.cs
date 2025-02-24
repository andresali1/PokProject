using System;

namespace BackEnd.DTOs;
public class RespuestaAutenticacion
{
    public string Token { get; set; }
    public DateTime Expiracion { get; set; }
    public bool PasswordReset { get; set; }
}