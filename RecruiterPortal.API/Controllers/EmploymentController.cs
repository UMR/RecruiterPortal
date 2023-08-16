using ApplicantPortalAPI.ResourceServer.Controllers;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/employment")]
    [ApiController]
    public class EmploymentController : CustomControllerBase
    {
        public EmploymentController(ILogger<EducationController> logger) : base(logger)
        {
        }


        [Route("institute")]
        [HttpGet]
        public IActionResult GetInstituteByText(string text)
        {
            try
            {
                IEnumerable<Institution> institutions = InstitutionManager.GetInstitutions(text); 
                return Ok(institutions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("position")]
        [HttpGet]
        public IActionResult GetPositionByText(string text)
        {
            try
            {
                IEnumerable<Position> positions = PositionManager.GetPositions(text);
                return Ok(positions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
