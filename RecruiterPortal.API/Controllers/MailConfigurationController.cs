using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Models;
using RecruiterPortalDAL.Managers;
using System.Text.Json;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailConfigurationController : CustomControllerBase
    {
        private readonly IMailConfigurationManager _mailCongigurationManager;
        public MailConfigurationController(ILogger<CustomControllerBase> logger, IMailConfigurationManager mailCongigurationManager) : base(logger)
        {
            _mailCongigurationManager = mailCongigurationManager;
        }

        [Route("get-authorization-url")]
        [HttpPost]
        public IActionResult GetAuthorizationUrl(MailConfigurationRequest mailConfigurationRequest)
        {
            return Ok(_mailCongigurationManager.GetAuthorizationUrl(mailConfigurationRequest));
        }

        [Route("save-token")]
        [HttpPost]
        public IActionResult SaveToken(MailConfigurationRequest mailConfigurationRequest)
        {
            var refreshToken = _mailCongigurationManager.FetchExchangeAuthorizationCode(mailConfigurationRequest.Code, out string token);


            return Ok();
        }
    }
}
