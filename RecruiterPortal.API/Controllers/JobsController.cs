using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;
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

        [Route("get_jobs-by-agency-id")]
        [HttpGet]
        public IActionResult GetJobs()
        {
            try
            {                
                var jobs = JobManager.GetJobByAgencyId(AgencyId, 1, 10);
                return Ok(new { jobs = jobs, totalJobs = jobs.Count() });                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-job-by-id/{id}")]
        [HttpGet]
        public IActionResult GetJobById(int id)
        {
            try
            {                
                return Ok(JobManager.GetJobByIdWithRelated(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
