using ContactApi.Data;
using ContactApi.DTOs;
using ContactApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactApi.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly IDbContextFactory<ContactContext> _context;

        public ContactRepository(IDbContextFactory<ContactContext> context)
        {

            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            using var context = _context.CreateDbContext();
            return await context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetContactByIdAsync(int id)
        {
            using var context = _context.CreateDbContext();
            var all = await context.Contacts.Include(i => i.ContactDetail).ToListAsync();
            return all.Where(c => c.Id == id).FirstOrDefault();
        }

        public async Task<Contact> AddContactAsync(Contact contact)
        {
            using var context = _context.CreateDbContext();
            context.Contacts.Add(contact);
            await context.SaveChangesAsync();
            return contact;
        }

        public async Task<(IEnumerable<Contact> Contacts, int TotalCount)> GetPaginatedContactsAsync(int pageNumber, int pageSize, string searchQuery = null)
        {
            using var context = _context.CreateDbContext();

            // Query for total count
            IQueryable<Contact> query = context.Contacts.Include(i => i.ContactDetail);

            // Apply search filter if search query is provided
            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(c => c.Name.Contains(searchQuery) || c.Phone.Contains(searchQuery) || c.Email.Contains(searchQuery));
            }

            var totalContacts = await query.CountAsync();

            // Apply pagination and execute query
            var contacts = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (contacts, totalContacts);
        }


        public async Task<Contact> UpdateContactAsync(Contact contact)
        {
            using var context = _context.CreateDbContext();
            context.Entry(contact).State = EntityState.Modified;

            // If ContactDetail is not being tracked properly, you may need to explicitly set its state as well.
            if (contact.ContactDetail != null)
            {
                context.Entry(contact.ContactDetail).State = EntityState.Modified;
            }

            await context.SaveChangesAsync();
            return contact;
        }


        public async Task DeleteContactAsync(int id)
        {
            using var context = _context.CreateDbContext();
            var contact = await context.Contacts.FindAsync(id);
            if (contact != null)
            {
                context.Contacts.Remove(contact);
                await context.SaveChangesAsync();
            }
        }
    }
}
