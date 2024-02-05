namespace RecruiterPortal.DAL.Models
{
    public class ApplicantResumeRequestModel
    {
        public int Id { get; set; }
        public int ApplicantId { get; set; }
        public string Title { get; set; }
        public int Type { get; set; } = 1;
        public string FileName { get; set; }
        public byte[] FileData { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set;}
        public bool ResumeStatus { get; set; } = true;

    }
}
