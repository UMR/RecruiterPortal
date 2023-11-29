using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Services;
using RecruiterPortal.DAL.Models;
using RecruiterPortalDAL.Managers;
using System.Net.Mail;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailConfigurationController : CustomControllerBase
    {
        private readonly IMailConfigurationService _mailConfigurationService;
        private readonly IMailConfigurationManager _mailCongigurationManager;

        public MailConfigurationController(ILogger<CustomControllerBase> logger, IMailConfigurationService mailConfigurationService,
            IMailConfigurationManager mailCongigurationManager) : base(logger)
        {
            _mailConfigurationService = mailConfigurationService;
            _mailCongigurationManager = mailCongigurationManager;
        }

        [Route("get-mail-config-by-recruiterid")]
        [HttpGet]
        public async Task<IActionResult> GetMailConfigByRecruiterId()
        {
            return Ok(await _mailCongigurationManager.GetMailConfigByRecruiterId(RecruiterId));
        }

        [Route("get-gmail-service/{email}")]
        [HttpGet]
        public IActionResult GetGmailService(string email)
        {           
            
            return Ok();
        }

        [Route("get-mail-config-by-id/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetMailConfigById(int id)
        {
            return Ok(await _mailCongigurationManager.GetMailConfigById(id));
        }

        [Route("get-authorization-url")]
        [HttpPost]
        public IActionResult GetAuthorizationUrl(MailConfigurationRequest mailConfigurationRequest)
        {
            return Ok(_mailConfigurationService.GetAuthorizationUrl(mailConfigurationRequest));
        }

        [Route("save-token")]
        [HttpPost]
        public async Task<IActionResult> SaveToken(MailConfigurationRequest mailConfigurationRequest)
        {
            var token = await _mailConfigurationService.GetTokenByCode(mailConfigurationRequest.Code);
            if (token == null)
            {
                return BadRequest("Failed to get token");
            }

            mailConfigurationRequest.GoogleRefreshToken = token.refresh_token;
            if (mailConfigurationRequest.Id > 0)
            {
                return Ok(await _mailCongigurationManager.Update(mailConfigurationRequest, RecruiterId));
            }

            return Ok(await _mailCongigurationManager.Create(mailConfigurationRequest, RecruiterId));
        }

        [Route("send-mail")]
        [HttpPost]
        public IActionResult SendMail([FromBody] SendMailRequest request)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress("kaptan.cse@gmail.com");
            foreach (string toAddress in request.ToAddress) 
            {
                message.To.Add(new MailAddress(toAddress));
            }
            foreach (string ccAddress in request.CcAddress)
            {
                message.To.Add(new MailAddress(ccAddress));
            }
            foreach (string bccAddress in request.BccAddress)
            {
                message.Bcc.Add(new MailAddress(bccAddress));
            }            
            message.Subject = request.Subject;
            message.Body = request.Body;
            message.IsBodyHtml = true;
            var result = _mailConfigurationService.SendEmail("kaptan.cse@gmail.com",message);
            return Ok();
        }

        [Route("delete-mail-config/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMailConfig(int id)
        {
            try
            {
                bool? result = await _mailCongigurationManager.Delete(id);
                if (result == null)
                {
                    return NotFound();
                }
                return StatusCode(200);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
