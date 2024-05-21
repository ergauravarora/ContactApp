using AutoMapper;
using ContactApi.Models;
using ContactApi.DTOs;

namespace ContactApi
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactDTO>().ReverseMap();
            CreateMap<ContactDetail, ContactDetailDTO>().ReverseMap();
        }
    }

}
