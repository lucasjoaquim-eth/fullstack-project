namespace project.domain
{
    public class SocialNetwork
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string url { get; set; }
        public int? EventId { get; set; }
        public Event Event { get; }
        public int? SpeakerId { get; set; }
        public Speaker speaker { get; }

    }
}