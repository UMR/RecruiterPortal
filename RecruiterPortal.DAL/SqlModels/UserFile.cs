using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class UserFile
{
    public long UserFileId { get; set; }

    public byte FileType { get; set; }

    public byte[] FileData { get; set; }

    public string FileName { get; set; }

    public DateTime CreatedDate { get; set; }

    public long UserId { get; set; }

    public virtual User User { get; set; }
}
