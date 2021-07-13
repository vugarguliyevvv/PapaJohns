using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PizzaDelivery.Models;
using PizzaDelivery.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginVM login)
        {
            if (!ModelState.IsValid) return View();


            //var user = await _userManager.FindByNameAsync(login.Email);
            //if (user != null)
            //{

            //    if (!await _userManager.IsEmailConfirmedAsync(user))
            //    {
            //        ModelState.AddModelError(string.Empty, "emailinizi tesdiq etmemisiniz");
            //        return View(login);
            //    }
            //}





            AppUser loginUser = await _userManager.FindByEmailAsync(login.Email);
            if (loginUser == null)
            {
                ModelState.AddModelError("", "Email or password wrong!!");
                return View(login);
            }

            if (!loginUser.isActivated)
            {
                ModelState.AddModelError("", "Your transaction has been blocked");
                return View(login);
            }
            var signInResult = await _signInManager.PasswordSignInAsync(loginUser, login.Password, login.RememberMe, true);
            if (signInResult.IsLockedOut)
            {
                ModelState.AddModelError("", "The account is locked out!");
                return View(login);
            }
            if (!signInResult.Succeeded)
            {
                ModelState.AddModelError("", "Email or password wrong!");
                return View(login);
            }
            var role = await _userManager.GetRolesAsync(loginUser);

            foreach (var item in role)
            {
                if (item == "Admin")
                {
                    return RedirectToAction("Index", "Dashboard", new { area = "Admin" });

                }
            }
            return RedirectToAction("Index", "Home");
        }
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction(nameof(Login));
        }
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterVM registerVM)
        {
            if (!ModelState.IsValid)
                return NotFound();
            AppUser appUser = new AppUser
            {
                FullName = registerVM.FullName,
                UserName = registerVM.Username,
                Email = registerVM.Email,
            };
            IdentityResult identityresult = await _userManager.CreateAsync(appUser, registerVM.Password);
            if (!identityresult.Succeeded)
            {
                foreach (var error in identityresult.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
                return View(registerVM);
            }
            await _userManager.AddToRoleAsync(appUser, "Admin");
            await _signInManager.SignInAsync(appUser, true);
            return RedirectToAction("Index", "Dashboard", new { area = "Admin"});
        }
        public async Task CreateRole()
        {
            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                await _roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
            }
        }
    }
}

