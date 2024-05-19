using ContactApi.Data;
using ContactApi.GraphQL.Types;
using ContactApi.GraphQL;
using ContactApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
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
                          builder.WithOrigins("http://localhost:3000","http://www.contoso.com").AllowAnyMethod().AllowAnyHeader();
                      });
});

// Add services to the container.
builder.Host.UseSerilog(); // Use Serilog for logging

// Add services to the container.
builder.Services.AddPooledDbContextFactory<ContactContext>(options => options.UseInMemoryDatabase("ContactList"));

builder.Services.AddSingleton<IContactRepository, ContactRepository>();
builder.Services.AddSingleton<IContactService, ContactService>();
builder.Services.AddSingleton<DataSeederService>();
builder.Services.AddSingleton<ContactContext>();

builder.Services.AddAutoMapper(typeof(Startup));

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddType<ContactType>()
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
seeder.SeedAsync().Wait();

app.Run();
