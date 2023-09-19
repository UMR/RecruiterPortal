namespace RecruiterPortal.DAL.Models
{
    public class InstitutionListModel
    {
        public int Id { get; set; }
        public string InstituteName { get; set; }
        public bool? IsActive { get; set; }
        public string Address { get; set; }
        public string Town { get; set; }
        public string County { get; set; }
        public string ZipCode { get; set; }
        public string StateName { get; set; }
        public string Telephone { get; set; }
        public string Website { get; set; }
    }

}
