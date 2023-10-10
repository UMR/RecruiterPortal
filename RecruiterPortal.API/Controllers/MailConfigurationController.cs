using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Models;
using RecruiterPortalDAL.Managers;

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
        [HttpGet]
        public IActionResult GetAuthorizationUrl(MailConfigurationRequest mailConfigurationRequest)
        {
            return Ok(_mailCongigurationManager.GetAuthorizationUrl(mailConfigurationRequest));
        }
    }
}
