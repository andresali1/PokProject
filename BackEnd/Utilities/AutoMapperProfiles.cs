using AutoMapper;
using BackEnd.DTOs;
using BackEnd.Entities;

namespace BackEnd.Utilities
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Tipo, TipoDTO>().ReverseMap();
            CreateMap<TipoCreacionDTO, Tipo>();
        }
    }
}