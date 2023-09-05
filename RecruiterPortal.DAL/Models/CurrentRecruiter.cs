namespace RecruiterPortal.DAL.Models
{
    public class CurrentRecruiter
    {
        public int UserId { get; set; }
        public string LoginId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }        
        public string Email { get; set; }
        public string Telephone { get; set; }
        public bool IsActive { get; set; }        
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }        
        public long AgencyId { get; set; }
        public string[] Roles { get; set; }
    }
}
