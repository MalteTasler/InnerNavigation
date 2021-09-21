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
    [Route("networks")]
    public class NetworkController : ControllerBase
    {
        private readonly INetworkRepository _NetworkRepository;

        public NetworkController(INetworkRepository NetworkRepository)
        {
            _NetworkRepository = NetworkRepository;

        }

        [HttpGet]
        // [HttpHead]
        public async Task<IActionResult> GetNetworks()

        {

            List<Models.Network> networks = new List<Models.Network>();
            try
            {
                /*networks = new List<Models.Network>();
                Models.Network network = new Models.Network();
                Models.Network networkNew = new Models.Network();
                network.Name = "ipmi";
                networkNew.Name = "raid-controller";
                network.DisplayName = "IPMI";
                networkNew.DisplayName = "Raid-Controller";
                networks.Add(network);
                networks.Add(networkNew);*/
                networks = await _NetworkRepository.ReadNetworks();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (networks.Count == 0) return NoContent();
            return Ok(networks);
        }
        [Consumes("application/json")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.NetworkDTO NetworkDtoData)
        {
            var resultNetwork = new Models.Network();

            try
            {

                resultNetwork = await _NetworkRepository.CreateNetwork(NetworkDtoData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultNetwork == null) return NoContent();
            return Ok(resultNetwork);
        }
    }
}