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

        [UseDbContext(typeof(ContactContext))]
        [GraphQLName("contactById")]
        public Task<ContactDTO> GetContactById(int id) => _contactRepository.GetContactByIdAsync(id);
    }
}
