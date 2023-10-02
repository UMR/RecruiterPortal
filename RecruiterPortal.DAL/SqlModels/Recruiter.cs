using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class Recruiter
{
    public int RecruiterId { get; set; }

    public string LoginId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string Telephone { get; set; }

    public bool Odapermission { get; set; }

    public bool? IsActive { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public int TimeOut { get; set; }

    public long? AgencyId { get; set; }

    public long? ApplicantTypeId { get; set; }

    public virtual Agency Agency { get; set; }

    public virtual ICollection<ApplicantStatus> ApplicantStatusCreatedByNavigations { get; set; } = new List<ApplicantStatus>();

    public virtual ICollection<ApplicantStatus> ApplicantStatusUpdatedByNavigations { get; set; } = new List<ApplicantStatus>();

    public virtual ICollection<Job> JobCreatedByNavigations { get; set; } = new List<Job>();

    public virtual ICollection<Job> JobUpdatedByNavigations { get; set; } = new List<Job>();

    public virtual ICollection<MailTemplateType> MailTemplateTypeCreatedByNavigations { get; set; } = new List<MailTemplateType>();

    public virtual ICollection<MailTemplateType> MailTemplateTypeRecruiters { get; set; } = new List<MailTemplateType>();

    public virtual ICollection<MailTemplateType> MailTemplateTypeUpdatedByNavigations { get; set; } = new List<MailTemplateType>();

    public virtual ICollection<RecruiterEntryExit> RecruiterEntryExits { get; set; } = new List<RecruiterEntryExit>();
}
