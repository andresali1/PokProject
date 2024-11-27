using AutoMapper;
using BackEnd;
using BackEnd.DTOs;
using BackEnd.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/tipos")]
    [ApiController]
    public class TiposController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public TiposController(ApplicationDbContext context,
                                 IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// Método para obtener la lista de todos los tipos
        /// </summary>
        /// <returns></returns>
        [HttpGet("todos")]
        [AllowAnonymous]
        public async Task<ActionResult<List<TipoDTO>>> Todos()
        {
            var tipos = await context.Tipos.ToListAsync();
            return mapper.Map<List<TipoDTO>>(tipos);
        }

        /// <summary>
        /// Se obtiene el tipo por su Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TipoDTO>> Get(int id)
        {
            var tipo = await context.Tipos.FirstOrDefaultAsync(x => x.Id == id);

            if (tipo == null) return NotFound();

            return mapper.Map<TipoDTO>(tipo);
        }

        /// <summary>
        /// Se guarda un tipo en BD
        /// </summary>
        /// <param name="tipo"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoCreacionDTO tipoCreacionDTO)
        {
            var tipo = mapper.Map<Tipo>(tipoCreacionDTO);
            context.Add(tipo);
            await context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Se actualiza un tipo
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tipoCreacionDTO"></param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] TipoCreacionDTO tipoCreacionDTO)
        {
            var tipo = await context.Tipos.FirstOrDefaultAsync(x => x.Id == id);

            if (tipo == null) return NotFound();

            tipo = mapper.Map(tipoCreacionDTO, tipo);

            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Se elimina un tipo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existe = await context.Tipos.AnyAsync(x => x.Id == id);

            if (!existe) return NotFound();

            context.Remove(new Tipo() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}