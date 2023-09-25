using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class RecruiterMailConfig
{
    public int Id { get; set; }

    public string ProfileName { get; set; }

    public int RecruiterId { get; set; }

    public string Email { get; set; }

    public string GoogleRefreshToken { get; set; }

    public string GoogleDriveFolderId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public bool? IsGoogleApiError { get; set; }
}
