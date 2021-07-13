using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaDelivery.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PizzaDelivery.Models;

namespace PizzaDelivery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly PizzaContext _context;
        public MenuController(PizzaContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await _context.Categories.ToListAsync());
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            return Ok(await _context.Categories.Include(c => c.Products).FirstOrDefaultAsync(c => c.Id == id));
        }
    }
}
