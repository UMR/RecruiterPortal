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
    public class SMSHistoryController : CustomControllerBase
    {
        public IConfiguration _configuration { get; set; }
        public SMSHistoryController(ILogger<CustomControllerBase> logger, IConfiguration configuration) : base(logger)
        {
            _configuration = configuration;
        }

        [Route("get")]
        [HttpGet]
        public async Task<IActionResult> GetSMSHistory()
        {
            try
            {
                return Ok(await SMSHistoryManager.GetSmsHistory());
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
