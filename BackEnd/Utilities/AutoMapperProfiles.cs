using AutoMapper;
using BackEnd.DTOs;
using BackEnd.Entities;
using Microsoft.AspNetCore.Identity;

namespace BackEnd.Utilities
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Tipo, TipoDTO>().ReverseMap();
            CreateMap<TipoCreacionDTO, Tipo>();

            CreateMap<PokemonCreationDTO, Pokemon>()
                .ForMember(dto => dto.Image, opciones => opciones.Ignore());
            CreateMap<Pokemon, PokemonDTO>()
            .ForMember(x => x.Tipo, opt => opt.MapFrom(MapearTipo));

            CreateMap<ApplicationUser, UsuarioDTO>();
        }

        /// <summary>
        /// Método para mapear tipos en PokemonDTO
        /// </summary>
        /// <param name="pokemon"></param>
        /// <param name="pokemonDTO"></param>
        /// <returns></returns>
        private TipoDTO MapearTipo(Pokemon pokemon, PokemonDTO pokemonDTO)
        {
            var resultado = new TipoDTO();

            if (pokemon.Tipo == null) { return resultado; }

            resultado.Id = pokemon.TipoId;
            resultado.Nombre = pokemon.Tipo.Nombre;

            return resultado;
        }
    }
}