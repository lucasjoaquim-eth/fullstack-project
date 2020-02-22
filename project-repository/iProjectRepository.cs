using System.Threading.Tasks;

namespace project.repository
{
    public interface iProjectRepository
    {
        void Add<T>(T entity) where T : class;
        void update<T>(T entity) where T : class;
        void delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();
    }
}