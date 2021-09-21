using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using serverView.WebAPI.Interfaces;
using serverView.WebAPI.Models;
using Dapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;

namespace serverView.WebAPI.Repositories //netcontrol3
{
    public class CategoryRepository : ICategoryRepository
    {
        /*private string getSomeTimes(int weekDay) {
            return (@$"
            SELECT  
                    [BoardId],
	                [WeekDay],
	                [StartTime],
	                [EndTime]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	        FROM CategoryTime
	        WHERE WeekDay = {weekDay}
	        ");}*/

        private const string getAllCategories = @"
            SELECT  Id, 
	                [DisplayName],
	                [isHTTPS],
                    [Port],
	                [Name],
	                [CreationTime] FROM viCategory ORDER BY Id
        ";                                                                                                                                                         

        private const string getOneCategory = @"SELECT * FROM viCategory WHERE Id = @Id";
        private const string updateCategory = @"UpdateCategory";
        private const string deleteCategory = @"DeleteCategory";
        private readonly IDBContext _dbContext;
        private readonly ILogger _logger;

        private const string getSomeCategorysFilter = @"SELECT * FROM vCategory WHERE Name = @name";
        private const string getSomeCategorysSearch = @"SELECT * FROM vCategory WHERE Name LIKE @searchQuery OR FoundedDate LIKE @searchQuery";
        private const string getSomeCategorysFilterSearch = @"SELECT * FROM vCategory WHERE Name = @name AND (Name LIKE '@searchQuery' OR FoundedDate LIKE '@searchQuery')";


        public CategoryRepository(IDBContext dbContext, ILogger<CategoryRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
            _logger.LogInformation("Application sets up.");
        }

        public async Task<List<Models.Category>> ReadCategories()
        {
            _logger.LogInformation("getting dbcontext for continueing");
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    _logger.LogInformation("Reading all rows in Category");
                    var categories = (await sqlCon.QueryAsync<Models.Category>(getAllCategories)).ToList();
                    return categories;
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Reading all rows in Category failed.", ex);
                    Console.WriteLine("Category failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<Models.Category> PutCategory(Models.Category CategoryDtoData)
        {
            var Category = new Models.Category();
            var param = new DynamicParameters();
            param.Add("@Id", CategoryDtoData.Id);
            /*string dummyDate = $"{toUpdate.FoundedDate.Year}-{toUpdate.FoundedDate.Month}-{toUpdate.FoundedDate.Day}";
            string format = "yyyy-MM-dd";
            var current = new List<dynamic>();
            DateTime finalDate;
            bool dateFormat = DateTime.TryParseExact(dummyDate, format, new CultureInfo("en-US"), DateTimeStyles.None, out finalDate);*/

            using (var sqlCon = await _dbContext.GetDBContext())
            {

                try
                {
                    Category = (await sqlCon.QueryFirstOrDefaultAsync<Models.Category>("CrateOrUpdateCategory", param, commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Putting failed.", ex);
                    throw ex;
                }
                _logger.LogInformation($"Updated everything in id {CategoryDtoData.Id}");
                return Category;
            }
            return CategoryDtoData; // test
        }
        public async Task<Models.Category> CreateCategory(CategoryDTO CategoryDtoData)
        {
            string contextId;
            var Category = new Models.Category();
            var param = new DynamicParameters();
            param.Add("@Name", CategoryDtoData.Name);
            param.Add("@DisplayName", CategoryDtoData.DisplayName);
            param.Add("@isHTTPS", CategoryDtoData.isHTTPS);
            param.Add("@Port", CategoryDtoData.Port);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Category = (await sqlCon.QueryFirstOrDefaultAsync<Models.Category>("CreateCategory", param, commandType: CommandType.StoredProcedure));
                    return Category;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Updating all columns failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<bool> CategoryExists(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var input = (await sqlCon.QueryAsync<Models.Category>($"SELECT * FROM vCategory WHERE Id = @Id", param)).ToList();
                    return input.Any();
                }
                catch (Exception ex)
                {
                    _logger.LogError("Looking for Category did not work.");
                    throw ex;
                }
            }

        }
        public async Task<Models.Category> PatchCategory(Models.Category CategoryDtoData)
        {
            var Category = new Models.Category();
            var param = new DynamicParameters();
            param.Add("@Id", CategoryDtoData.Id);
            if (CategoryDtoData.DisplayName != null) param.Add("@DisplayName", CategoryDtoData.DisplayName);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Category = (await sqlCon.QueryFirstOrDefaultAsync<Models.Category>("CrateOrUpdateCategory", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {CategoryDtoData.Id}");

                return Category;
            }
        }
        public async Task<Models.Category> ReadCategory(int id)
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var param = new DynamicParameters();
                    param.Add("@Id", id);

                    //logger.LogInformation();
                    var Category = (await sqlCon.QueryFirstOrDefaultAsync<Models.Category>(getOneCategory, param));

                    _logger.LogInformation("Sucesfully executed.");
                    return Category;
                    /*return new CategoryModel()
                    {
                        Id = Category[0].Id,
                        Name= Category[0].Name,
                        FoundedDate = Category[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Category with id {id} did not work.");
                    throw ex;
                }
            }
        }
        public async Task<bool> DeleteCategory(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    //logger.LogInformation();
                    var Category = (await sqlCon.QueryAsync(deleteCategory, param, commandType: CommandType.StoredProcedure)).ToList();
                    //string watchString = getOneCategory + 


                    return true;
                    /*return new CategoryModel()
                    {
                        Id = Category[0].Id,
                        Name= Category[0].Name,
                        FoundedDate = Category[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Category with id {id} did not work.");
                    throw ex;
                    return false;
                }
            }
        }
    }
}