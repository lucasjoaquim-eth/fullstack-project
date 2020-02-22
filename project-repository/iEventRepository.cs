using System.Threading.Tasks;
using project.domain;

namespace project.repository
{
    public interface iEventRepository
    {
        //All
        void Add<T>(T entity) where T : class;
        void update<T>(T entity) where T : class;
        void delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //Events
        Task<Event[]> GetAllEventAsync(bool includeSpeakers);
        Task<Event> GetEventAsyncById(int EventId, bool includeSpeakers);
        Task<Event[]> GetAllEventAsyncByTheme(string tema, bool includeSpeakers);


        //Speakers
        Task<Speaker[]> GetAllSpeakerAsync(bool includeEvents);
        Task<Speaker> GetSpeakerAsyncById(int SpeakerId, bool includeEvents);
        Task<Speaker[]> GetAllSpeakerAsyncByName(string name, bool includeEvents);


    }
}