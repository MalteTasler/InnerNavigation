using System.Collections.Generic;
using System.Threading.Tasks;
using serverView.WebAPI.Models;

namespace serverView.WebAPI.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Models.Category>> ReadCategories();
        Task<Models.Category> ReadCategory(int id);
        Task<Models.Category> PutCategory(Models.Category toUpdate);
        Task<Models.Category> PatchCategory(Models.Category toUpdate);
        Task<Models.Category> CreateCategory(Models.CategoryDTO serverDto);
        public Task<bool> CategoryExists(int id);
        /*public Task<List<Models.CategoryTimeDTO>> ReadTimes();
        public Task<List<Models.CategoryTimeDTO>> ReadTimes(int weekDay);

        public Task<bool> DeleteTime(int id);
        public Task<Models.Board> UpdateBoard(Models.Board board);
        public Task<Models.Board> GetBoard();
        public Task<bool> DeleteTimes();
        public Task<Models.CategoryTime> ReadTime(int id);
        public Task<bool> TimeExists(int id);
        public Task<Models.CategoryTimeDTO> CreateTimes(CategoryTimeDTO serverTimeDto);*/
        public Task<bool> DeleteCategory(int id);
    }
}