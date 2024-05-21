namespace ContactApi.DTOs
{
    public class PaginatedContactsResult
    {
        public IEnumerable<ContactDTO> Contacts { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
