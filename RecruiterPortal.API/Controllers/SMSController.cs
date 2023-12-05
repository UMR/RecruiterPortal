using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/sms")]
    [ApiController]
    public class SMSController : CustomControllerBase
    {
        public SMSController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetSMS()
        {
            try
            {
                List<SMSLogModel> agencyModelList = new List<SMSLogModel>();
                DataTable smsDt = AgencyManager.GetAgencies();
                int agencyCount = 0;
                if (smsDt != null && smsDt.Rows.Count > 0)
                {
                    agencyCount = smsDt.Rows.Count;
                    foreach (DataRow oRow in smsDt.Rows)
                    {
                        SMSLogModel agency = new SMSLogModel();
                        agencyModelList.Add(agency);
                    }
                }
                return Ok(new { agencies = agencyModelList, agencyCount = agencyCount });
                //return Ok(agencyModelList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("send")]
        [HttpPost]
        public async Task<IActionResult> SendSMS(SMSLogModel smsModel)
        {

            try
            {
                return Ok(await SMSLogManager.SendSMS(smsModel.Smsbody, new[] { smsModel.ToNumber }, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
