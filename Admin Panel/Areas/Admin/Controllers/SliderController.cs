using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PizzaDelivery.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PizzaDelivery.Models;
using PizzaDelivery.Extensions;
using System.IO;
using PizzaDelivery.Helper;
using Microsoft.AspNetCore.Authorization;

namespace PizzaDelivery.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class SliderController : Controller
    {
        private readonly PizzaContext _context;
        private readonly IWebHostEnvironment _env;
        public SliderController(PizzaContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.Sliders.ToListAsync());
        }
        public IActionResult Create()
        {
            if (_context.Sliders.Count() >= 5)
            {
                return RedirectToAction(nameof(Index));
            }
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Slider slider)
        {
            if (ModelState["PhotoSlider"].ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid)
            {
                return View();
            }
            if (!slider.PhotoSlider.IsImage())
            {
                ModelState.AddModelError("PhotoSlider", "Use an image file");
                return View();
            }
            if (slider.PhotoSlider.CheckFileSize(5000))
            {
                ModelState.AddModelError("PhotoSlider", "Size is bigger than 5 mb");
                return View();
            }
            string newfolder = Path.Combine("assets", "img", "slider");
            string FileName = await slider.PhotoSlider.SaveFileAsync(_env.WebRootPath, newfolder);
            Slider newslider = new Slider();
            newslider.Image = FileName;
            await _context.Sliders.AddAsync(newslider);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> Update(int? id)
        {
            if (id == null)
                return NotFound();
            Slider slide = await _context.Sliders.FindAsync(id);
            if (slide == null)
                return NotFound();
            return View(slide);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Slider slide)
        {
            if (id == null)
                return NotFound();
            if (slide == null)
            {
                return NotFound();
            }
            if (ModelState["PhotoSlider"].ValidationState == Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid)
            {
                return View();
            }
            if (!slide.PhotoSlider.IsImage())
            {
                ModelState.AddModelError("PhotoSlider", "Use an image file");
                return View();
            }
            if (slide.PhotoSlider.CheckFileSize(50000))
            {
                ModelState.AddModelError("PhotoSlider", "Size is bigger than 5mb");
                return View();
            }
            Slider dbslide = await _context.Sliders.FindAsync(id);
            if(dbslide == null) return NotFound();
            string folderpath = Path.Combine("assets", "img", "slider");
            Helpers.DeleteFile(_env.WebRootPath, folderpath, dbslide.Image);
            string FileName = await slide.PhotoSlider.SaveFileAsync(_env.WebRootPath, folderpath);
            dbslide.Image = FileName;
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();
            Slider slider = await _context.Sliders.FindAsync(id);
            if (slider == null) return NotFound();
            return View(slider);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ActionName("Delete")]
        public async Task<IActionResult> DeletePost(int? id)
        {
            if (id == null)
                return NotFound();
            Slider slide = await _context.Sliders.FindAsync(id);
            if (slide == null)
                return NotFound();
            string folderpath = Path.Combine("img", "slider");
            Helpers.DeleteFile(_env.WebRootPath, folderpath, slide.Image);
            _context.Sliders.Remove(slide);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
