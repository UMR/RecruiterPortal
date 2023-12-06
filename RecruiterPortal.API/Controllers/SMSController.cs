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
        public IConfiguration _configuration { get; set; }
        public SMSController(ILogger<CustomControllerBase> logger, IConfiguration configuration) : base(logger)
        {
            _configuration = configuration;
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
        public async Task<IActionResult> SendSMS(SMSRequestModel smsModel)
        {

            try
            {
                SMSHistoryManager sMSLog = new SMSHistoryManager(_configuration);
                return Ok(sMSLog.SendSMS(smsModel.Smsbody, smsModel.ToNumber, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
