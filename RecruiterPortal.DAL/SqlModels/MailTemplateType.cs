using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class MailTemplateType
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int RecruiterId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual Recruiter CreatedByNavigation { get; set; }

    public virtual Recruiter Recruiter { get; set; }

    public virtual Recruiter UpdatedByNavigation { get; set; }
}
