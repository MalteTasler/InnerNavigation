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
    [Route("categories")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _CategoryRepository;

        public CategoryController(ICategoryRepository CategoryRepository)
        {
            _CategoryRepository = CategoryRepository;

        }

        [HttpGet]
        // [HttpHead]
        public async Task<IActionResult> GetCategories()

        {
            Console.WriteLine("getting");
            List<Models.Category> categories = new List<Models.Category>();
            try
            {
                /*categories = new List<Models.Category>();
                Models.Category category = new Models.Category();
                Models.Category categoryNew = new Models.Category();
                category.Name = "ipmi";
                categoryNew.Name = "raid-controller";
                category.DisplayName = "IPMI";
                categoryNew.DisplayName = "Raid-Controller";
                categories.Add(category);
                categories.Add(categoryNew);*/
                categories = await _CategoryRepository.ReadCategories();
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (categories.Count == 0) return NoContent();
            return Ok(categories);
        }
        [Consumes("application/json")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.CategoryDTO CategoryDtoData)
        {
            var resultCategory = new Models.Category();

            try
            {

                resultCategory = await _CategoryRepository.CreateCategory(CategoryDtoData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            if (resultCategory == null) return NoContent();
            return Ok(resultCategory);
        }
    }
}