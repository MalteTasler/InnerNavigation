namespace innerNavigation.WebAPI.Models
{
    public class group
    {
        public string Name { get; set; }

        public int Id { get; set; }

        public int LocationId { get; set; }

        public int TappId { get; set; }

        public string ShowName { get; set; }

        public bool IsSystemGroup { get; set; }

        public bool Internal { get; set; }
        //public string Rights { get; set; }
    }
}