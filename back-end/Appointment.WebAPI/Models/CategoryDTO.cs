
using System;
using System.ComponentModel.DataAnnotations;

namespace serverView.WebAPI.Models
{
    public class CategoryDTO
    {
        public string DisplayName { get; set; }
        public byte isHTTPS { get; set; }
        public string Name { get; set; }
        public string Port { get; set; }
    }
}