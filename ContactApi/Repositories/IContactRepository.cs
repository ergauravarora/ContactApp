using ContactApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactApi.Repositories
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAllContactsAsync();
        Task<Contact> GetContactByIdAsync(int id);
        Task<Contact> AddContactAsync(Contact contact);
        Task<(IEnumerable<Contact> Contacts, int TotalCount)> GetPaginatedContactsAsync(int pageNumber, int pageSize, string searchQuery = null);
        Task<Contact> UpdateContactAsync(Contact contact);
        Task DeleteContactAsync(int id);
    }
}
