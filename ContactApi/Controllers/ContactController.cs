using Microsoft.AspNetCore.Mvc;
using ContactApi.Models;
using ContactApi.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ContactApi.Services;
using ContactApi.DTOs;

namespace ContactApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _context;

        public ContactsController(IContactService context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            return Ok(await _context.GetAllContactsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id)
        {
            var contact =await _context.GetContactByIdAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> PostContact(ContactDTO contact)
        {
           return Ok(await _context.AddContactAsync(contact));
          
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, ContactDTO contact)
        {
            if (id != contact.Id)
            {
               
                return BadRequest();
              
            }

            await _context.UpdateContactAsync(contact);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            await _context.DeleteContactAsync(id);

            return NoContent();
        }
    }
}
