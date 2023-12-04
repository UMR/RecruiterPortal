namespace RecruiterPortal.DAL.Models
{
    public class SMSLogModel
    {
        public int Id { get; set; }

        public DateTime SendTime { get; set; }

        public string FromNumber { get; set; }

        public string ToNumber { get; set; }

        public string Smsbody { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

    }
}
