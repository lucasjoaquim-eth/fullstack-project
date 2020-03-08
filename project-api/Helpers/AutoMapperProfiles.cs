using AutoMapper;
using project.api.Dtos;
using project.domain;

namespace project.api.Helpers {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles () {
            CreateMap<Event, EventDto> ();
            CreateMap<Speaker, SpeakerDto> ();
            CreateMap<Lot, LotDto> ();
            CreateMap<SocialNetwork, SocialNetworkDto> ();
        }
    }
}