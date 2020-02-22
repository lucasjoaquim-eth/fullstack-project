using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project.domain;
using project.repository.data;

namespace project.repository
{
    public class EventRepository : iEventRepository
    {
        private readonly ProjectContext _context;

        public EventRepository(ProjectContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<Event[]> GetAllEventAsync(bool includeSpeakers = false)
        {
            IQueryable<Event> query = _context.Events
                .Include(l => l.Lots)
                .Include(sn => sn.SocialNetworks);
            if (includeSpeakers)
            {
                query = query
                    .Include(se => se.SpeakerEvents)
                    .ThenInclude(s => s.Speaker);
            }
            query = query.OrderByDescending(d => d.Date);
            return await query.ToArrayAsync();
        }

        public async Task<Event[]> GetAllEventAsyncByTheme(string theme, bool includeSpeakers)
        {
            IQueryable<Event> query = _context.Events
               .Include(l => l.Lots)
               .Include(sn => sn.SocialNetworks);
            if (includeSpeakers)
            {
                query = query
                    .Include(se => se.SpeakerEvents)
                    .ThenInclude(s => s.Speaker);
            }
            query = query.OrderByDescending(d => d.Date)
                         .Where(t => t.Theme.ToLower().Contains(theme.ToLower()));
            return await query.ToArrayAsync();
        }
        public async Task<Event> GetEventAsyncById(int EventId, bool includeSpeakers)
        {
            IQueryable<Event> query = _context.Events
               .Include(l => l.Lots)
               .Include(sn => sn.SocialNetworks);
            if (includeSpeakers)
            {
                query = query
                    .Include(se => se.SpeakerEvents)
                    .ThenInclude(s => s.Speaker);
            }
            query = query.OrderByDescending(d => d.Date)
                         .Where(i => i.Id == EventId);

            return await query.FirstOrDefaultAsync();
        }
    }
}