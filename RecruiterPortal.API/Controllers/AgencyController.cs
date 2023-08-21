using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/agency")]
    [ApiController]
    public class AgencyController : CustomControllerBase
    {
        public AgencyController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetAgency()
        {

            try
            {
                List<AgencyModel> agencyModelList = new List<AgencyModel>();
                DataTable agencyDt = AgencyManager.GetAgencies();
                int agencyCount = 0;
                if (agencyDt != null && agencyDt.Rows.Count > 0)
                {
                    agencyCount=agencyDt.Rows.Count;    
                    foreach (DataRow oRow in agencyDt.Rows)
                    {
                        AgencyModel agency = new AgencyModel();

                        agency.AgencyAddress = oRow["AgencyAddress"].ToString(); 
                        agency.AgencyContactPerson = oRow["AgencyContactPerson"].ToString();
                        agency.AgencyContactPersonPhone = oRow["AgencyContactPersonPhone"].ToString();
                        agency.AgencyEmail = oRow["AgencyEmail"].ToString();
                        agency.AgencyName = oRow["AgencyName"].ToString();
                        agency.AgencyPhone = oRow["AgencyPhone"].ToString();
                        agency.Urlprefix = oRow["Urlprefix"].ToString();
                        agency.IsActive = Convert.ToBoolean(oRow["IsActive"].ToString());
                        agency.AgencyId = Convert.ToInt64(oRow["AgencyId"].ToString());
                        agencyModelList.Add(agency);
                    }
                }
                return Ok(new { agencies = agencyModelList, totalApplicants = agencyCount });
                //return Ok(agencyModelList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
