using HotChocolate;
using HotChocolate.Types;
using ContactApi.Models;
using ContactApi.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactApi.Data;
using ContactApi.Services;
using ContactApi.DTOs;

namespace ContactApi.GraphQL
{
    public class Query
    {
        private readonly IContactService _contactRepository;

        public Query(IContactService contactRepository)
        {
            _contactRepository = contactRepository;
        }

        
        [GraphQLName("contacts")]
        public Task<IEnumerable<ContactDTO>> GetContacts() => _contactRepository.GetAllContactsAsync();

        
        [GraphQLName("contactById")]
        public Task<ContactDTO> GetContactById(int id) => _contactRepository.GetContactByIdAsync(id);

        [GraphQLName("contactPaginated")]
        public async Task<PaginatedContactsResult> GetPaginatedContacts(int pageNumber, int pageSize, string searchQuery = null)
        {
            var (contacts, totalCount) = await _contactRepository.GetPaginatedContactsAsync(pageNumber, pageSize,searchQuery);
            return new PaginatedContactsResult
            {
                Contacts = contacts,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }
    }
   
}
