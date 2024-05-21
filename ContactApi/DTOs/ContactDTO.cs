namespace ContactApi.DTOs
{
    public class ContactDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }

        public ContactDetailDTO ContactDetail { get; set; }
    }
}
