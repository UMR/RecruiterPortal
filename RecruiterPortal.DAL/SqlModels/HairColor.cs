using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class HairColor
{
    public string HairColorCode { get; set; }

    public string HairColor1 { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
}
