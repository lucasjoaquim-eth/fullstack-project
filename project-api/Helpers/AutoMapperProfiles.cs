using System.Linq;
using AutoMapper;
using project.api.Dtos;
using project.domain;

namespace project.api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Event, EventDto>()
                .ForMember(dest => dest.Speakers, options =>
                {
                    options.MapFrom(se => se.SpeakerEvents.Select(s => s.Speaker).ToList());
                })
                .ReverseMap();

            CreateMap<Speaker, SpeakerDto>()
                .ForMember(dest => dest.Events, options =>
                {
                    options.MapFrom(se => se.SpeakerEvents.Select(e => e.Event).ToList());
                }).ReverseMap();

            CreateMap<Lot, LotDto>().ReverseMap();

            CreateMap<SocialNetwork, SocialNetworkDto>().ReverseMap();
        }
    }
}