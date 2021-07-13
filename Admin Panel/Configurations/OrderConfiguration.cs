using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PizzaDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Order");

            builder.HasKey(o => o.Id);

            builder.Property(o => o.Id).UseIdentityColumn();

            builder.Property(o => o.Fullname).HasMaxLength(50);

            builder.Property(o => o.Address).HasMaxLength(200);

            builder.Property(o => o.Phone).HasMaxLength(50);
        }
    }
}
