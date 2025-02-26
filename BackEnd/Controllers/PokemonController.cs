using AutoMapper;
using BackEnd;
using BackEnd.DTOs;
using BackEnd.Entities;
using BackEnd.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Back_end.Controllers
{
    [Route("api/pokemon")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly string contenedor = "peliculas";

        public PokemonController(ApplicationDbContext context, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.almacenadorArchivos = almacenadorArchivos;
            this.userManager = userManager;
        }

        /// <summary>
        /// Método para crear un Pokemon
        /// </summary>
        /// <param name="pokemonCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] PokemonCreationDTO pokemonCreationDTO)
        {
            var pokemon = mapper.Map<Pokemon>(pokemonCreationDTO);

            if (pokemonCreationDTO.Image is not null)
            {
                pokemon.Image = await almacenadorArchivos.GuardarArchivo(contenedor, pokemonCreationDTO.Image);
            }

            context.Add(pokemon);
            await context.SaveChangesAsync();
            return pokemon.Pokedex;
        }
    }
}