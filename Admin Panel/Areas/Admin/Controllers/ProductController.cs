using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PizzaDelivery.DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using PizzaDelivery.Models;
using PizzaDelivery.Extensions;
using System.IO;
using PizzaDelivery.Helper;
using Microsoft.AspNetCore.Authorization;

namespace PizzaDelivery.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class ProductController : Controller
    {
        private readonly PizzaContext _context;
        private readonly IWebHostEnvironment _env;
        public ProductController(PizzaContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.Products.Include(p => p.Category).ToListAsync());
        }
        public IActionResult Create()
        {
            ViewBag.Categories = new SelectList(_context.Categories.ToList(), "Id", "Name");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Product product)
        {
            ViewBag.Categories = new SelectList(_context.Categories.ToList(), "Id", "Name");
            if (!ModelState.IsValid) 
                return View();
            if (ModelState["PhotoProduct"].ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid)
            {
                return View();
            }
            if (!product.PhotoProduct.IsImage())
            {
                ModelState.AddModelError("PhotoProduct", "Use an image file");
                return View();
            }
            if (product.PhotoProduct.CheckFileSize(5000))
            {
                ModelState.AddModelError("PhotoProduct", "Size is bigger than 5 mb");
                return View();
            }
            string newfolder = Path.Combine("assets", "img", "product");
            string FileName = await product.PhotoProduct.SaveFileAsync(_env.WebRootPath, newfolder);
            Product newproduct = new Product();
            newproduct.Image = FileName;
            await _context.Products.AddAsync(newproduct);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> Update(int? id)
        {
            ViewBag.Categories = new SelectList(_context.Categories.ToList(), "Id", "Name");
            if (id == null)
                return NotFound();
            Product product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Product product)
        {
            ViewBag.Categories = new SelectList(_context.Categories.ToList(), "Id", "Name");
            if (id == null)
                return NotFound();
            Product dbproduct = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(pr => pr.Id == id);
            if (dbproduct == null)
            {
                return NotFound();
            }
            if (!ModelState.IsValid) 
                return View();
            if (ModelState["PhotoProduct"].ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid)
            {
                return View();
            }
            if (!product.PhotoProduct.IsImage())
            {
                ModelState.AddModelError("PhotoProduct", "Use an image file");
                return View();
            }
            if (product.PhotoProduct.CheckFileSize(50000))
            {
                ModelState.AddModelError("PhotoProduct", "Size is bigger than 5mb");
                return View();
            }
            string folderpath = Path.Combine("assets", "img", "product");
            Helpers.DeleteFile(_env.WebRootPath, folderpath, dbproduct.Image);
            string FileName = await product.PhotoProduct.SaveFileAsync(_env.WebRootPath, folderpath);
            dbproduct.Image = FileName;
            dbproduct.Name = product.Name;
            dbproduct.Price = product.Price;
            dbproduct.Details = product.Details;
            dbproduct.CategoryId = product.CategoryId;
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) 
                return NotFound();
            Product product = await _context.Products.FindAsync(id);
            if (product == null) 
                return NotFound();
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
