using ContactApi.Data;
using ContactApi.GraphQL;
using ContactApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using ContactApi.Repositories;
using Microsoft.EntityFrameworkCore;
using ContactApi;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Configure Serilog logging
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
                      });
});

// Add services to the container.
builder.Host.UseSerilog(); // Use Serilog for logging

// Register the DbContextFactory instead of DbContext
builder.Services.AddDbContextFactory<ContactContext>(options =>
{
    options.UseInMemoryDatabase("ContactList");
    options.EnableSensitiveDataLogging(true);
});

// Register repositories and services
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddSingleton<DataSeederService>();

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddFiltering()
    .AddSorting();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
    endpoints.MapControllers();
});

var seeder = app.Services.GetRequiredService<DataSeederService>();
seeder.SeedAsync(20).Wait();

app.Run();
