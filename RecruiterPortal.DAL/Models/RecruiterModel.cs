namespace RecruiterPortal.DAL.Models
{
    public class RecruiterModel
    {
        public int UserId { get; set; }
        public string LoginId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public bool? IsActive { get; set; }
        public string Roles { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? AgencyId { get; set; }
        public string RecruiterRole { get; set; }
    }
}
