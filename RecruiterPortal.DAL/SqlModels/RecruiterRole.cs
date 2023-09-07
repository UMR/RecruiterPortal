using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class RecruiterRole
{
    public int RecruiterId { get; set; }

    public int RoleId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
}
