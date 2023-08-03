using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class LookupZipCode
{
    public int Id { get; set; }

    public string ZipCode { get; set; }

    public string City { get; set; }

    public string StateAbbr { get; set; }

    public string County { get; set; }

    public string Type { get; set; }

    public string AcceptableCities { get; set; }

    public string UnacceptableCities { get; set; }

    public string Timezone { get; set; }

    public double? AreaCodes { get; set; }

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    public string WorldRegion { get; set; }

    public string Country { get; set; }

    public double? Decommissioned { get; set; }

    public double? EstimatedPopulation { get; set; }

    public string Notes { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
}
