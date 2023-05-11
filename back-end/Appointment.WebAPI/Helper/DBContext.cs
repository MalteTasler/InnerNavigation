using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System;
using innerNavigation.WebAPI.Interfaces;
using innerNavigation.WebAPI.Models;
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;


namespace innerNavigation.WebAPI.Helper
{
    public class DBContext : IDBContext
    {
        //private const string ConnectionString = "Data Source=tappqa.tobit.ag;Initial Catalog=20Training-Server-MT;Integrated Security=True;Application Name=MTServer"; 
        private readonly DBSetting _dbSettings;

        public DBContext(IOptions<DBSetting> dbSettings)
        {
            _dbSettings = dbSettings.Value;
        }
        public async Task<IDbConnection> GetDBContext()
        {
            try
            {
                var con = new SqlConnection(_dbSettings.ConnectionString);
                await con.OpenAsync();
                return con;
            }
            catch( Exception ex)
            {
                //_logger.LogError("sql database not reached.", ex);
                throw ex;
                Console.WriteLine("SqlBulkCopy databse not reached", ex);
            }
        }
    }
}