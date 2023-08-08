﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/registration")]
    [ApiController]
    public class RegistrationController : CustomControllerBase
    {
        private readonly ILogger<RegistrationController> _logger;

        public RegistrationController(ILogger<RegistrationController> logger)
        {
            _logger = logger;
        }

        [Route("register")]
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Registration(User user)
        {
            try
            {
                user.IsVerified = false;
                int userId = UserManager.Register(user);

                return Ok(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }

        [Route("get-agency")]
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAgencyByURL()
        {
            try
            {
                return Ok(AgencyManager.GetAgencies());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);                
            }
        }

        [Route("get-agency-by-url/{url}")]
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAgencyByURL(string url)
        {
            try
            {
                _logger.LogInformation($"Something went wrong");
                return Ok(UserManager.GetAgencyByURL(url));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }

        [Route("verify")]
        [HttpPost]
        public IActionResult Verification(VerificationModel verificationCode)
        {
            try
            {
                UserVerification userVerfication = new UserVerification();
                userVerfication.VerficationCode = verificationCode.VerificationCode;
                userVerfication.UserId = GetCurrentUser().UserId;
                var count = VerificationManager.Verifiy(userVerfication);

                return Ok(count == 2 ? true : false);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }

        [Route("resend-verification-code")]
        [HttpGet]
        public IActionResult ResendVerificationCode()
        {
            try
            {
                VerificationManager.ResendVerificationCode(GetCurrentUser().UserId, GetCurrentUser().Email);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }

        [Route("{email}")]
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetUserByEmail(string email)
        {
            try
            {
                return Ok(UserManager.GetUserByEmail(email));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }
       
        [Route("delete-user/{email}")]
        [HttpDelete]
        public IActionResult DeleteUser(string email)
        {
            try
            {
                return Ok(UserManager.DeleteUserByEmail(email));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }
    }
}