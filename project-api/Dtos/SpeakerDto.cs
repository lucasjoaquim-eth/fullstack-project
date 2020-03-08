using System.Collections.Generic;

namespace project.api.Dtos
{
    public class SpeakerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SummaryCurriculum { get; set; }
        public string ImageUrl { get; set; }
        public string Email { get; set; }
        public List<SocialNetworkDto> SocialNetworks { get; set; }
        public List<EventDto> Events { get; set; }
    }
}