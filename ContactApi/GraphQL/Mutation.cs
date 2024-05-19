using HotChocolate;
using HotChocolate.Data;
using ContactApi.Models;
using ContactApi.Data;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace ContactApi.GraphQL
{
    public class Mutation
    {
        [UseDbContext(typeof(ContactContext))]
        public async Task<Contact> AddContact([ScopedService] ContactContext context, AddContactInput input)
        {
            var contact = new Contact
            {
                Name = input.Name,
                Email = input.Email,
                Phone = input.Phone,
                Image = input.Image // New field
            };

            context.Contacts.Add(contact);
            await context.SaveChangesAsync();
            return contact;
        }

        [UseDbContext(typeof(ContactContext))]
        public async Task<Contact> UpdateContact([ScopedService] ContactContext context, UpdateContactInput input)
        {
            var contact = await context.Contacts.FindAsync(input.Id);
            if (contact != null)
            {
                contact.Name = input.Name;
                contact.Email = input.Email;
                contact.Phone = input.Phone;
                contact.Image = input.Image; // New field
                await context.SaveChangesAsync();
            }

            return contact;
        }

        [UseDbContext(typeof(ContactContext))]
        public async Task<Contact> DeleteContact([ScopedService] ContactContext context, int id)
        {
            var contact = await context.Contacts.FindAsync(id);
            if (contact != null)
            {
                context.Contacts.Remove(contact);
                await context.SaveChangesAsync();
            }

            return contact;
        }
    }

    public record AddContactInput(int Id, string Name, string Email, string Phone, string Image); // New field
    public record UpdateContactInput(int Id, string Name, string Email, string Phone, string Image); // New field
}
