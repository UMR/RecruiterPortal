namespace RecruiterPortal.DAL.Models
{
    public class MailConfigurationRequest
    {       
        public int Id { get; set; }
        public string ProfileName { get; set; }
        public string EmailAddress { get; set; }
        public string GoogleRefreshToken { get; set; }
        public string Code { get; set; }

    }
}
