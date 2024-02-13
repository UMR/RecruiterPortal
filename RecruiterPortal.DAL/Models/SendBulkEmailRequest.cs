namespace RecruiterPortal.DAL.Models
{
    public class SendBulkEmailRequest
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public bool? IsVerified { get; set; } = null;

        public string FromAddress { get; set; }                

        public string Subject { get; set; }

        public string Body { get; set; }
    }
}
