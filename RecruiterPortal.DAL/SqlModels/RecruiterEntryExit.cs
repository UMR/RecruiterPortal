using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class RecruiterEntryExit
{
    public long Id { get; set; }

    public int RecruiterId { get; set; }

    public DateTime LogInTime { get; set; }

    public DateTime? LogOutTime { get; set; }

    public virtual Recruiter Recruiter { get; set; }
}
