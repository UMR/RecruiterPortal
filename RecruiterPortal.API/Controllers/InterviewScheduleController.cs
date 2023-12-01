using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/interviewschedule")]
    [ApiController]
    public class InterviewScheduleController : CustomControllerBase
    {
        public InterviewScheduleController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get")]
        [HttpGet]
        public async Task<IActionResult> GetInterviewSchedule()
        {
            try
            {
                return Ok(await InterviewScheduleManager.GetInterviewScheduleByRecruiterId(RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> SaveInterviewSchedule(InterviewScheduleModel requestModel)
        {
            try
            {
                if (requestModel.Id == 0)
                {
                    return Ok(await InterviewScheduleManager.InsertSchedule(requestModel, RecruiterId));
                }
                else
                {
                    return Ok(await InterviewScheduleManager.UpdateSchedule(requestModel, RecruiterId));
                }

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
                int? result = await InterviewScheduleManager.Delete(id);
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
