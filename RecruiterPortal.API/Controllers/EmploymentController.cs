using ApplicantPortalAPI.ResourceServer.Controllers;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.SqlModels;

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
                
                if (!string.IsNullOrEmpty(text)) 
                {
                    var filteredInstitutions = institutions.Where(i => i.InstituteName.Contains(text));
                    var count = filteredInstitutions.Count();
                    return Ok(filteredInstitutions);
                }
                
                return Ok(institutions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
