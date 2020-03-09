using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace project.api.Dtos
{
    public class SpeakerDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome deve ser preenchido")]
        public string Name { get; set; }

        public string SummaryCurriculum { get; set; }

        public string ImageUrl { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "O e-mail deve ser preenchido")]
        public string Email { get; set; }

        public List<SocialNetworkDto> SocialNetworks { get; set; }
        public List<EventDto> Events { get; set; }
    }
}