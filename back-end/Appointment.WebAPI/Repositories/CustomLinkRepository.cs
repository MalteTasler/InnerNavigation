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
    public class CustomLinkRepository : ICustomLinkRepository
    {

        private const string getAllCustomLinks = @"
            SELECT  Id, 
	                [Ref],
	                [Name] FROM viCustomLink ORDER BY Id
        ";

        private const string getOneCustomLink = @"SELECT * FROM viCustomLink WHERE Id = @Id";
        private const string updateCustomLink = @"UpdateCustomLink";
        private const string deleteCustomLink = @"DeleteCustomLink";
        private readonly IDBContext _dbContext;
        private readonly ILogger _logger;

        private const string getSomeCustomLinksFilter = @"SELECT * FROM vCustomLink WHERE Name = @name";
        private const string getSomeCustomLinksSearch = @"SELECT * FROM vCustomLink WHERE Name LIKE @searchQuery OR FoundedDate LIKE @searchQuery";
        private const string getSomeCustomLinksFilterSearch = @"SELECT * FROM vCustomLink WHERE Name = @name AND (Name LIKE '@searchQuery' OR FoundedDate LIKE '@searchQuery')";


        public CustomLinkRepository(IDBContext dbContext, ILogger<CustomLinkRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
            _logger.LogInformation("Application is setting up.");
        }

        public async Task<List<Models.CustomLink>> ReadCustomLinks()
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var customLinks = (await sqlCon.QueryAsync<Models.CustomLink>(getAllCustomLinks)).ToList();
                    return customLinks;
                }
                catch (Exception ex)
                {
                    _logger.LogError("Reading all rows in CustomLink failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<Models.CustomLink> PutCustomLink(Models.CustomLink CustomLinkDtoData)
        {
            var CustomLink = new Models.CustomLink();
            var param = new DynamicParameters();
            param.Add("@Id", CustomLinkDtoData.Id);
            /*string dummyDate = $"{toUpdate.FoundedDate.Year}-{toUpdate.FoundedDate.Month}-{toUpdate.FoundedDate.Day}";
            string format = "yyyy-MM-dd";
            var current = new List<dynamic>();
            DateTime finalDate;
            bool dateFormat = DateTime.TryParseExact(dummyDate, format, new CultureInfo("en-US"), DateTimeStyles.None, out finalDate);*/

            using (var sqlCon = await _dbContext.GetDBContext())
            {

                try
                {
                    CustomLink = (await sqlCon.QueryFirstOrDefaultAsync<Models.CustomLink>("CrateOrUpdateCustomLink", param, commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Putting failed.", ex);
                    throw ex;
                }
                _logger.LogInformation($"Updated everything in id {CustomLinkDtoData.Id}");
                return CustomLink;
            }
            return CustomLinkDtoData; // test
        }
        public async Task<Models.CustomLink> CreateCustomLink(CustomLinkDTO CustomLinkDtoData)
        {
            string contextId;
            var CustomLink = new Models.CustomLink();
            var param = new DynamicParameters();
            param.Add("@Name", CustomLinkDtoData.Name);
            param.Add("@Ref", CustomLinkDtoData.Ref);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    CustomLink = (await sqlCon.QueryFirstOrDefaultAsync<Models.CustomLink>("CreateCustomLink", param, commandType: CommandType.StoredProcedure));
                    return CustomLink;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Updating all columns failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<bool> CustomLinkExists(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var input = (await sqlCon.QueryAsync<Models.CustomLink>($"SELECT * FROM vCustomLink WHERE Id = @Id", param)).ToList();
                    return input.Any();
                }
                catch (Exception ex)
                {
                    _logger.LogError("Looking for CustomLink did not work.");
                    throw ex;
                }
            }

        }
        public async Task<Models.CustomLink> PatchCustomLink(Models.CustomLink CustomLinkDtoData)
        {
            var CustomLink = new Models.CustomLink();
            var param = new DynamicParameters();
            param.Add("@Id", CustomLinkDtoData.Id);
            param.Add("@Ref", CustomLinkDtoData.Ref);
            if (CustomLinkDtoData.Name != null) param.Add("@Name", CustomLinkDtoData.Name);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    CustomLink = (await sqlCon.QueryFirstOrDefaultAsync<Models.CustomLink>("CrateOrUpdateCustomLink", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {CustomLinkDtoData.Id}");

                return CustomLink;
            }
        }
        public async Task<Models.CustomLink> ReadCustomLink(int id)
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var param = new DynamicParameters();
                    param.Add("@Id", id);

                    //logger.LogInformation();
                    var CustomLink = (await sqlCon.QueryFirstOrDefaultAsync<Models.CustomLink>(getOneCustomLink, param));

                    _logger.LogInformation("Sucesfully executed.");
                    return CustomLink;
                    /*return new CustomLinkModel()
                    {
                        Id = CustomLink[0].Id,
                        Name= CustomLink[0].Name,
                        FoundedDate = CustomLink[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading CustomLink with id {id} did not work.");
                    throw ex;
                }
            }
        }
        public async Task<bool> DeleteCustomLink(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    //logger.LogInformation();
                    var CustomLink = (await sqlCon.QueryAsync(deleteCustomLink, param, commandType: CommandType.StoredProcedure)).ToList();
                    //string watchString = getOneCustomLink + 


                    return true;
                    /*return new CustomLinkModel()
                    {
                        Id = CustomLink[0].Id,
                        Name= CustomLink[0].Name,
                        FoundedDate = CustomLink[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading CustomLink with id {id} did not work.");
                    throw ex;
                    return false;
                }
            }
        }


    }
}