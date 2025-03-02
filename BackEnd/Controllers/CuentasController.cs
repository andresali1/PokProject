using AutoMapper;
using BackEnd.DTOs;
using BackEnd.Entities;
using BackEnd.Utilities;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    public class CuentasController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CuentasController(
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            SignInManager<ApplicationUser> signInManager,
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

        [HttpGet]
        public async Task<ActionResult<List<UsuarioDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = context.Users.AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            var users = await queryable.OrderBy(x => x.Email).Paginar(paginacionDTO).ToListAsync();
            var respuesta = mapper.Map<List<UsuarioDTO>>(users);
            return respuesta;
        }

        /// <summary>
        /// Método para hacer admin a un usuario
        /// </summary>
        /// <param name="usuarioId"></param>
        /// <returns></returns>
        [HttpPost("hacerAdmin")]
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
        [AllowAnonymous]
        public async Task<ActionResult<RespuestaAutenticacion>> Crear([FromBody] CredencialesUsuario credencialesUsuario)
        {
            var usuarioExiste = await context.Users.AnyAsync(u => u.Email == credencialesUsuario.Email);

            if (usuarioExiste)
            {
                return BadRequest("Correo electrónico ya registrado");
            }

            var usuario = new ApplicationUser { UserName = credencialesUsuario.Email, Email = credencialesUsuario.Email, PasswordReset = credencialesUsuario.FromAdmin };
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
        [AllowAnonymous]
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
        /// Método para cambiar contraseña
        /// </summary>
        /// <param name="credencialesUsuario"></param>
        /// <returns></returns>
        [HttpPost("recover")]
        [AllowAnonymous]
        public async Task<ActionResult<RespuestaAutenticacion>> Recover([FromBody] CredencialesUsuario credencialesUsuario)
        {
            var usuarioExiste = await context.Users.AnyAsync(u => u.Email == credencialesUsuario.Email);

            if (!usuarioExiste)
            {
                return BadRequest("Correo electrónico no encontrado");
            }

            var user = await userManager.FindByEmailAsync(credencialesUsuario.Email);
            user.PasswordReset = false;
            user.Active = true;
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var resultado = await userManager.ResetPasswordAsync(user, token, credencialesUsuario.Password);

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
            claims.Add(new Claim("isReset", usuario.PasswordReset.ToString()));
            claims.Add(new Claim("isActive", usuario.Active.ToString()));

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llaveJwt"]));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null,
                claims: claims, expires: expiracion, signingCredentials: creds);

            return new RespuestaAutenticacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiracion = expiracion
            };
        }

        /// <summary>
        /// Método para inactivar un usuario
        /// </summary>
        /// <param name="idUsuario"></param>
        /// <returns></returns>
        [HttpPost("cuenta")]
        public async Task<ActionResult> EliminarUsuario([FromBody] string idUsuario)
        {
            var usuario = await userManager.FindByIdAsync(idUsuario);

            if (usuario is null)
            {
                return BadRequest("Usuario no encontrado");
            }

            usuario.Active = false;
            var result = await userManager.UpdateAsync(usuario);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
    }
}