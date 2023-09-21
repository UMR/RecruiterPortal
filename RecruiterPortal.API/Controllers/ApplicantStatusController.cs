using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using System.Collections;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/applicantstatus")]
    [ApiController]
    public class ApplicantStatusController : CustomControllerBase
    {
        public ApplicantStatusController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-status")]
        [HttpGet]
        public IActionResult GetApplicantStatus()
        {
            List<StatusModel> applicantStatus = ApplicantStatusManager.GetAllStatus();
            if (applicantStatus.Count > 0)
            {
                return Ok(applicantStatus);
            }
            else
            {
                return Ok();
            }
        }
    }
}
