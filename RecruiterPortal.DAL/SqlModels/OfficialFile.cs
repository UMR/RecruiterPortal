using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class OfficialFile
{
    public int Id { get; set; }

    public string FileName { get; set; }

    public byte[] FileData { get; set; }

    public string Title { get; set; }

    public bool? IsRequired { get; set; }

    public bool? IsAdministrative { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long AgencyId { get; set; }
}
