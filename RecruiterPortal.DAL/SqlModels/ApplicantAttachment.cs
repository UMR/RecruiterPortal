using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class ApplicantAttachment
{
    public int Id { get; set; }

    public int ApplicantId { get; set; }

    public string Title { get; set; }

    public short Type { get; set; }

    public string FileName { get; set; }

    public byte[] FileData { get; set; }

    public short ResumeStatus { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public long? UserFileId { get; set; }
}
