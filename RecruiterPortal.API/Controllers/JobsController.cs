using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : CustomControllerBase
    {
        public JobsController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-by-agency-id")]
        [HttpGet]
        public IActionResult GetJobs(int skip, int take, bool? status = null)
        {
            try
            {
                return Ok(JobManager.GetJobByAgencyId(AgencyId, skip, take, status));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-by-id/{id}")]
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


        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] JobRequestModel request)
        {
            try
            {
                if (request.JobId > 0)
                {
                    var job = JobManager.GetJobById(request.JobId);
                    if (job == null)
                    {
                        return NotFound();
                    }
                    return Ok(await JobManager.Update(request, AgencyId, RecruiterId));
                }
                return StatusCode(200, await JobManager.Insert(request, AgencyId, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                int? result = await JobManager.Delete(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
