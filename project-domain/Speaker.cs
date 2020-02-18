using System.Collections.Generic;

namespace project.domain
{
    public class Speaker
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SummaryCurriculum { get; set; }
        public string ImageUrl { get; set; }
        public string Email { get; set; }
        public List<SocialNetwork> SocialNetworks { get; set; }
        public List<SpeakerEvent> SpeakerEvents { get; set; }
    }
}