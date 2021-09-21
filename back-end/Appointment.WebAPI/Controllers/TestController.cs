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
    [Route("test")]
    public class TestController : ControllerBase
    {
        //private readonly IServerRepository _ServerRepository;

        /*public TestController(IServerRepository ServerRepository)
        {
            _ServerRepository = ServerRepository;

        }*/

        [HttpGet]
        // [HttpHead]
        public async Task<IActionResult> Test()

        {

            List<string> servers = new List<string>(){
                "an",
                "experiment"

            };
            

            if (servers.Count == 0) return NoContent();
            return Ok(servers);
        }

       
    }
}