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
    [Route("services")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _ServiceRepository;

        public ServiceController(IServiceRepository ServiceRepository)
        {
            _ServiceRepository = ServiceRepository;

        }

        [HttpGet]
        // [HttpHead]
        public async Task<IActionResult> GetServices()

        {

            List<Models.Service> services = new List<Models.Service>();
            try
            {
                /*services = new List<Models.Service>();
                Models.Service service = new Models.Service();
                Models.Service serviceNew = new Models.Service();
                service.Name = "ipmi";
                serviceNew.Name = "raid-controller";
                service.DisplayName = "IPMI";
                serviceNew.DisplayName = "Raid-Controller";
                services.Add(service);
                services.Add(serviceNew);*/
                services = await _ServiceRepository.ReadServices();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (services.Count == 0) return NoContent();
            return Ok(services);
        }
        [Consumes("application/json")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.ServiceDTO ServiceDtoData)
        {
            var resultService = new Models.Service();

            try
            {

                resultService = await _ServiceRepository.CreateService(ServiceDtoData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultService == null) return NoContent();
            return Ok(resultService);
        }
    }
}