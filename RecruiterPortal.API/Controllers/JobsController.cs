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

        [Route("get_jobs-by-agency-id/{skip}/{take}")]
        [HttpGet]
        public IActionResult GetJobs(int skip, int take)
        {
            try
            {
                return Ok(JobManager.GetJobByAgencyId(AgencyId, skip, take));
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
