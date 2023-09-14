using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class ApplicantStatus
{
    public long Id { get; set; }

    public long ApplicantId { get; set; }

    public int? PositionId { get; set; }

    public int? InstitutionId { get; set; }

    public byte Status { get; set; }

    public DateTime? Date { get; set; }

    public double? TotalFee { get; set; }

    public double? NetFee { get; set; }

    public double? RefFee { get; set; }

    public decimal? CurrentSalary { get; set; }

    public decimal? ExpectedSalary { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public byte? ProfileStatus { get; set; }

    public string Shift { get; set; }

    public virtual User Applicant { get; set; }

    public virtual Recruiter CreatedByNavigation { get; set; }

    public virtual Institution Institution { get; set; }

    public virtual Position Position { get; set; }

    public virtual Recruiter UpdatedByNavigation { get; set; }
}
