namespace RecruiterPortal.DAL.Models;

public class PagedResponse<T>
{
    public IEnumerable<T> Records { get; set; }
    public int TotalRecords { get; set; }
}
