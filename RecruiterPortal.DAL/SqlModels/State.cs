using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class State
{
    public int StateId { get; set; }

    public string StateCode { get; set; }

    public string StateName { get; set; }

    public int CountryId { get; set; }

    public string Description { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual Country Country { get; set; }
}
