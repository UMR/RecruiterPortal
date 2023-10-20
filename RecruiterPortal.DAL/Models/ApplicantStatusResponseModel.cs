namespace RecruiterPortal.DAL.Models
{
    public class ApplicantStatusResponseModel
    {
        public long Id { get; set; }

        public long ApplicantId { get; set; }
        public string ApplicantName { get; set; }

        public int? PositionId { get; set; }
        public string PositionName { get; set; }

        public int? InstitutionId { get; set; }
        public string? InstitutionName { get; set; }

        public byte Status { get; set; }

        public DateTime? Date { get; set; }

        public decimal? CurrentSalary { get; set; }

        public decimal? ExpectedSalary { get; set; }   

    }
}
