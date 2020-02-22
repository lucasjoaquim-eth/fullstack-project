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

        //ALL
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //Events
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

        //Speakers
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
            query = query.OrderBy(i => i.Id == SpeakerId);
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
                    .ThenInclude(s => s.Speaker);
            }
            query = query.Where(n => n.Name.ToLower().Contains(name.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}