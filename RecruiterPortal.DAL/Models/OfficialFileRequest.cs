namespace RecruiterPortal.DAL.Models
{
    public class OfficialFileRequest
    {
        public int Id { get; set; }

        public string FileName { get; set; }

        public string FileData { get; set; }

        public string Title { get; set; }

        public bool? IsRequired { get; set; }

        public bool? IsAdministrative { get; set; }

        public bool? IsActive { get; set; }
        
    }
}
