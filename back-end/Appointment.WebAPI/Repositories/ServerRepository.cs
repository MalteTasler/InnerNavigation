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
    public class ServerRepository : IServerRepository
    {
        /*private string getSomeTimes(int weekDay) {
            return (@$"
            SELECT  
                    [BoardId],
	                [WeekDay],
	                [StartTime],
	                [EndTime] 
	        FROM ServerTime
	        WHERE WeekDay = {weekDay}
	        ");}*/

        private const string getAllServers= @"
            SELECT  Id 
	                ,[Name]
                    ,[MemberOff]
                    ,[VirtualHost]
                    ,[IPAddress]
                    ,[PositionX]
                    ,[PositionY]
                    ,[Room]
                    ,[Sector]
                    ,[Location]
                    ,[LotNumber]
                    ,[Street]
                    ,[ZIP]
                    ,[City]
                    ,[Country]
                    ,[CreationTime] FROM viServer ORDER BY Id
        ";

        private const string getOneServer = @"SELECT * FROM viServer WHERE Id = @Id";
        private const string updateServer = @"UpdateServer";
        private const string deleteServer = @"DeleteServer";
        private readonly IDBContext _dbContext;
        private readonly ILogger _logger;
        
        private const string getSomeServersFilter = @"SELECT * FROM vServer WHERE Name = @name";
        private const string getSomeServersSearch = @"SELECT * FROM vServer WHERE Name LIKE @searchQuery OR FoundedDate LIKE @searchQuery";
        private const string getSomeServersFilterSearch = @"SELECT * FROM vServer WHERE Name = @name AND (Name LIKE '@searchQuery' OR FoundedDate LIKE '@searchQuery')";

        
        public ServerRepository(IDBContext dbContext, ILogger<ServerRepository> logger )
        {
            _dbContext = dbContext;
            _logger = logger;
            _logger.LogInformation("Application is setting up.");
        }

        public async Task<List<Models.Server>> ReadServers()
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var servers = (await sqlCon.QueryAsync<Models.Server>(getAllServers)).ToList();
                    return servers;
                }
                catch (Exception ex)
                {
                    _logger.LogError("Reading all rows in Server failed.",ex);
                    throw ex;
                }
            }
        }

        public async Task<Models.Server> PutServer(Models.Server ServerDtoData)
        {
            var Server = new Models.Server();
            var param = new DynamicParameters();
            param.Add("@Id", ServerDtoData.Id);
            /*string dummyDate = $"{toUpdate.FoundedDate.Year}-{toUpdate.FoundedDate.Month}-{toUpdate.FoundedDate.Day}";
            string format = "yyyy-MM-dd";
            var current = new List<dynamic>();
            DateTime finalDate;
            bool dateFormat = DateTime.TryParseExact(dummyDate, format, new CultureInfo("en-US"), DateTimeStyles.None, out finalDate);*/
           
           using (var sqlCon = await _dbContext.GetDBContext())
            {

                try
                {
                    Server = (await sqlCon.QueryFirstOrDefaultAsync<Models.Server>("CrateOrUpdateServer", param, commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Putting failed.",ex);
                    throw ex;
                }
                _logger.LogInformation($"Updated everything in id {ServerDtoData.Id}");
                return Server;
            }
            return ServerDtoData; // test
        }
        public async Task<Models.Server> CreateServer(ServerDTO ServerDtoData)
        {
            string contextId;
            var Server = new Models.Server();
            var param = new DynamicParameters();
            param.Add("@Name", ServerDtoData.Name);
            param.Add("@Comment", "");
            param.Add("@StartTime", null);
            param.Add("@IPAddress", ServerDtoData.IPAddress);
            param.Add("@VirtualHost", ServerDtoData.VirtualHost);
            param.Add("@MemberOff", ServerDtoData.MemberOff);
            param.Add("@PositionX", ServerDtoData.MemberOff);
            param.Add("@PositionY", ServerDtoData.MemberOff);
            param.Add("@Room", ServerDtoData.Room);
            param.Add("@Sector", ServerDtoData.Sector);
            param.Add("@Location", ServerDtoData.Location);
            param.Add("@LotNumber", ServerDtoData.LotNumber);
            param.Add("@Street", ServerDtoData.Street);
            param.Add("@ZIP", ServerDtoData.ZIP);
            param.Add("@City", ServerDtoData.City);
            param.Add("@Country", ServerDtoData.Country);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Server = (await sqlCon.QueryFirstOrDefaultAsync<Models.Server>("CreateServer", param, commandType: CommandType.StoredProcedure));
                    return Server;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Updating all columns failed.",ex);
                    throw ex;
                }
            }
        }

        public async Task<bool> ServerExists(int id)
        {
            var param = new DynamicParameters();
            param.Add("@id",id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var input = (await sqlCon.QueryAsync<Models.Server>($"SELECT * FROM vServer WHERE id = @id",param)).ToList();
                    return input.Any();
                }
                catch (Exception ex)
                {
                    _logger.LogError("Looking for Server did not work.");
                    throw ex;
                }
            }

        }
        public async Task<Models.Server> PatchServer(Models.Server ServerDtoData)
        {
            var Server = new Models.Server();
            var param = new DynamicParameters();
            param.Add("@Name", ServerDtoData.Name);
            param.Add("@StartTIme", null);
            param.Add("@Comment", "");
            param.Add("@IPAddress", ServerDtoData.IPAddress);
            param.Add("@VirtualHost", ServerDtoData.VirtualHost);
            param.Add("@MemberOff", ServerDtoData.MemberOff);
            param.Add("@PositionX", ServerDtoData.MemberOff);
            param.Add("@PositionY", ServerDtoData.MemberOff);
            param.Add("@Room", ServerDtoData.Room);
            param.Add("@Sector", ServerDtoData.Sector);
            param.Add("@Location", ServerDtoData.Location);
            param.Add("@LotNumber", ServerDtoData.LotNumber);
            param.Add("@Street", ServerDtoData.Street);
            param.Add("@ZIP", ServerDtoData.ZIP);
            param.Add("@City", ServerDtoData.City);
            param.Add("@Country", ServerDtoData.Country);
            if (ServerDtoData.Name != null)param.Add("@Name", ServerDtoData.Name);
            
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Server = (await sqlCon.QueryFirstOrDefaultAsync<Models.Server>("CreateServer", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {ServerDtoData.Id}");
                
                return Server;
            }
        }
        public async Task<Models.Server> ReadServer(long id)
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var param = new DynamicParameters();
                    param.Add("@Id", id);
                    
                    //logger.LogInformation();
                    var Server = (await sqlCon.QueryFirstOrDefaultAsync<Models.Server>(getOneServer, param));
                    
                    _logger.LogInformation("Sucesfully executed.");
                    return Server;
                    /*return new ServerModel()
                    {
                        Id = Server[0].Id,
                        Name= Server[0].Name,
                        FoundedDate = Server[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Server with id {id} did not work.");
                    throw ex;
                }
            }
        }
        public async Task<bool> DeleteServer(int id)
        {     
            var param = new DynamicParameters();
            param.Add("@id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    //logger.LogInformation();
                    var Server = (await sqlCon.QueryAsync(deleteServer, param, commandType: CommandType.StoredProcedure)).ToList();
                    //string watchString = getOneServer + 


                    return true;
                    /*return new ServerModel()
                    {
                        Id = Server[0].Id,
                        Name= Server[0].Name,
                        FoundedDate = Server[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Server with id {id} did not work.");
                    throw ex;
                    return false;
                }
            }
        }

        /*public async Task<Models.Server> PatchServer(Models.Server ServerDtoData)
        {
            var Server = new Models.Server();
            var param = new DynamicParameters();
            param.Add("@Id", ServerDtoData.Id);
            if(ServerDtoData.Topic != null)param.Add("Topic", ServerDtoData.Topic);
            if(ServerDtoData.Comment != null)param.Add("@Comment", ServerDtoData.Comment);
            
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Server = (await sqlCon.QueryFirstOrDefaultAsync<Models.Server>("CrateOrUpdateServer", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {ServerDtoData.Id}");
                
                return Server;
            }
        }*/
        
    }
}