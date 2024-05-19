using AutoMapper;
using ContactApi.DTOs;
using ContactApi.Models;
using ContactApi.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;

namespace ContactApi.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        private readonly IMapper _mapper;

        public ContactService(IContactRepository contactRepository, IMapper mapper)
        {
            _contactRepository = contactRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContactDTO>> GetAllContactsAsync()
        {
            var contacts = await _contactRepository.GetAllContactsAsync();
            return _mapper.Map<IEnumerable<ContactDTO>>(contacts);
        }

        public async Task<ContactDTO> GetContactByIdAsync(int id)
        {
            var contact = await _contactRepository.GetContactByIdAsync(id);
            return _mapper.Map<ContactDTO>(contact);
        }

        public async Task<ContactDTO> AddContactAsync(ContactDTO contactDto)
        {
            var contact = _mapper.Map<Contact>(contactDto);
            var newContact = await _contactRepository.AddContactAsync(contact);
            return _mapper.Map<ContactDTO>(newContact);
        }

        public async Task<(IEnumerable<ContactDTO> Contacts, int TotalCount)> GetPaginatedContactsAsync(int pageNumber, int pageSize,string searchQuery = null)
        {
            var (contacts, totalCount) = await _contactRepository.GetPaginatedContactsAsync(pageNumber, pageSize,searchQuery);
            var contactDtos = _mapper.Map<IEnumerable<ContactDTO>>(contacts);
            return (contactDtos, totalCount);
        }


        public async Task<ContactDTO> UpdateContactAsync(ContactDTO contactDto)
        {
            var contact = _mapper.Map<Contact>(contactDto);
            var updatedContact = await _contactRepository.UpdateContactAsync(contact);
            return _mapper.Map<ContactDTO>(updatedContact);
        }

        public async Task DeleteContactAsync(int id)
        {
            await _contactRepository.DeleteContactAsync(id);
        }
    }
}
