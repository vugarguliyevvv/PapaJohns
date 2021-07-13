using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PizzaDelivery.DAL;
using PizzaDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaDelivery
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddControllersWithViews();
            //services.AddSession();
            //services.AddDistributedMemoryCache();
            services.AddDbContext<PizzaContext>(options =>
            {
                options.UseSqlServer(Configuration["ConnectionStrings:Default"]);
            });
            services.AddIdentity<AppUser, IdentityRole>(identityoptions =>
            {
                identityoptions.Password.RequiredLength = 6;
                identityoptions.Password.RequireDigit = true;
                identityoptions.Password.RequireUppercase = false;
                identityoptions.Password.RequireNonAlphanumeric = false;
                identityoptions.Password.RequireLowercase = true;

                //identityoptions.Lockout.MaxFailedAccessAttempts = 5;
                //identityoptions.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                //identityoptions.Lockout.AllowedForNewUsers = true;

                identityoptions.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<PizzaContext>().AddDefaultTokenProviders();
            services.AddCors(opttions => opttions.AddDefaultPolicy
                (
                    builder => builder.AllowAnyOrigin()
                ));
            services.AddRazorPages();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            //app.UseSession();
            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.MapControllerRoute(
                        name: "areas",
                        pattern: "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}"
                );

                endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}"
                    );
            });
        }
    }
}
