using Xunit;
using ContactApi.Controllers;
using ContactApi.Models;
using ContactApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ContactApi.Services;

namespace ContactApi.Tests
{
    public class ContactsControllerTests
    {
        private readonly ContactsController _controller;
        private readonly ContactContext _context;
        private readonly IContactService _contactService;

        public ContactsControllerTests(IContactService contactService)
        {
            _contactService = contactService;
            var options = new DbContextOptionsBuilder<ContactContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
            _context = new ContactContext(options);

            _controller = new ContactsController(_contactService);
        }

        [Fact]
        public void GetContacts_ReturnsContacts()
        {
            // Act
            var result = _controller.GetContacts();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Contact>>>(result);
            var contacts = Assert.IsType<List<Contact>>(actionResult.Value);
            Assert.NotEmpty(contacts);
        }

        [Fact]
        public void GetContact_ReturnsContact()
        {
            // Arrange
            var contact = new Contact { Name = "Test", Email = "test@example.com", Phone = "1234567890" };
            _context.Contacts.Add(contact);
            _context.SaveChanges();

            // Act
            var result = _controller.GetContact(contact.Id);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Contact>>(result);
            var returnedContact = Assert.IsType<Contact>(actionResult.Value);
            Assert.Equal(contact.Id, returnedContact.Id);
        }
    }
}
