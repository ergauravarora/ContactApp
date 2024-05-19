using HotChocolate;
using HotChocolate.Types;
using ContactApi.Models;
using ContactApi.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactApi.Data;

namespace ContactApi.GraphQL
{
    public class Query
    {
        private readonly IContactRepository _contactRepository;

        public Query(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        
        [GraphQLName("contacts")]
        public Task<IEnumerable<Contact>> GetContacts() => _contactRepository.GetAllContactsAsync();

        [UseDbContext(typeof(ContactContext))]
        [GraphQLName("contactById")]
        public Task<Contact> GetContactById(int id) => _contactRepository.GetContactByIdAsync(id);
    }
}
