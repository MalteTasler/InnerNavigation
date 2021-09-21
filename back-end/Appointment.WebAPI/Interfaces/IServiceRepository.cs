using System.Collections.Generic;
using System.Threading.Tasks;
using serverView.WebAPI.Models;

namespace serverView.WebAPI.Interfaces
{
    public interface IServiceRepository
    {
        Task<List<Models.Service>> ReadServices();
        Task<Models.Service> ReadService(int id);
        Task<Models.Service> PutService(Models.Service toUpdate);
        Task<Models.Service> PatchService(Models.Service toUpdate);
        Task<Models.Service> CreateService(Models.ServiceDTO serverDto);
        public Task<bool> ServiceExists(int id);
        /*public Task<List<Models.ServiceTimeDTO>> ReadTimes();
        public Task<List<Models.ServiceTimeDTO>> ReadTimes(int weekDay);

        public Task<bool> DeleteTime(int id);
        public Task<Models.Board> UpdateBoard(Models.Board board);
        public Task<Models.Board> GetBoard();
        public Task<bool> DeleteTimes();
        public Task<Models.ServiceTime> ReadTime(int id);
        public Task<bool> TimeExists(int id);
        public Task<Models.ServiceTimeDTO> CreateTimes(ServiceTimeDTO serverTimeDto);*/
        public Task<bool> DeleteService(int id);
    }
}