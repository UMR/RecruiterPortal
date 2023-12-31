﻿using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class Job
{
    public int JobId { get; set; }

    public bool? Status { get; set; }

    public string JobTitle { get; set; }

    public string JobDescription { get; set; }

    public int? PositionId { get; set; }

    public int? InstituteId { get; set; }

    public long AgencyId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual Agency Agency { get; set; }

    public virtual Recruiter CreatedByNavigation { get; set; }

    public virtual Recruiter UpdatedByNavigation { get; set; }
}
