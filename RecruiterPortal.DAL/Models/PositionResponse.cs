﻿namespace RecruiterPortal.DAL.Models;

public class PositionResponse
{
    public int Id { get; set; }

    public string PositionName { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
    
}
