using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class ViewLookUpZipCode
{
    public string SateCode { get; set; }

    public string StateName { get; set; }

    public string ZipCode { get; set; }

    public string City { get; set; }

    public string StateAbbr { get; set; }

    public string County { get; set; }

    public double? Decommissioned { get; set; }

    public string Description { get; set; }
}
