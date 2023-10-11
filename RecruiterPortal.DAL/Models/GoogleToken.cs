namespace RecruiterPortal.DAL.Models
{
    public class GoogleToken
    {        
        public string user_id { get; set; }
        public string email { get; set; }

        public string access_type { get; set; }

        public string scope { get; set; }

        public string token_type { get; set; }

        public string access_token { get; set; }

        public string refresh_token { get; set; }

        public string audience { get; set; }

        public string issued_to { get; set; }

        public string expires_in { get; set; }

        public string error { get; set; }
    }
}
