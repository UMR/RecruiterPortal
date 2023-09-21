namespace RecruiterPortal.DAL.Models
{
    public class MailTemplateTypeResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public int RecruiterId { get; set; }

    }
}
