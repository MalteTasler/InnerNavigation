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
    public class ServiceRepository : IServiceRepository
    {
        /*private string getSomeTimes(int weekDay) {
            return (@$"
            SELECT  
                    [BoardId],
	                [WeekDay],
	                [StartTime],
	                [EndTime] 
	        FROM ServiceTime
	        WHERE WeekDay = {weekDay}
	        ");}*/

        private const string getAllServices = @"
            SELECT  Id, 
	                [DisplayName],
	                [RunsOn],
	                [Name],
	                [CreationTime] FROM viService ORDER BY Id
        ";

        private const string getOneService = @"SELECT * FROM viService WHERE Id = @Id";
        private const string updateService = @"UpdateService";
        private const string deleteService = @"DeleteService";
        private readonly IDBContext _dbContext;
        private readonly ILogger _logger;

        private const string getSomeServicesFilter = @"SELECT * FROM vService WHERE Name = @Name";
        private const string getSomeServicesSearch = @"SELECT * FROM vService WHERE Name LIKE @searchQuery";
        private const string getSomeServicesFilterSearch = @"SELECT * FROM vService WHERE Name = @Name AND (Name LIKE '@searchQuery ')";


        public ServiceRepository(IDBContext dbContext, ILogger<ServiceRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
            _logger.LogInformation("Application is setting up.");
        }

        public async Task<List<Models.Service>> ReadServices()
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var services = (await sqlCon.QueryAsync<Models.Service>(getAllServices)).ToList();
                    return services;
                }
                catch (Exception ex)
                {
                    _logger.LogError("Reading all rows in Service failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<Models.Service> PutService(Models.Service ServiceDtoData)
        {
            var Service = new Models.Service();
            var param = new DynamicParameters();
            param.Add("@Id", ServiceDtoData.Id);
            /*string dummyDate = $"{toUpdate.FoundedDate.Year}-{toUpdate.FoundedDate.Month}-{toUpdate.FoundedDate.Day}";
            string format = "yyyy-MM-dd";
            var current = new List<dynamic>();
            DateTime finalDate;
            bool dateFormat = DateTime.TryParseExact(dummyDate, format, new CultureInfo("en-US"), DateTimeStyles.None, out finalDate);*/

            using (var sqlCon = await _dbContext.GetDBContext())
            {

                try
                {
                    Service = (await sqlCon.QueryFirstOrDefaultAsync<Models.Service>("CrateOrUpdateService", param, commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Putting failed.", ex);
                    throw ex;
                }
                _logger.LogInformation($"Updated everything in id {ServiceDtoData.Id}");
                return Service;
            }
            return ServiceDtoData; // test
        }
        public async Task<Models.Service> CreateService(ServiceDTO ServiceDtoData)
        {
            string contextId;
            var Service = new Models.Service();
            var param = new DynamicParameters();
            param.Add("@Name", ServiceDtoData.Name);
            param.Add("@DisplayName", ServiceDtoData.DisplayName);
            param.Add("@RunsOn", ServiceDtoData.RunsOn);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Service = (await sqlCon.QueryFirstOrDefaultAsync<Models.Service>("CreateService", param, commandType: CommandType.StoredProcedure));
                    return Service;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Updating all columns failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<bool> ServiceExists(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var input = (await sqlCon.QueryAsync<Models.Service>($"SELECT * FROM vService WHERE Id = @Id", param)).ToList();
                    return input.Any();
                }
                catch (Exception ex)
                {
                    _logger.LogError("Looking for Service did not work.");
                    throw ex;
                }
            }

        }
        public async Task<Models.Service> PatchService(Models.Service ServiceDtoData)
        {
            var Service = new Models.Service();
            var param = new DynamicParameters();
            param.Add("@Id", ServiceDtoData.Id);
            if (ServiceDtoData.Name != null) param.Add("@Name", ServiceDtoData.Name);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Service = (await sqlCon.QueryFirstOrDefaultAsync<Models.Service>("CrateOrUpdateService", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {ServiceDtoData.Id}");

                return Service;
            }
        }
        public async Task<Models.Service> ReadService(int id)
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var param = new DynamicParameters();
                    param.Add("@Id", id);

                    //logger.LogInformation();
                    var Service = (await sqlCon.QueryFirstOrDefaultAsync<Models.Service>(getOneService, param));

                    _logger.LogInformation("Sucesfully executed.");
                    return Service;
                    /*return new ServiceModel()
                    {
                        Id = Service[0].Id,
                        Name= Service[0].Name,
                        FoundedDate = Service[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Service with id {id} did not work.");
                    throw ex;
                }
            }
        }
        public async Task<bool> DeleteService(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    //logger.LogInformation();
                    var Service = (await sqlCon.QueryAsync(deleteService, param, commandType: CommandType.StoredProcedure)).ToList();
                    //string watchString = getOneService + 


                    return true;
                    /*return new ServiceModel()
                    {
                        Id = Service[0].Id,
                        Name= Service[0].Name,
                        FoundedDate = Service[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Service with id {id} did not work.");
                    throw ex;
                    return false;
                }
            }
        }

        /*public async Task<Models.Service> PatchService(Models.Service ServiceDtoData)
        {
            var Service = new Models.Service();
            var param = new DynamicParameters();
            param.Add("@Id", ServiceDtoData.Id);
            if(ServiceDtoData.Topic != null)param.Add("Topic", ServiceDtoData.Topic);
            if(ServiceDtoData.Comment != null)param.Add("@Comment", ServiceDtoData.Comment);
            
            using (var sqlCon = await _dbContext.GetDBContext())
            
                try
                {
                    Service = (await sqlCon.QueryFirstOrDefaultAsync<Models.Service>("CrateOrUpdateService", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {ServiceDtoData.Id}");
                
                return Service;
            }
        }*/

    }
}