using AutoMapper;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd.Controllers
{
    [Route("api/cuentas")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CuentasController(
            UserManager<IdentityUser> userManager,
            IConfiguration configuration,
            SignInManager<IdentityUser> signInManager,
            ApplicationDbContext context,
            IMapper mapper
        )
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// Método para hacer admin a un usuario
        /// </summary>
        /// <param name="usuarioId"></param>
        /// <returns></returns>
        [HttpPost("hacerAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]
        public async Task<ActionResult> HacerAdmin([FromBody] string usuarioId)
        {
            var usuario = await userManager.FindByIdAsync(usuarioId);
            await userManager.AddClaimAsync(usuario, new Claim("role", "admin"));
            return NoContent();
        }

        /// <summary>
        /// Método para quitar privilegios admin a usuario
        /// </summary>
        /// <param name="usuarioId"></param>
        /// <returns></returns>
        [HttpPost("removerAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]
        public async Task<ActionResult> RemoverAdmin([FromBody] string usuarioId)
        {
            var usuario = await userManager.FindByIdAsync(usuarioId);
            await userManager.RemoveClaimAsync(usuario, new Claim("role", "admin"));
            return NoContent();
        }

        /// <summary>
        /// Método para crear un usuario
        /// </summary>
        /// <param name="credencialesUsuario"></param>
        /// <returns></returns>
        [HttpPost("crear")]
        public async Task<ActionResult<RespuestaAutenticacion>> Crear([FromBody] CredencialesUsuario credencialesUsuario)
        {
            var usuarioExiste = await context.Users.AnyAsync(u => u.Email == credencialesUsuario.Email);

            if(usuarioExiste){
                return BadRequest("Usuario existe");
            }

            var usuario = new IdentityUser { UserName = credencialesUsuario.Email, Email = credencialesUsuario.Email };
            var resultado = await userManager.CreateAsync(usuario, credencialesUsuario.Password);

            if (resultado.Succeeded)
            {
                return await ConstruirToken(credencialesUsuario);
            }
            else
            {
                return BadRequest(resultado.Errors);
            }
        }

        /// <summary>
        /// Método para loguear un usuario
        /// </summary>
        /// <param name="credencialesUsuario"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<ActionResult<RespuestaAutenticacion>> Login([FromBody] CredencialesUsuario credencialesUsuario)
        {
            var resultado = await signInManager.PasswordSignInAsync(credencialesUsuario.Email, credencialesUsuario.Password,
                isPersistent: false, lockoutOnFailure: false);

            if (resultado.Succeeded)
            {
                return await ConstruirToken(credencialesUsuario);
            }
            else
            {
                return BadRequest("Login Incorrecto");
            }
        }

        /// <summary>
        /// Método para construir un token válido
        /// </summary>
        /// <param name="credenciales"></param>
        /// <returns></returns>
        private async Task<RespuestaAutenticacion> ConstruirToken(CredencialesUsuario credenciales)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", credenciales.Email)
            };

            var usuario = await userManager.FindByEmailAsync(credenciales.Email);
            var claimsDb = await userManager.GetClaimsAsync(usuario);

            claims.AddRange(claimsDb);

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llaveJwt"]));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null,
                claims: claims, expires: expiracion, signingCredentials: creds);

            return new RespuestaAutenticacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiracion = expiracion,
            };
        }
    }
}