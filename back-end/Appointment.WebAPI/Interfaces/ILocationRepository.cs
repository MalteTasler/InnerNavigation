using System.Collections.Generic;
using System.Threading.Tasks;
using innerNavigation.WebAPI.Models;

namespace innerNavigation.WebAPI.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Models.Location>> ReadLocations();
        Task<Models.Location> ReadLocation(int id);
        Task<Models.Location> PutLocation(Models.Location toUpdate);
        Task<Models.Location> PatchLocation(Models.Location toUpdate);
        Task<Models.Location> CreateLocation(Models.LocationDTO serverDto);
        public Task<bool> LocationExists(int id);
        /*public Task<List<Models.LocationTimeDTO>> ReadTimes();
        public Task<List<Models.LocationTimeDTO>> ReadTimes(int weekDay);

        public Task<bool> DeleteTime(int id);
        public Task<Models.Board> UpdateBoard(Models.Board board);
        public Task<Models.Board> GetBoard();
        public Task<bool> DeleteTimes();
        public Task<Models.LocationTime> ReadTime(int id);
        public Task<bool> TimeExists(int id);
        public Task<Models.LocationTimeDTO> CreateTimes(LocationTimeDTO serverTimeDto);*/
        public Task<bool> DeleteLocation(int id);
    }
}