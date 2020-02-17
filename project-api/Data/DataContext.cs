using Microsoft.EntityFrameworkCore;
using project.api.Models;

namespace project.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Event> Events { get; set; }
    }
}