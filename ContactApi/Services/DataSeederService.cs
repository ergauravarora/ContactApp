using ContactApi.Data;
using ContactApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ContactApi.Services
{
    public class DataSeederService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<DataSeederService> _logger;

        public DataSeederService(IServiceProvider serviceProvider, ILogger<DataSeederService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ContactContext>();

                if (await context.Contacts.AnyAsync())
                {
                    _logger.LogInformation("Database already seeded.");
                    return;
                }

                _logger.LogInformation("Seeding database...");

                var contacts = new[]
                {
                    new Contact { Name = "John Doe", Email = "john@example.com", Phone = "1234567890", Image = GetSampleImage() },
                    new Contact { Name = "Jane Smith", Email = "jane@example.com", Phone = "0987654321", Image = GetSampleImage() },
                    new Contact { Name = "Alice Johnson", Email = "alice@example.com", Phone = "2345678901", Image = GetSampleImage() },
                    new Contact { Name = "Bob Brown", Email = "bob@example.com", Phone = "3456789012", Image = GetSampleImage() },
                    new Contact { Name = "Charlie Davis", Email = "charlie@example.com", Phone = "4567890123", Image = GetSampleImage() },
                    new Contact { Name = "Dana White", Email = "dana@example.com", Phone = "5678901234", Image = GetSampleImage() },
                    new Contact { Name = "Eve Black", Email = "eve@example.com", Phone = "6789012345", Image = GetSampleImage() },
                    new Contact { Name = "Frank Green", Email = "frank@example.com", Phone = "7890123456", Image = GetSampleImage() },
                    new Contact { Name = "Grace Harris", Email = "grace@example.com", Phone = "8901234567", Image = GetSampleImage() },
                    new Contact { Name = "Hank Moore", Email = "hank@example.com", Phone = "9012345678", Image = GetSampleImage() },
                    new Contact { Name = "Ivy Adams", Email = "ivy@example.com", Phone = "0123456789", Image = GetSampleImage() },
                    new Contact { Name = "Jack Wilson", Email = "jack@example.com", Phone = "1234509876", Image = GetSampleImage() },
                    new Contact { Name = "Karen Thomas", Email = "karen@example.com", Phone = "2345610987", Image = GetSampleImage() },
                    new Contact { Name = "Leo Scott", Email = "leo@example.com", Phone = "3456721098", Image = GetSampleImage() },
                    new Contact { Name = "Megan Hall", Email = "megan@example.com", Phone = "4567832109", Image = GetSampleImage() },
                    new Contact { Name = "Nick Young", Email = "nick@example.com", Phone = "5678943210", Image = GetSampleImage() },
                    new Contact { Name = "Olivia King", Email = "olivia@example.com", Phone = "6789054321", Image = GetSampleImage() },
                    new Contact { Name = "Paul Allen", Email = "paul@example.com", Phone = "7890165432", Image = GetSampleImage() },
                    new Contact { Name = "Quinn Baker", Email = "quinn@example.com", Phone = "8901276543", Image = GetSampleImage() },
                    new Contact { Name = "Rachel Martinez", Email = "rachel@example.com", Phone = "9012387654", Image = GetSampleImage() }
                };

                context.Contacts.AddRange(contacts);
                await context.SaveChangesAsync();

                _logger.LogInformation("Database seeded successfully.");
            }
        }

        private string GetSampleImage()
        {
            // Return a sample base64-encoded image string here.
            // For demonstration, we'll return an empty string.
            // Replace this with actual base64-encoded image data.
            return "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                   "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                   "//8/w38GIAXDIBKE0DHxgljNBAAO" +
                   "9TXL0Y4OHwAAAABJRU5ErkJggg==";
        }
    }
}
