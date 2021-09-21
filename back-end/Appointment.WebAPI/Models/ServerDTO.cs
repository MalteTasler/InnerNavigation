
using System;
using System.ComponentModel.DataAnnotations;

namespace serverView.WebAPI.Models
{
    public class ServerDTO
    {
        public string IPAddress { get; set; }
     
        //public DateTimeOffset StartTime {get;set;}
        public string Name  {get; set; }  
        public string VirtualHost { get; set; }
        public string MemberOff { get; set; }
        public long PositionX { get; set; }
        public long PositionY { get; set; }
        public string Room { get; set; }
        public string Sector { get; set; }
        public string Location { get; set; }
        public string LotNumber { get; set; }
        public string Street { get; set; }
        public string ZIP { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}