using System.Collections.Generic;
using System.Threading.Tasks;
using serverView.WebAPI.Models;

namespace serverView.WebAPI.Interfaces
{
    public interface ICustomLinkRepository
    {
        Task<List<Models.CustomLink>> ReadCustomLinks();
        Task<Models.CustomLink> ReadCustomLink(int id);
        Task<Models.CustomLink> PutCustomLink(Models.CustomLink toUpdate);
        Task<Models.CustomLink> PatchCustomLink(Models.CustomLink toUpdate);
        Task<Models.CustomLink> CreateCustomLink(Models.CustomLinkDTO customLinkDto);
        public Task<bool> CustomLinkExists(int id);
        /*public Task<List<Models.CustomLinkTimeDTO>> ReadTimes();
        public Task<List<Models.CustomLinkTimeDTO>> ReadTimes(int weekDay);

        public Task<bool> DeleteTime(int id);
        public Task<Models.Board> UpdateBoard(Models.Board board);
        public Task<Models.Board> GetBoard();
        public Task<bool> DeleteTimes();
        public Task<Models.CustomLinkTime> ReadTime(int id);
        public Task<bool> TimeExists(int id);
        public Task<Models.CustomLinkTimeDTO> CreateTimes(CustomLinkTimeDTO customLinkTimeDto);*/
        public Task<bool> DeleteCustomLink(int id);
    }
}