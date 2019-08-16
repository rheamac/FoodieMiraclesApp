using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AspMvcReact.Models
{
    public class FoodItem
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public decimal Price { get; set; }

        [NotMapped]
        public int Quantity { get; set; }
        [NotMapped]
        public string Comment { get; set; }
    }
}