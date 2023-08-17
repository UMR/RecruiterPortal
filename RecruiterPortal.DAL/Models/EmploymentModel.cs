namespace RecruiterPortalDAL.Models
{
    public class EmploymentModel
    {
        public string ID { get; set; }
        public long? InstituteID { get; set; }
        public string CompanyName { get; set; }        
        public string CompanyAddress { get; set; }
        public string Supervisor { get; set; }
        public string CompanyPhone { get; set; }
        public long? PositionID { get; set; }
        public string JobTitle { get; set; }
        public string StartingSalary { get; set; }
        public string EndingSalary { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public bool CanContactThisEmployer { get; set; }
        public string LeaveReason { get; set; }
        public string Responisiblities { get; set; }
        public long ApplicantID { get; set; }

    }
}
