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
    [Route("locations")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _LocationRepository;

        public LocationController(ILocationRepository LocationRepository)
        {
            _LocationRepository = LocationRepository;

        }

        [HttpGet]
        // [HttpHead]
        public async Task<IActionResult> GetLocations()

        {

            List<Models.Location> locations = new List<Models.Location>();
            try
            {
                locations = new List<Models.Location>();
                /*Models.Location location = new Models.Location();
                Models.Location locationNew = new Models.Location();
                location.Name = "is-test";
                locationNew.Name = "net-control";
                locations.Add(location);
                locations.Add(locationNew);*/
                locations = await _LocationRepository.ReadLocations();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (locations.Count == 0) return NoContent();
            return Ok(locations);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetLocation(int id)
        {
            var Location = new Models.Location();
            try
            {
                Location = await _LocationRepository.ReadLocation(id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (Location == null) return NoContent();
            return Ok(Location);
        }

        [HttpPatch]


        public async Task<IActionResult> PartiallyUpdateLocation([FromBody] Models.Location LocationDtoData)
        {
            //Console.WriteLine(bodycontent);
            var resultLocation = new Models.Location();

            Models.Location test;
            try
            {
                test = await _LocationRepository.ReadLocation(LocationDtoData.Id);
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
                resultLocation = await _LocationRepository.PatchLocation(LocationDtoData
                );
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultLocation == null) return NoContent();
            return Ok(resultLocation);
        }


        [HttpPut]
        public async Task<IActionResult> TotalUpdateLocation([FromBody] Models.Location LocationDtoData)
        {
            string contextName;
            DateTimeOffset? contextDateTime;

            //Console.WriteLine(bodycontent);
            var resultLocation = new Models.Location();

            Models.Location test;
            try
            {
                test = await _LocationRepository.ReadLocation(LocationDtoData.Id);
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
                resultLocation = await _LocationRepository.PutLocation(LocationDtoData
                );
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultLocation == null) return NoContent();
            return Ok(resultLocation);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.LocationDTO LocationDtoData)
        {
            var resultLocation = new Models.Location();

            try
            {

                resultLocation = await _LocationRepository.CreateLocation(LocationDtoData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultLocation == null) return NoContent();
            return Ok(resultLocation);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool LocationDeleted;
            if (!(await _LocationRepository.LocationExists(id)))
            {
                return BadRequest();
            }

            try
            {
                LocationDeleted = await _LocationRepository.DeleteLocation(id);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (LocationDeleted)
                return Ok(true);
            else return Conflict();
        }
    }
}