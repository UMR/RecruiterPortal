using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class UserWorkHistory
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int? InstituteId { get; set; }

    public string InstituteName { get; set; }

    public string City { get; set; }

    public int? PositionId { get; set; }

    public string PositionName { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? Todate { get; set; }

    public bool IsContinuing { get; set; }

    public string Salary { get; set; }

    public string ReasonForLeaving { get; set; }

    public string Supervisor { get; set; }

    public string SupervisorPhone { get; set; }

    public string Responisiblities { get; set; }

    public bool? IsPrevSupervisor { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
}
