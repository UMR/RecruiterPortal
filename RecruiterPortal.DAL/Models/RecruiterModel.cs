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
        public bool Odapermission { get; set; }
        public bool? IsActive { get; set; }
    }
}
