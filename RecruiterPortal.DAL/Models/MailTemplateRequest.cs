namespace RecruiterPortal.DAL.Models
{
    public class MailTemplateRequest
    {
        public int Id { get; set; }        

        public int? RecruiterMailConfigId { get; set; }

        public string TemplateText { get; set; }        

        public int? MailTemplateTypeId { get; set; }
    }
}
