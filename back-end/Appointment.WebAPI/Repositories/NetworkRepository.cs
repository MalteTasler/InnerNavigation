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
    public class NetworkRepository : INetworkRepository
    {
        /*private string getSomeTimes(int weekDay) {
            return (@$"
            SELECT  
                    [BoardId],
	                [WeekDay],
	                [StartTime],
	                [EndTime] 
	        FROM NetworkTime
	        WHERE WeekDay = {weekDay}
	        ");}*/

        private const string getAllNetworks = @"
            SELECT  Id, 
	                [SubnetOff],
	                [Name],
	                [CreationTime] FROM viNetwork ORDER BY Id
        ";

        private const string getOneNetwork = @"SELECT * FROM viNetwork WHERE Id = @Id";
        private const string updateNetwork = @"UpdateNetwork";
        private const string deleteNetwork = @"DeleteNetwork";
        private readonly IDBContext _dbContext;
        private readonly ILogger _logger;

        private const string getSomeNetworksFilter = @"SELECT * FROM vNetwork WHERE Name = @name";
        private const string getSomeNetworksSearch = @"SELECT * FROM vNetwork WHERE Name LIKE @searchQuery";
        private const string getSomeNetworksFilterSearch = @"SELECT * FROM vNetwork WHERE Name = @name AND (Name LIKE '@searchQuery')";


        public NetworkRepository(IDBContext dbContext, ILogger<NetworkRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
            _logger.LogInformation("Application is setting up.");
        }

        public async Task<List<Models.Network>> ReadNetworks()
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var networks = (await sqlCon.QueryAsync<Models.Network>(getAllNetworks)).ToList();
                    return networks;
                }
                catch (Exception ex)
                {
                    _logger.LogError("Reading all rows in Network failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<Models.Network> PutNetwork(Models.Network NetworkDtoData)
        {
            var Network = new Models.Network();
            var param = new DynamicParameters();
            param.Add("@Id", NetworkDtoData.Id);
            /*string dummyDate = $"{toUpdate.FoundedDate.Year}-{toUpdate.FoundedDate.Month}-{toUpdate.FoundedDate.Day}";
            string format = "yyyy-MM-dd";
            var current = new List<dynamic>();
            DateTime finalDate;
            bool dateFormat = DateTime.TryParseExact(dummyDate, format, new CultureInfo("en-US"), DateTimeStyles.None, out finalDate);*/

            using (var sqlCon = await _dbContext.GetDBContext())
            {

                try
                {
                    Network = (await sqlCon.QueryFirstOrDefaultAsync<Models.Network>("CrateOrUpdateNetwork", param, commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Putting failed.", ex);
                    throw ex;
                }
                _logger.LogInformation($"Updated everything in id {NetworkDtoData.Id}");
                return Network;
            }
            return NetworkDtoData; // test
        }
        public async Task<Models.Network> CreateNetwork(NetworkDTO NetworkDtoData)
        {
            string contextId;
            var Network = new Models.Network(); 
            var param = new DynamicParameters();
            // !! if subNetwork = 0 then null translate
            if (NetworkDtoData.SubnetOff == "") { param.Add("@SubnetOff", NetworkDtoData.SubnetOff); } else { param.Add("@SubnetOff", NetworkDtoData.SubnetOff); }
            param.Add("@Name", NetworkDtoData.Name);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Network = (await sqlCon.QueryFirstOrDefaultAsync<Models.Network>("CreateNetwork", param, commandType: CommandType.StoredProcedure));
                    return Network;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Updating all columns failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<bool> NetworkExists(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var input = (await sqlCon.QueryAsync<Models.Network>($"SELECT * FROM vNetwork WHERE Id = @Id", param)).ToList();
                    return input.Any();
                }
                catch (Exception ex)
                {
                    _logger.LogError("Looking for Network did not work.");
                    throw ex;
                }
            }

        }
        public async Task<Models.Network> PatchNetwork(Models.Network NetworkDtoData)
        {
            var Network = new Models.Network();
            var param = new DynamicParameters();
            param.Add("@Id", NetworkDtoData.Id);
            if (NetworkDtoData.Name != null) param.Add("@Name", NetworkDtoData.Name);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Network = (await sqlCon.QueryFirstOrDefaultAsync<Models.Network>("CrateOrUpdateNetwork", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {NetworkDtoData.Id}");

                return Network;
            }
        }
        public async Task<Models.Network> ReadNetwork(int id)
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var param = new DynamicParameters();
                    param.Add("@Id", id);

                    //logger.LogInformation();
                    var Network = (await sqlCon.QueryFirstOrDefaultAsync<Models.Network>(getOneNetwork, param));

                    _logger.LogInformation("Sucesfully executed.");
                    return Network;
                    /*return new NetworkModel()
                    {
                        Id = Network[0].Id,
                        Name= Network[0].Name,
                        FoundedDate = Network[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Network with id {id} did not work.");
                    throw ex;
                }
            }
        }
        public async Task<bool> DeleteNetwork(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    //logger.LogInformation();
                    var Network = (await sqlCon.QueryAsync(deleteNetwork, param, commandType: CommandType.StoredProcedure)).ToList();
                    //string watchString = getOneNetwork + 


                    return true;
                    /*return new NetworkModel()
                    {
                        Id = Network[0].Id,
                        Name= Network[0].Name,
                        FoundedDate = Network[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Network with id {id} did not work.");
                    throw ex;
                    return false;
                }
            }
        }

        /*public async Task<Models.Network> PatchNetwork(Models.Network NetworkDtoData)
        {
            var Network = new Models.Network();
            var param = new DynamicParameters();
            param.Add("@Id", NetworkDtoData.Id);
            if(NetworkDtoData.Topic != null)param.Add("Topic", NetworkDtoData.Topic);
            if(NetworkDtoData.Comment != null)param.Add("@Comment", NetworkDtoData.Comment);
            
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Network = (await sqlCon.QueryFirstOrDefaultAsync<Models.Network>("CrateOrUpdateNetwork", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {NetworkDtoData.Id}");
                
                return Network;
            }
        }*/

    }
}