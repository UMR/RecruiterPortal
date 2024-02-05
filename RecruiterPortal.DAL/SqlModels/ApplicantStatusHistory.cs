using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class ApplicantStatusHistory
{
    public long HistoryId { get; set; }

    public long Id { get; set; }

    public long ApplicantId { get; set; }

    public int? PositionId { get; set; }

    public int? InstitutionId { get; set; }

    public long AgencyId { get; set; }

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

    public bool? IsActive { get; set; }

    public string Notes { get; set; }
}
