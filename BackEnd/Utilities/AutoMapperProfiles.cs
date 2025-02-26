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
                .ForMember(x => x.Image, opciones => opciones.Ignore());
            CreateMap<Pokemon, PokemonDTO>();

            CreateMap<ApplicationUser, UsuarioDTO>();
        }
    }
}