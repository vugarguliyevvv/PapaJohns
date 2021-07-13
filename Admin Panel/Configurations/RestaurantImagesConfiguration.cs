using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PizzaDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery.Configurations
{
    public class RestaurantImagesConfiguration : IEntityTypeConfiguration<RestaurantImages>
    {
        public void Configure(EntityTypeBuilder<RestaurantImages> builder)
        {
            builder.ToTable("RestaurantImages");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id).UseIdentityColumn();

            builder.HasOne(r => r.Restaurant).WithMany(ri => ri.RestaurantImages).HasForeignKey(r => r.RestaurantId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
