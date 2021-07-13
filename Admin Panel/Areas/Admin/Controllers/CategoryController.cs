using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PizzaDelivery.DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PizzaDelivery.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;

namespace PizzaDelivery.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class CategoryController : Controller
    {
        private readonly PizzaContext _context;
        public CategoryController(PizzaContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.Categories.ToListAsync());
        }
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Category category)
        {
            if (!ModelState.IsValid) 
                return View();
            bool existName = _context.Categories.Any(c => c.Name.ToLower().Trim() == category.Name.ToLower().Trim());
            if (existName)
            {
                ModelState.AddModelError("Name", "This category exists");
                return View();
            }
            Category newCategory = new Category
            {
                Name = category.Name.ToLower(),
            };
            await _context.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }
        public IActionResult Update(int? id)
        {
            if (id == null) return NotFound();
            Category dbCategory = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (dbCategory == null) return NotFound();
            return View(dbCategory);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Category category)
        {
            if (id == null) return NotFound();
            Category dbCategory = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (dbCategory == null) 
                return NotFound();
            if (!ModelState.IsValid) 
                return View();
            Category existCategory = _context.Categories.FirstOrDefault(x => x.Name == category.Name);
            if (existCategory != null)
            {
                if (dbCategory != existCategory)
                {
                    ModelState.AddModelError("Name", "Bu adda Category movcuddur");
                    return View();
                }
            }
            dbCategory.Name = category.Name;

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();
            Category category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
