using System.Data;
using System.Threading.Tasks;

namespace innerNavigation.WebAPI.Interfaces
{
    public interface IDBContext
    {
        Task<IDbConnection> GetDBContext();
    }
}