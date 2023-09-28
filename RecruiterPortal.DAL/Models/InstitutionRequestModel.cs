namespace RecruiterPortal.DAL.Models
{
    public class InstitutionRequestModel
    {
        public int Id { get; set; }

        public string InstituteName { get; set; }

        public bool? IsActive { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public string Address { get; set; }

        public string Town { get; set; }

        public string County { get; set; }

        public string ZipCode { get; set; }

        public int? CountryId { get; set; }

        public string StateCode { get; set; }

        public string Telephone { get; set; }

        public string Website { get; set; }

    }
}
