namespace RecruiterPortal.DAL.Models
{
    public class AgencyModel
    {
        public long AgencyId { get; set; }

        public string AgencyName { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public string AgencyAddress { get; set; }

        public string UrlPrefix { get; set; }

        public string AgencyEmail { get; set; }

        public string AgencyPhone { get; set; }

        public string AgencyContactPerson { get; set; }

        public string AgencyContactPersonPhone { get; set; }

        public bool? IsActive { get; set; }

        public string AgencyLoginId { get; set; }

    }
}
