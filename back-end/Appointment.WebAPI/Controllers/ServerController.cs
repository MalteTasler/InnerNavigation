using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using serverView.WebAPI.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using serverView.WebAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;

namespace serverView.WebAPI.Controllers
{
    [Route("servers")]
    public class ServerController : ControllerBase
    {
        private readonly IServerRepository _ServerRepository;

        public ServerController(IServerRepository ServerRepository)
        {
            _ServerRepository = ServerRepository;

        }

        [HttpGet]
        // [HttpHead]
        public async Task<IActionResult> GetServers()

        {

            List<Models.Server> servers = new List<Models.Server>();
            try
            {
                servers = new List<Models.Server>();
                /*Models.Server server = new Models.Server();
                Models.Server serverNew = new Models.Server();
                server.Name = "is-test";
                serverNew.Name = "net-control";
                servers.Add(server);
                servers.Add(serverNew);*/
                servers = await _ServerRepository.ReadServers();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (servers.Count == 0) return NoContent();
            return Ok(servers);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetServer(int id)
        {
            var Server = new Models.Server();
            try
            {
                Server = await _ServerRepository.ReadServer(id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (Server == null) return NoContent();
            return Ok(Server);
        }

        [HttpPatch]


        public async Task<IActionResult> PartiallyUpdateServer([FromBody] Models.Server ServerDtoData)
        {
            //Console.WriteLine(bodycontent);
            var resultServer = new Models.Server();

            Models.Server test;
            try
            {
                test = await _ServerRepository.ReadServer(ServerDtoData.Id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (test == null)
            {
                return (BadRequest());
            }

            try
            {
                resultServer = await _ServerRepository.PatchServer(ServerDtoData
                );
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultServer == null) return NoContent();
            return Ok(resultServer);
        }


        [HttpPut]
        public async Task<IActionResult> TotalUpdateServer([FromBody] Models.Server ServerDtoData)
        {
            string contextName;
            DateTimeOffset? contextDateTime;

            //Console.WriteLine(bodycontent);
            var resultServer = new Models.Server();

            Models.Server test;
            try
            {
                test = await _ServerRepository.ReadServer(ServerDtoData.Id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (test == null)
            {
                return (BadRequest());
            }

            try
            {
                resultServer = await _ServerRepository.PutServer(ServerDtoData
                );
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultServer == null) return NoContent();
            return Ok(resultServer);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.ServerDTO ServerDtoData)
        {
            var resultServer = new Models.Server();

            try
            {
                
                resultServer = await _ServerRepository.CreateServer(ServerDtoData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultServer == null) return NoContent();
            return Ok(resultServer);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool ServerDeleted;
            if (!(await _ServerRepository.ServerExists(id)))
            {
                return BadRequest();
            }

            try
            {
                ServerDeleted = await _ServerRepository.DeleteServer(id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (ServerDeleted)
                return Ok(true);
            else return Conflict();
        }
    }
}