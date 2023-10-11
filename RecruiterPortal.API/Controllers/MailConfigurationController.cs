using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Services;
using RecruiterPortal.DAL.Models;
using RecruiterPortalDAL.Managers;
using System.Text.Json;

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
            await _mailCongigurationManager.Create(mailConfigurationRequest, RecruiterId);
            return Ok();
        }
    }
}
