using System.Threading.Tasks;
using project.domain;

namespace project.repository
{
    public interface iEventRepository
    {
        Task<Event[]> GetAllEventAsync(bool includeSpeakers);
        Task<Event> GetEventAsyncById(int EventId, bool includeSpeakers);
        Task<Event[]> GetAllEventAsyncByTheme(string tema, bool includeSpeakers);

    }
}