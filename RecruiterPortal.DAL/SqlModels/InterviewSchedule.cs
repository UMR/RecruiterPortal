using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class InterviewSchedule
{
    public long Id { get; set; }

    public int RecruiterId { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual Recruiter Recruiter { get; set; }
}
