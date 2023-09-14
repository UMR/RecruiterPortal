namespace RecruiterPortal.DAL.Models
{
    public class ApplicantStatusRequestModel
    {
        public long Id { get; set; }

        public long ApplicantId { get; set; }

        public int? PositionId { get; set; }

        public int? InstitutionId { get; set; }

        public byte Status { get; set; }

        public DateTime? Date { get; set; }

        public double? TotalFee { get; set; }

        public double? NetFee { get; set; }

        public double? RefFee { get; set; }

        public decimal? CurrentSalary { get; set; }

        public decimal? ExpectedSalary { get; set; }        

        public byte? ProfileStatus { get; set; }

        public string Shift { get; set; }

    }
}
