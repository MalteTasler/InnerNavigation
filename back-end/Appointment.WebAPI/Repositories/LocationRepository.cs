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

namespace serverView.WebAPI.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        /*private string getSomeTimes(int weekDay) {
            return (@$"
            SELECT  
                    [BoardId],
	                [WeekDay],
	                [StartTime],
	                [EndTime] 
	        FROM LocationTime
	        WHERE WeekDay = {weekDay}
	        ");}*/

        private const string getAllLocations = @"
            SELECT  Id 
	                ,[Name]
                    ,[LotNumber]
                    ,[Street]
                    ,[ZIP]
                    ,[City]
                    ,[Country]
                    ,[CreationTime] FROM viLocation ORDER BY Id
        ";

        private const string getOneLocation = @"SELECT * FROM viLocation WHERE Id = @Id";
        private const string updateLocation = @"UpdateLocation";
        private const string deleteLocation = @"DeleteLocation";
        private readonly IDBContext _dbContext;
        private readonly ILogger _logger;

        private const string getSomeLocationsFilter = @"SELECT * FROM vLocation WHERE Name = @name";
        private const string getSomeLocationsSearch = @"SELECT * FROM vLocation WHERE Name LIKE @searchQuery OR FoundedDate LIKE @searchQuery";
        private const string getSomeLocationsFilterSearch = @"SELECT * FROM vLocation WHERE Name = @name AND (Name LIKE '@searchQuery' OR FoundedDate LIKE '@searchQuery')";


        public LocationRepository(IDBContext dbContext, ILogger<LocationRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
            _logger.LogInformation("Application is setting up.");
        }

        public async Task<List<Models.Location>> ReadLocations()
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var locations = (await sqlCon.QueryAsync<Models.Location>(getAllLocations)).ToList();
                    return locations;
                }
                catch (Exception ex)
                {
                    _logger.LogError("Reading all rows in Location failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<Models.Location> PutLocation(Models.Location LocationDtoData)
        {
            var Location = new Models.Location();
            var param = new DynamicParameters();
            param.Add("@Id", LocationDtoData.Id);
            /*string dummyDate = $"{toUpdate.FoundedDate.Year}-{toUpdate.FoundedDate.Month}-{toUpdate.FoundedDate.Day}";
            string format = "yyyy-MM-dd";
            var current = new List<dynamic>();
            DateTime finalDate;
            bool dateFormat = DateTime.TryParseExact(dummyDate, format, new CultureInfo("en-US"), DateTimeStyles.None, out finalDate);*/

            using (var sqlCon = await _dbContext.GetDBContext())
            {

                try
                {
                    Location = (await sqlCon.QueryFirstOrDefaultAsync<Models.Location>("CrateOrUpdateLocation", param, commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Putting failed.", ex);
                    throw ex;
                }
                _logger.LogInformation($"Updated everything in id {LocationDtoData.Id}");
                return Location;
            }
            return LocationDtoData; // test
        }
        public async Task<Models.Location> CreateLocation(LocationDTO LocationDtoData)
        {
            string contextId;
            var Location = new Models.Location();
            var param = new DynamicParameters();
            param.Add("@Name", LocationDtoData.Name);
            param.Add("@LotNumber", LocationDtoData.LotNumber);
            param.Add("@Street", LocationDtoData.Street);
            param.Add("@ZIP", LocationDtoData.ZIP);
            param.Add("@City", LocationDtoData.City);
            param.Add("@Country", LocationDtoData.Country);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Location = (await sqlCon.QueryFirstOrDefaultAsync<Models.Location>("CreateLocation", param, commandType: CommandType.StoredProcedure));
                    return Location;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Updating all columns failed.", ex);
                    throw ex;
                }
            }
        }

        public async Task<bool> LocationExists(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var input = (await sqlCon.QueryAsync<Models.Location>($"SELECT * FROM vLocation WHERE Id = @Id", param)).ToList();
                    return input.Any();
                }
                catch (Exception ex)
                {
                    _logger.LogError("Looking for Location did not work.");
                    throw ex;
                }
            }

        }
        public async Task<Models.Location> PatchLocation(Models.Location LocationDtoData)
        {
            var Location = new Models.Location();
            var param = new DynamicParameters();
            param.Add("@Id", LocationDtoData.Id);
            if (LocationDtoData.Name != null) param.Add("@Name", LocationDtoData.Name);

            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Location = (await sqlCon.QueryFirstOrDefaultAsync<Models.Location>("CrateOrUpdateLocation", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {LocationDtoData.Id}");

                return Location;
            }
        }
        public async Task<Models.Location> ReadLocation(int id)
        {
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    var param = new DynamicParameters();
                    param.Add("@Id", id);

                    //logger.LogInformation();
                    var Location = (await sqlCon.QueryFirstOrDefaultAsync<Models.Location>(getOneLocation, param));

                    _logger.LogInformation("Sucesfully executed.");
                    return Location;
                    /*return new LocationModel()
                    {
                        Id = Location[0].Id,
                        Name= Location[0].Name,
                        FoundedDate = Location[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Location with id {id} did not work.");
                    throw ex;
                }
            }
        }
        public async Task<bool> DeleteLocation(int id)
        {
            var param = new DynamicParameters();
            param.Add("@Id", id);
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    //logger.LogInformation();
                    var Location = (await sqlCon.QueryAsync(deleteLocation, param, commandType: CommandType.StoredProcedure)).ToList();
                    //string watchString = getOneLocation + 


                    return true;
                    /*return new LocationModel()
                    {
                        Id = Location[0].Id,
                        Name= Location[0].Name,
                        FoundedDate = Location[0].FoundedDate
                        
                    };*/
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Reading Location with id {id} did not work.");
                    throw ex;
                    return false;
                }
            }
        }

        /*public async Task<Models.Location> PatchLocation(Models.Location LocationDtoData)
        {
            var Location = new Models.Location();
            var param = new DynamicParameters();
            param.Add("@Id", LocationDtoData.Id);
            if(LocationDtoData.Topic != null)param.Add("Topic", LocationDtoData.Topic);
            if(LocationDtoData.Comment != null)param.Add("@Comment", LocationDtoData.Comment);
            
            using (var sqlCon = await _dbContext.GetDBContext())
            {
                try
                {
                    Location = (await sqlCon.QueryFirstOrDefaultAsync<Models.Location>("CrateOrUpdateLocation", param,
                        commandType: CommandType.StoredProcedure));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Patching all columns failed.", ex);
                    throw ex;
                }

                _logger.LogInformation($"Updated everything in id {LocationDtoData.Id}");
                
                return Location;
            }
        }*/

    }
}