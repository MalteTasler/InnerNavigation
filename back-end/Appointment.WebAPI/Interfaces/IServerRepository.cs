using System.Collections.Generic;
using System.Threading.Tasks;
using serverView.WebAPI.Models;

namespace serverView.WebAPI.Interfaces
{
    public interface IServerRepository
    {
        Task<List<Models.Server>> ReadServers();
        Task<Models.Server> ReadServer(long id);
        Task<Models.Server> PutServer(Models.Server toUpdate);
        Task<Models.Server> PatchServer(Models.Server toUpdate);
        Task<Models.Server> CreateServer(Models.ServerDTO serverDto);
        public Task<bool> ServerExists(int id);
        /*public Task<List<Models.ServerTimeDTO>> ReadTimes();
        public Task<List<Models.ServerTimeDTO>> ReadTimes(int weekDay);

        public Task<bool> DeleteTime(int id);
        public Task<Models.Board> UpdateBoard(Models.Board board);
        public Task<Models.Board> GetBoard();
        public Task<bool> DeleteTimes();
        public Task<Models.ServerTime> ReadTime(int id);
        public Task<bool> TimeExists(int id);
        public Task<Models.ServerTimeDTO> CreateTimes(ServerTimeDTO serverTimeDto);*/
        public Task<bool> DeleteServer(int id);
    }
}