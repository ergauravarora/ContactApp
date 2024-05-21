using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ContactApi.DTOs
{
    public class ContactDetailDTO
    {
       
        public int ContactId { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }

        public string Country { get; set; }
    }
}
