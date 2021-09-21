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
    [Route("customlinks")]
    public class CustomLinkController : ControllerBase
    {
        private readonly ICustomLinkRepository _CustomLinkRepository;

        public CustomLinkController(ICustomLinkRepository CustomLinkRepository)
        {
            _CustomLinkRepository = CustomLinkRepository;

        }

        [HttpGet]
        // [HttpHead]
        public async Task<IActionResult> GetCustomLinks()

        {

            List<Models.CustomLink> servers = new List<Models.CustomLink>();
            try
            {
                servers = new List<Models.CustomLink>();
                /*Models.CustomLink server = new Models.CustomLink();
                Models.CustomLink serverNew = new Models.CustomLink();
                server.Name = "is-test";
                serverNew.Name = "net-control";
                servers.Add(server);
                servers.Add(serverNew);*/
                servers = await _CustomLinkRepository.ReadCustomLinks();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (servers.Count == 0) return NoContent();
            return Ok(servers);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCustomLink(int id)
        {
            var CustomLink = new Models.CustomLink();
            try
            {
                CustomLink = await _CustomLinkRepository.ReadCustomLink(id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (CustomLink == null) return NoContent();
            return Ok(CustomLink);
        }

        [HttpPatch]


        public async Task<IActionResult> PartiallyUpdateCustomLink([FromBody] Models.CustomLink CustomLinkDtoData)
        {
            //Console.WriteLine(bodycontent);
            var resultCustomLink = new Models.CustomLink();

            Models.CustomLink test;
            try
            {
                test = await _CustomLinkRepository.ReadCustomLink(CustomLinkDtoData.Id);
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
                resultCustomLink = await _CustomLinkRepository.PatchCustomLink(CustomLinkDtoData
                );
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultCustomLink == null) return NoContent();
            return Ok(resultCustomLink);
        }


        [HttpPut]
        public async Task<IActionResult> TotalUpdateCustomLink([FromBody] Models.CustomLink CustomLinkDtoData)
        {
            string contextName;
            DateTimeOffset? contextDateTime;

            //Console.WriteLine(bodycontent);
            var resultCustomLink = new Models.CustomLink();

            Models.CustomLink test;
            try
            {
                test = await _CustomLinkRepository.ReadCustomLink(CustomLinkDtoData.Id);
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
                resultCustomLink = await _CustomLinkRepository.PutCustomLink(CustomLinkDtoData
                );
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultCustomLink == null) return NoContent();
            return Ok(resultCustomLink);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.CustomLinkDTO CustomLinkDtoData)
        {
            var resultCustomLink = new Models.CustomLink();

            try
            {

                resultCustomLink = await _CustomLinkRepository.CreateCustomLink(CustomLinkDtoData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultCustomLink == null) return NoContent();
            return Ok(resultCustomLink);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool CustomLinkDeleted;
            if (!(await _CustomLinkRepository.CustomLinkExists(id)))
            {
                return BadRequest();
            }

            try
            {
                CustomLinkDeleted = await _CustomLinkRepository.DeleteCustomLink(id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (CustomLinkDeleted)
                return Ok(true);
            else return Conflict();
        }
    }
}