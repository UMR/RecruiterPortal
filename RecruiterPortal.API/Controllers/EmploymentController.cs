using ApplicantPortalAPI.ResourceServer.Controllers;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.API.Controllers
{
    public class EmploymentController: CustomControllerBase
    {
        public EmploymentController(ILogger<EducationController> logger) : base(logger)
        {
        }              
        

        [Route("institute/{text}")]
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

    }
}
