using System.ComponentModel.DataAnnotations.Schema;

namespace ContactApi.Models
{
    public class Contact
{
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }

        public int ContactDetailId { get; set; }
        [ForeignKey(nameof(ContactDetailId))]
        public ContactDetail ContactDetail { get; set; }
    }

}
