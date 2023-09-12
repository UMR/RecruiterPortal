namespace RecruiterPortal.DAL.Models;

public class JobRequestModel
{
    public int JobId { get; set; }

    public bool? Status { get; set; }

    public string JobTitle { get; set; }

    public string JobDescription { get; set; }

    public int? PositionId { get; set; }

    public int? InstituteId { get; set; }

    public long AgencyId { get; set; }
   
}
