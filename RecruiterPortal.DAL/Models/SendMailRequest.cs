﻿namespace RecruiterPortal.DAL.Models
{
    public class SendMailRequest
    {
        public string[] ToAddress { get; set; }

        public string[] CcAddress { get; set; }

        public string[] BccAddress { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }
    }
}
