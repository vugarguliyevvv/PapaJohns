using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PizzaDelivery.DAL;
using PizzaDelivery.Models;
using PizzaDelivery.DTO;
using Newtonsoft.Json;

namespace PizzaDelivery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly PizzaContext _context;
        public BasketController(PizzaContext context)
        {
            _context = context;
        }

        //[HttpPost]
        //[Route("{id}")]
        //public async Task<ActionResult> AddToCart(int id)
        //{
        //    Product product = await _context.Products.FindAsync(id);
        //    List<BasketDTO> basketDTOs;
        //    if (product == null)
        //    {
        //        return NoContent();
        //    }
        //    List<BasketDTO> existedBasketDTO;
        //    if (Request.Cookies["Basket"] != null)
        //    {
        //        existedBasketDTO = JsonConvert.DeserializeObject<List<BasketDTO>>(Request.Cookies["Basket"]);
        //    }
        //    else
        //    {
        //        existedBasketDTO = new List<BasketDTO>();
        //    }
        //    if (existedBasketDTO.Count > 0)
        //    {
        //        basketDTOs = existedBasketDTO;
        //    }
        //    else
        //    {
        //        basketDTOs = new List<BasketDTO>();
        //    }

        //    BasketDTO basketDTO = existedBasketDTO.FirstOrDefault(p => p.Id == id);
        //    if (basketDTO == null)
        //    {
        //        basketDTO = new BasketDTO
        //        {
        //            Id = product.Id,
        //            Count = 1
        //        };
        //        basketDTOs.Add(basketDTO);
        //    }
        //    else
        //    {
        //        basketDTO.Count++;
        //    }
        //    var Jsonproduct = JsonConvert.SerializeObject(basketDTOs);
        //    Response.Cookies.Append("Basket", Jsonproduct, new CookieOptions { MaxAge = TimeSpan.FromHours(2) });
        //    return Ok();
        //}

        //[HttpGet]
        //public async Task<ActionResult> GetBasket()
        //{
        //    var product = Request.Cookies["Basket"];
        //    List<BasketDTO> products = JsonConvert.DeserializeObject<List<BasketDTO>>(product);
        //    List<BasketDTO> baskets = new List<BasketDTO>();
        //    foreach (BasketDTO item in products)
        //    {
        //        Product existedProduct = await _context.Products.FindAsync(item.Id);
        //        baskets.Add(new BasketDTO
        //        {
        //            Id = item.Id,
        //            Count = item.Count,
        //            Price = existedProduct.Price * item.Count,
        //            Name = existedProduct.Name
        //        });
        //    }
        //    return Ok(baskets);
        //}

        //[HttpGet]
        //[Route("deletebasket/{id}")]
        //public ActionResult DeleteBasket(int id)
        //{
        //    List<BasketDTO> products = JsonConvert.DeserializeObject<List<BasketDTO>>(Request.Cookies["Basket"]);
        //    foreach (var item in products)
        //    {
        //        if (item.Id == id)
        //        {
        //            products.Remove(item);
        //            break;
        //        }
        //    }
        //    var basket = JsonConvert.SerializeObject(products);
        //    Response.Cookies.Append("Basket", basket, new CookieOptions { MaxAge = TimeSpan.FromHours(4) });
        //    return Ok();
        //}
        //[HttpPost]
        //[Route("order")]
        //public async Task<ActionResult> Order([FromForm] Order order)
        //{
        //    var basketcookie = Request.Cookies["Basket"];
        //    if (basketcookie == null)
        //    {
        //        return BadRequest();
        //    }
        //    List<Product> products = new List<Product>();

        //    List<BasketDTO> basketDTOs = JsonConvert.DeserializeObject<List<BasketDTO>>(basketcookie);
        //    foreach (BasketDTO item in basketDTOs)
        //    {
        //        Product product = await _context.Products.FindAsync(item.Id);
        //        products.Add(product);
        //    }
        //    List<OrderItem> orderItems = new List<OrderItem>();
        //    foreach (BasketDTO item in basketDTOs)
        //    {
        //        Product product = products.Find(p => p.Id == item.Id);
        //        OrderItem orderItem = new OrderItem
        //        {
        //            //Price = product.Price,
        //            ProductId = product.Id,
        //            Quantity = item.Count
        //        };
        //        orderItems.Add(orderItem);
        //    }
        //    Order ordercheckout = new Order
        //    {
        //        FullName = order.FullName,
        //        Adress = order.Adress,
        //        Phone = order.Phone,
        //        Date = DateTime.Now.AddHours(+4),
        //        OrderItems = orderItems,
        //        TotalAmount = orderItems.Sum(s => s.Price * s.Quantity)
        //    };
        //    await _context.Orders.AddAsync(ordercheckout);
        //    await _context.SaveChangesAsync();
        //    return Ok();
        //}
        [HttpPost]
        //[Route("order")]
        public async Task<ActionResult> Order([FromBody] Order order)
        {
            if (!ModelState.IsValid)
                return NotFound();
            await _context.AddAsync(order);
            await _context.SaveChangesAsync();
            return Ok(order);
        }
    }
}
