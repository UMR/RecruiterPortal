using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class Institution
{
    public int Id { get; set; }

    public string InstituteName { get; set; }

    public bool? IsActive { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public string Address { get; set; }

    public string Town { get; set; }

    public string County { get; set; }

    public string ZipCode { get; set; }

    public int? CountryId { get; set; }

    public int? StateId { get; set; }

    public string Telephone { get; set; }

    public string Website { get; set; }

    public virtual ICollection<ApplicantStatus> ApplicantStatuses { get; set; } = new List<ApplicantStatus>();
}
