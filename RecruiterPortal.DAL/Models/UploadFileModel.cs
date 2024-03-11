using static RecruiterPortal.DAL.Utility.Utility;

namespace RecruiterPortal.DAL.Models
{
    public class UploadFileModel
    {
        public long UserFileID { get; set; }
        public string FIleData { get; set; }
        public string FileName { get; set; }
        public string CreatedDate { get; set; }
        public long UserID { get; set; }
        public EnumFileType FileType { get; set; }
    }    
}
