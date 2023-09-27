namespace RecruiterPortal.DAL.Models
{
    public class MailTemplateResponse
    {
        public int Id { get; set; }

        public int RecruiterId { get; set; }

        public string EmailAddress { get; set; }

        public string TemplateText { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public int? MailTemplateTypeId { get; set; }
    }
}
