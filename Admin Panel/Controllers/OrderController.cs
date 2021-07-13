using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PizzaDelivery.DAL;
using PizzaDelivery.DTO;
using PizzaDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly PizzaContext _context;
        public OrderController(PizzaContext context)
        {
            _context = context;
        }
    //    [HttpPost]
    //    public async Task<ActionResult> Get(Order orderCheckout)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            return Ok();
    //        }
    //        Order order = new Order
    //        {
    //            FullName = orderCheckout.FullName,
    //            Adress = orderCheckout.Adress,
    //            Date = DateTime.Now,
    //            Phone = orderCheckout.Phone
    //        };

    //        List<BasketDTO> basketDTOs = JsonConvert.DeserializeObject<List<BasketDTO>>(Request.Cookies["Basket"]);
    //        List<OrderItem> orderItems = new List<OrderItem>();
    //        decimal total = 0;
    //        foreach (BasketDTO item in basketDTOs)
    //        {
    //            Product dBproduct = await _context.Products.FindAsync(item.Id);
    //            OrderItem orderItem = new OrderItem
    //            {
    //                Price = dBproduct.Price,
    //                Quantity = basketDTOs.Count,
    //                ProductId = dBproduct.Id,
    //                OrderId = order.Id
    //            };
    //            total += orderItem.Price * orderItem.Quantity;
    //            orderItems.Add(orderItem);
    //        }
    //        order.TotalAmount = total;
    //        order.OrderItems = orderItems;

    //        await _context.Orders.AddAsync(order);
    //        await _context.SaveChangesAsync();

    //        foreach (var item in basketDTOs.ToList())
    //        {
    //            basketDTOs.Remove(item);
    //        }
    //        var basket = JsonConvert.SerializeObject(orderItems);
    //        Response.Cookies.Append("Basket", basket, new CookieOptions { MaxAge = TimeSpan.FromHours(6) });
    //        return Ok();
    //    }
    }
}
