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
                var interviewScheduleList= InterviewScheduleManager.GetInterviewScheduleByRecruiterId(RecruiterId);
                return Ok(await interviewScheduleList);
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
                return Ok(await InterviewScheduleManager.InsertOrUpdateSchedule(requestModel, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        //[Route("delete/{id}")]
        //[HttpDelete]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    try
        //    {
        //        int? result = await AgencyManager.Delete(id);
        //        if (result == null)
        //        {
        //            return NotFound();
        //        }
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Something went wrong: {ex}");
        //        return StatusCode(500, ex.Message);
        //    }
        //}
    }
}
