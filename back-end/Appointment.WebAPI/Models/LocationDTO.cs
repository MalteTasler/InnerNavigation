
using System;
using System.ComponentModel.DataAnnotations;

namespace innerNavigation.WebAPI.Models
{
    public class LocationDTO
    {
        public string Name { get; set; }
        public string LotNumber { get; set; }
        public string Street { get; set; }
        public string ZIP { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}