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
                //int agencyCount = 0;
                //if (agencyDt != null && agencyDt.Rows.Count > 0)
                //{
                //    agencyCount = agencyDt.Rows.Count;
                //    foreach (DataRow oRow in agencyDt.Rows)
                //    {
                //        InterviewScheduleModel interviewSchedule = new InterviewScheduleModel();

                //        //agency.AgencyAddress = oRow["AgencyAddress"].ToString();
                //        //agency.AgencyContactPerson = oRow["AgencyContactPerson"].ToString();
                //        //agency.AgencyContactPersonPhone = oRow["AgencyContactPersonPhone"].ToString();
                //        //agency.AgencyEmail = oRow["AgencyEmail"].ToString();
                //        //agency.AgencyName = oRow["AgencyName"].ToString();
                //        //agency.AgencyPhone = oRow["AgencyPhone"].ToString();
                //        //agency.UrlPrefix = oRow["URLPrefix"].ToString();
                //        //agency.IsActive = Convert.ToBoolean(oRow["IsActive"].ToString());
                //        //agency.AgencyId = Convert.ToInt64(oRow["AgencyId"].ToString());
                //        interviewScheduleList.Add(interviewSchedule);
                //    }
                //}
                //return Ok(new { agencies = interviewScheduleList, agencyCount = agencyCount });
                return Ok(await interviewScheduleList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        //[Route("save")]
        //[HttpPost]
        //public IActionResult AddInterviewSchedule(AgencyModel agencyModel)
        //{

        //    try
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            BadRequest(ModelState);
        //        }


        //        Agency agency = new Agency();
        //        agency.AgencyName = agencyModel.AgencyName;
        //        agency.Urlprefix = agencyModel.UrlPrefix;
        //        agency.AgencyEmail = agencyModel.AgencyEmail;
        //        agency.AgencyPhone = agencyModel.AgencyPhone;
        //        agency.AgencyAddress = agencyModel.AgencyAddress;
        //        agency.AgencyContactPerson = agencyModel.AgencyContactPerson;
        //        agency.AgencyContactPersonPhone = agencyModel.AgencyContactPersonPhone;
        //        agency.IsActive = agencyModel.IsActive;
        //        agency.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
        //        agency.CreatedDate = DateTime.Now;
        //        AgencyManager.SaveAgency(agency);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Something went wrong: {ex}");
        //        return StatusCode(500, ex.Message);
        //    }
        //}

        //[Route("update")]
        //[HttpPost]
        //public IActionResult UpdateInterviewSchedule(AgencyModel agencyModel)
        //{

        //    try
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            BadRequest(ModelState);
        //        }

        //        Agency agency = new Agency();
        //        agency.AgencyId = agencyModel.AgencyId;
        //        agency.AgencyName = agencyModel.AgencyName;
        //        //agency.Urlprefix = agencyModel.Urlprefix;
        //        agency.AgencyEmail = agencyModel.AgencyEmail;
        //        agency.AgencyPhone = agencyModel.AgencyPhone;
        //        agency.AgencyAddress = agencyModel.AgencyAddress;
        //        agency.AgencyContactPerson = agencyModel.AgencyContactPerson;
        //        agency.AgencyContactPersonPhone = agencyModel.AgencyContactPersonPhone;
        //        agency.IsActive = agencyModel.IsActive;
        //        agency.UpdatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
        //        agency.UpdatedDate = DateTime.Now;
        //        AgencyManager.UpdateAgency(agency);

        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Something went wrong: {ex}");
        //        return StatusCode(500, ex.Message);
        //    }
        //}

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
