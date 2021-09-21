using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using serverView.WebAPI.Helper;
using serverView.WebAPI.Interfaces;
using serverView.WebAPI.Models;
using serverView.WebAPI.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace serverView.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Console.WriteLine("beginning");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Console.WriteLine("initializing");
            services.Configure<DBSetting>(Configuration.GetSection("DBSettings"));
            services.AddScoped<IServerRepository, ServerRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<INetworkRepository, NetworkRepository>();
            services.AddScoped<IServiceRepository, ServiceRepository>();
            services.AddScoped<ICustomLinkRepository, CustomLinkRepository>();
            services.AddSingleton<IDBContext, DBContext>();
            services.AddControllers(setupAction =>
            {
                setupAction.ReturnHttpNotAcceptable = false;
                setupAction.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
                /*setupAction.Filters.Add(new ChaynsAuthAttribute
                {
                    Uac = 1
                });*/

            });
            //services.AddChaynsAuth(typeof(CustomTokenRequirementProvider));
            services.AddCors(x => x.AddPolicy("AllowAll", y => y.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            var section = Configuration.GetSection("Logger");
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors("AllowAll");
            //app.InitChaynsAuth();
            app.UseRouting();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

    }
}