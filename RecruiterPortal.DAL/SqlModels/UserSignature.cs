using System;
using System.Collections.Generic;

namespace RecruiterPortal.DAL.SqlModels;

public partial class UserSignature
{
    public long UserSignatureId { get; set; }

    public string SignatureName { get; set; }

    public DateTime CreatedDate { get; set; }

    public long UserId { get; set; }

    public virtual User User { get; set; }
}
