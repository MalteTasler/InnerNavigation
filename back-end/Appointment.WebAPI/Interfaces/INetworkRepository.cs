using System.Collections.Generic;
using System.Threading.Tasks;
using serverView.WebAPI.Models;

namespace serverView.WebAPI.Interfaces
{
    public interface INetworkRepository
    {
        Task<List<Models.Network>> ReadNetworks();
        Task<Models.Network> ReadNetwork(int id);
        Task<Models.Network> PutNetwork(Models.Network toUpdate);
        Task<Models.Network> PatchNetwork(Models.Network toUpdate);
        Task<Models.Network> CreateNetwork(Models.NetworkDTO serverDto);
        public Task<bool> NetworkExists(int id);
        /*public Task<List<Models.ServerTimeDTO>> ReadTimes();
        public Task<List<Models.ServerTimeDTO>> ReadTimes(int weekDay);

        public Task<bool> DeleteTime(int id);
        public Task<Models.Board> UpdateBoard(Models.Board board);
        public Task<Models.Board> GetBoard();
        public Task<Models.ServerTime> ReadTime(int id);
        public Task<bool> TimeExists(int id);
        public Task<Models.ServerTimeDTO> CreateTimes(ServerTimeDTO serverTimeDto);*/
        public Task<bool> DeleteNetwork(int id);
    }
}