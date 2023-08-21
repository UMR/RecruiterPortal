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
                DataTable agencyDt = AgencyManager.GetAgencies();
                AgencyModel agencyModel = null;

                if (agencyDt != null && agencyDt.Rows.Count > 0)
                {
                    agencyModel = new AgencyModel();
                    base.MapObjects(agencyDt, agencyModel);
                }

                return Ok(agencyModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
