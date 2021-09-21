using System.Data;
using System.Threading.Tasks;

namespace serverView.WebAPI.Interfaces
{
    public interface IDBContext
    {
        Task<IDbConnection> GetDBContext();
    }
}