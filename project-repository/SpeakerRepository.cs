using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project.domain;
using project.repository.data;

namespace project.repository
{
    public class SpeakerRepository : iSpeakerRepository
    {
        private readonly ProjectContext _context;

        public SpeakerRepository(ProjectContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Speaker[]> GetAllSpeakerAsync(bool includeEvents = false)
        {
            IQueryable<Speaker> query = _context.Speakers
                .Include(sn => sn.SocialNetworks);
            if (includeEvents)
            {
                query = query
                        .Include(se => se.SpeakerEvents)
                        .ThenInclude(e => e.Event);
            }
            query = query.OrderBy(n => n.Name);
            return await query.ToArrayAsync();
        }
        public async Task<Speaker> GetSpeakerAsyncById(int SpeakerId, bool includeEvents)
        {
            IQueryable<Speaker> query = _context.Speakers
                .Include(sn => sn.SocialNetworks);
            if (includeEvents)
            {
                query = query
                        .Include(se => se.SpeakerEvents)
                        .ThenInclude(e => e.Event);
            }
            query = query.OrderBy(n => n.Name)
                            .Where(i => i.Id == SpeakerId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Speaker[]> GetAllSpeakerAsyncByName(string name, bool includeEvents)
        {
            IQueryable<Speaker> query = _context.Speakers
                .Include(sn => sn.SocialNetworks);
            if (includeEvents)
            {
                query = query
                    .Include(se => se.SpeakerEvents)
                    .ThenInclude(s => s.Event);
            }
            query = query.Where(n => n.Name.ToLower().Contains(name.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}