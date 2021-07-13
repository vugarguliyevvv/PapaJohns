using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PizzaDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery.Configurations
{
    public class RestauranConfiguration : IEntityTypeConfiguration<Restaurant>
    {
        public void Configure(EntityTypeBuilder<Restaurant> builder)
        {
            builder.ToTable("Restaurants");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id).UseIdentityColumn();
            
            builder.Property(r => r.Address).HasMaxLength(100);

            builder.Property(r => r.Name).HasMaxLength(50);
        }
    }
}
