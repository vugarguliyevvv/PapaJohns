using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PizzaDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery.DAL
{
    public class PizzaContext : IdentityDbContext<AppUser>
    {
        public PizzaContext(DbContextOptions<PizzaContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PizzaContext).Assembly);

            //modelBuilder.Entity<Slider>().HasData
            //    (
            //        new Slider { Id = 1, Image = "image.png"},
            //        new Slider { Id = 2, Image = "image2.png"}
            //    );
            //modelBuilder.Entity<Category>().HasData
            //    (
            //        new Category { Id = 1, Name = "Pizza"},
            //        new Category { Id = 2, Name = "Salads"}
            //    );
            //modelBuilder.Entity<Product>().HasData
            //    (
            //        new Product { Id = 1, Name = "Chicken Barbeque", Price = 19, CategoryId = 1},
            //        new Product { Id = 2, Name = "Western Barbeque", Price = 18, CategoryId = 1},
            //        new Product { Id = 3, Name = "Sezar", Price = 8, CategoryId = 2}
            //    );
            //modelBuilder.Entity<Restaurant>().HasData
            //    (
            //        new Restaurant { Id = 1, Name = "Nizami", Address = "Mirzağa Əliyev küç, 138", Hours = "11:00 - 23:00" }
            //    );

        }

        public DbSet<Slider> Sliders { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<RestaurantImages> RestaurantImages { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
    }
}
