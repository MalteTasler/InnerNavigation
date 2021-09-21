using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using serverView.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;

namespace Server.Web.API.Controllers
{
    public class UserController : ControllerBase{

        /*private readonly ICompanyRepository _companyRepository;
        private readonly ITokenInfoProvider _infoProvider;
        private readonly HttpClient _client = new HttpClient();

        public UserController(ITokenInfoProvider infoProvider)
        {
           
            _infoProvider = infoProvider;

        }
        [Route("user")]
        [ChaynsAuth(Uac=Uac.Manager)]
        [HttpGet]
        public async Task<IActionResult> getToken()
        {
            //var tokenPayload = _infoProvider.GetUserPayload();
            string token = HttpContext.Request.Headers["Authorization"];

            string originalToken = token;
            token = token.Replace("Bearer ", "");
            string tokenPayloadBase64Url = token.Split(".")[1];
            var tokenPayloadByteArray = WebEncoders.Base64UrlDecode(tokenPayloadBase64Url);
            string tokenPayloadString = System.Text.Encoding.UTF8.GetString(tokenPayloadByteArray);
            Token tokenPayload = JsonConvert.DeserializeObject<Token>(tokenPayloadString);

         string uri = $"https://sub50.tobit.com/backend/{tokenPayload.LocationId}/User/{tokenPayload.TobitUserId}/Groups";
           _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _infoProvider.GetToken());
           var response = await _client.GetAsync(uri);
           var groupString = await response.Content.ReadAsStringAsync();
           var result = JsonConvert.DeserializeObject<List<group>>(groupString);
           return Ok(result);*/
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         /*
            using (var httpClient = new System.Net.Http.HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(_infoProvider.GetToken());
                var uri = $"https://sub50.tobit.com/backend/{tokenPayload.LocationId}/User/{tokenPayload.TobitUserId}/Groups";
                var web = await httpClient.GetAsync(uri);
                if (web.StatusCode == (HttpStatusCode) 500)
                {
                    return Problem("Error while requesting.");
                }

                return Ok(web); //["Authorization"];
                //var web = await fetch("http://example.com/movies.json");
            }
            /*foreach (@group element in userGroups){Console.WriteLine(element.Name);}

            return Ok();
            

        }*/
    }
}