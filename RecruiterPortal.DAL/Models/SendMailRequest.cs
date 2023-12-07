using Microsoft.AspNetCore.Http;

namespace RecruiterPortal.DAL.Models
{
    public class SendMailRequest
    {
        public string FromAddress { get; set; }   

        public string[] ToAddress { get; set; }

        public string[] CcAddress { get; set; }

        public string[] BccAddress { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public IFormFile[] Files { get; set; }
    }
}
