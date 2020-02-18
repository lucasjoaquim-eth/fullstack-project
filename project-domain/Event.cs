using System;
using System.Collections.Generic;
namespace project.domain
{
    public class Event
    {
        public int Id { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
        public string Theme { get; set; }
        public int AmountPeople { get; set; }
        public string ImagemUrl { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<Lot> Lots { get; set; }
        public List<SocialNetwork> SocialNetworks { get; set; }
        public List<SpeakerEvent> SpeakerEvents { get; set; }
    }
}