using System.Collections.Generic;

namespace project.api.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Place { get; set; }
        public string Date { get; set; }
        public string Theme { get; set; }
        public int AmountPeople { get; set; }
        public string ImagemUrl { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<LotDto> Lots { get; set; }
        public List<SocialNetworkDto> SocialNetworks { get; set; }
        public List<SpeakerDto> Speakers { get; set; }
    }
}