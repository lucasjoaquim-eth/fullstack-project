using System.ComponentModel.DataAnnotations;

namespace project.api.Dtos
{
    public class LotDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        [Range(2, 120000)]
        public int Amount { get; set; }

        public string DateBegin { get; set; }
        
        public string DateEnd { get; set; }
    }
}