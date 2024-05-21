using HotChocolate;
using HotChocolate.Data;
using ContactApi.Models;
using ContactApi.Data;
using System.Threading.Tasks;
using HotChocolate.Types;
using ContactApi.Repositories;
using ContactApi.Services;
using ContactApi.DTOs;

namespace ContactApi.GraphQL
{
    public class Mutation
    {
        private readonly IContactService _contactRepository;

        public Mutation(IContactService contactRepository)
        {
            _contactRepository = contactRepository;
        }

   
        public async Task<ContactDTO> AddContact(AddContactInput input)
        {
            var contact = new ContactDTO
            {
                Name = input.Name,
                Email = input.Email,
                Phone = input.Phone,
                Image = input.Image,
                ContactDetail = input.ContactDetail
                
            };

           await _contactRepository.AddContactAsync(contact);
           return contact;
        }

       
        public async Task<ContactDTO> UpdateContact(UpdateContactInput input)
        {
            var contact = await _contactRepository.GetContactByIdAsync(input.Id);
            if (contact != null)
            {
                contact.Name = input.Name;
                contact.Email = input.Email;
                contact.Phone = input.Phone;
                contact.Image = input.Image; // New field
                contact.ContactDetail = input.ContactDetail;
                await _contactRepository.UpdateContactAsync(contact);
            }

            return contact;
        }

       
        public async Task<ContactDTO> DeleteContact(int id)
        {
            var contact = await _contactRepository.GetContactByIdAsync(id);
            if (contact != null)
            {
                await _contactRepository.DeleteContactAsync(id);
 
            }
            return contact;
        }
    }

    public record AddContactInput(int Id, string Name, string Email, string Phone, string Image,ContactDetailDTO ContactDetail); // New field
    public record UpdateContactInput(int Id, string Name, string Email, string Phone, string Image, ContactDetailDTO ContactDetail); // New field
}
