using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery.Models
{
    public class AppUser : IdentityUser
    {
        [Required, MaxLength(150)]
        public string FullName { get; set; }
        public bool isActivated { get; set; }
    }
}
