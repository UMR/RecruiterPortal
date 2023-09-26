namespace RecruiterPortal.DAL.Models
{
    public class MailTemplateRequest
    {
        public int Id { get; set; }

        public int RecruiterId { get; set; }

        public string EmailAddress { get; set; }

        public string TemplateText { get; set; }        

        public int? MailTemplateTypeId { get; set; }
    }
}
