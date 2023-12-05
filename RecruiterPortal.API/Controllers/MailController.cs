using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Services;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;
using RecruiterPortalDAL.Managers;
using System.Data;
using System.Net.Mail;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : CustomControllerBase
    {
        private readonly IMailConfigurationService _mailConfigurationService;

        public MailController(ILogger<CustomControllerBase> logger, IMailConfigurationService mailConfigurationService) : base(logger)
        {
            _mailConfigurationService = mailConfigurationService;
        }

        [Route("send-email")]
        [HttpPost]
        public IActionResult SendMail([FromBody] SendMailRequest request)
        {
            try
            {
                MailMessage message = new MailMessage();
                message.From = new MailAddress(request.FromAddress);
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
                var result = _mailConfigurationService.SendEmail(request.FromAddress, message);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("send-bulk-email")]
        [HttpPost]
        public IActionResult SendBulkEmail(SendBulkEmailRequest request)
        {
            try
            {
                DataTable dtApplicant = MailManager.GetAllEmailByFilter(request.Email, request.FirstName, request.LastName, request.IsVerified, RecruiterId);
                List<string> emailList = new List<string>();

                if (dtApplicant != null && dtApplicant.Rows.Count > 0)
                {
                    foreach (DataRow oRow in dtApplicant.Rows)
                    {
                        emailList.Add(oRow["Email"].ToString());
                    }
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
