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
            return await context.Contacts.FindAsync(id);
        }

        public async Task<Contact> AddContactAsync(Contact contact)
        {
            using var context = _context.CreateDbContext();
            context.Contacts.Add(contact);
            await context.SaveChangesAsync();
            return contact;
        }

        public async Task<Contact> UpdateContactAsync(Contact contact)
        {
            using var context = _context.CreateDbContext();
            context.Entry(contact).State = EntityState.Modified;
            //_context.Entry(existingContact).CurrentValues.SetValues(contactDto);
            context.Contacts.Update(contact);
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
