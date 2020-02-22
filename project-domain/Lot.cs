using System;
namespace project.domain
{
    public class Lot
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public DateTime? DateBegin { get; set; }
        public DateTime? DateEnd { get; set; }
        public int EventId { get; set; }
        public Event Event { get;  }
    }
}