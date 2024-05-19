using ContactApi.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactApi.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ContactDTO>> GetAllContactsAsync();
        Task<ContactDTO> GetContactByIdAsync(int id);
        Task<ContactDTO> AddContactAsync(ContactDTO contactDto);
        Task<(IEnumerable<ContactDTO> Contacts, int TotalCount)> GetPaginatedContactsAsync(int pageNumber, int pageSize, string searchQuery = null);
        Task<ContactDTO> UpdateContactAsync(ContactDTO contactDto);
        Task DeleteContactAsync(int id);
    }
}
