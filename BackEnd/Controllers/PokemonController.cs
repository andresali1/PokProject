using AutoMapper;
using BackEnd;
using BackEnd.DTOs;
using BackEnd.Entities;
using BackEnd.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        /// Método para traer los pokemon paginados
        /// </summary>
        /// <param name="paginacionDTO"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<PokemonDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = context.Pokemons.Include(p => p.Tipo).AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            var pokemons = await queryable.OrderBy(x => x.Pokedex).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<PokemonDTO>>(pokemons);
        }

        /// <summary>
        /// Se obtiene pokemon por su número de pokedex
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<PokemonDTO>> Get(int id)
        {
            var pokemon = await context.Pokemons.FirstOrDefaultAsync(x => x.Pokedex == id);

            if (pokemon == null) return NotFound();

            return mapper.Map<PokemonDTO>(pokemon);
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

        /// <summary>
        /// Método para actualizar un pokemon
        /// </summary>
        /// <param name="id"></param>
        /// <param name="pokemonCreationDTO"></param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] PokemonCreationDTO pokemonCreationDTO)
        {
            var pokemon = await context.Pokemons.FirstOrDefaultAsync(x => x.Pokedex == id);
            string viejaImagen = pokemon.Image;

            if (pokemon == null) return NotFound();

            pokemon = mapper.Map(pokemonCreationDTO, pokemon);

            if (pokemonCreationDTO.Image is not null)
            {
                pokemon.Image = await almacenadorArchivos.EditaArchivo(contenedor, pokemonCreationDTO.Image, viejaImagen);
            }

            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Método para eliminar un pokemon
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var pokemon = await context.Pokemons.FirstOrDefaultAsync(x => x.Pokedex == id);

            if (pokemon is null) return NotFound();

            if (!string.IsNullOrEmpty(pokemon.Image))
            {
                await almacenadorArchivos.BorrarArchivo(pokemon.Image, contenedor);
            }

            context.Pokemons.Remove(pokemon);
            await context.SaveChangesAsync();

            return NoContent();

        }
    }
}