using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/applicantresume")]
    [ApiController]
    public class ApplicantResumeController : CustomControllerBase
    {
        public ApplicantResumeController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-applicant-resume-by-id/{applicantId}")]
        [HttpGet]
        public async Task<IActionResult> GetApplicantResume(int applicantId)
        {
            try
            {
                return Ok(await ApplicantResumeManager.GetApplicantResumeByAppId(applicantId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }

        }

        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> SaveApplicantResume(ApplicantResumeRequestModel requestModel)
        {
            try
            {
                return Ok(await ApplicantResumeManager.Insert(requestModel, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteApplicantResume(int id)
        {
            try
            {
                return Ok(await ApplicantResumeManager.Delete(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

    }
}
