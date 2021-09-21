
using System;
using System.ComponentModel.DataAnnotations;

namespace serverView.WebAPI.Models
{
    public class ServiceDTO
    {
        public string DisplayName { get; set; }
        public string Name { get; set; }
        public string RunsOn { get; set; }
    }
}