namespace RecruiterPortal.DAL.Models
{
    public class MailConfigurationResponse
    {
        public int Id { get; set; }
        public int RecruiterId { get; set; }
        public string ProfileName { get; set; }
        public string EmailAddress { get; set; }
        public string GoogleRefreshToken { get; set; }
        public string Code { get; set; }
        public bool IsGoogleApiError { get; set; }
    }
}
