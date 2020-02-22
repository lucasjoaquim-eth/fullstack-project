using System.Threading.Tasks;
using project.domain;

namespace project.repository
{
    public interface iSpeakerRepository
    {
        Task<Speaker[]> GetAllSpeakerAsync(bool includeEvents);
        Task<Speaker> GetSpeakerAsyncById(int SpeakerId, bool includeEvents);
        Task<Speaker[]> GetAllSpeakerAsyncByName(string name, bool includeEvents);
    }
}