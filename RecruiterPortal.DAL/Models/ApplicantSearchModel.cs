namespace RecruiterPortal.DAL.Models
{
    public class ApplicantSearchModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int RecruiterId { get; set; }
        public bool IsVerified { get; set; }
        public int take { get; set; }
        public int skip { get; set; }
    }

}
