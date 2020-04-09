using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace project.api.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }

        [StringLength(100, MinimumLength = 3,
        ErrorMessage = "O campo {0} deve possuir no minimo 3 e no máximo 100 caracters")]
        [Required(ErrorMessage = "O Local deve ser preenchido")]
        public string Place { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser preenchido")]
        public string Date { get; set; }

        [StringLength(50, MinimumLength = 3,
        ErrorMessage = "O campo {0} deve possuir no minimo 3 e no máximo 50 caracters")]
        [Required(ErrorMessage = "O campo {0} deve ser preenchido")]
        public string Theme { get; set; }

        [Range(2, 120000, ErrorMessage = "O campo {0} de pessoa é entre 2 e 120000")]
        public int AmountPeople { get; set; }

        public string ImagemUrl { get; set; }

        [Phone]
        [Required(ErrorMessage = "O campo {0} deve ser preenchido")]
        public string Phone { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "O campo {0} deve ser preenchido")]
        public string Email { get; set; }

        public List<LotDto> Lots { get; set; }

        public List<SocialNetworkDto> SocialNetworks { get; set; }

        public List<SpeakerDto> Speakers { get; set; }
    }
}