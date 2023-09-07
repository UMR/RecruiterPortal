using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : CustomControllerBase
    {
        public JobsController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get_jobs")]
        [HttpGet]
        public async Task<IActionResult> GetJobs()
        {
            try
            {                
                IEnumerable<Job> jobsFromRepo = await JobManager.GetJobByAgencyId(AgencyId, 1, 10);
                return Ok(new { jobs = jobsFromRepo, totalJobs = jobsFromRepo.Count() });                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
