using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-social")]
    [ApiController]
    public class UserSocialController : CustomControllerBase
    {
        public UserSocialController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-by-userid/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserSocialByUserId(int applicantId)
        {
            try
            {
                UserSocial userSocial = UserSocialManager.GetUserSocialByUserId(applicantId);
                UserSocialModel userSocialModel = null;

                if (userSocial != null)
                {
                    userSocialModel = new UserSocialModel();
                    userSocialModel.SocialId = userSocial.SocialId;
                    userSocialModel.Linkedin = userSocial.Linkedin;
                    userSocialModel.Twitter = userSocial.Twitter;
                    userSocialModel.FaceBook = userSocial.FaceBook;
                    userSocialModel.UserID = userSocial.UserId;
                    userSocialModel.CreatedDate = userSocial.CreatedDate;
                }

                return Ok(userSocialModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(UserSocialModel userSocialModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(userSocialModel);
                }

                UserSocial userSocial = new UserSocial();
                userSocial.Linkedin = userSocialModel.Linkedin;
                userSocial.Twitter = userSocialModel.Twitter;
                userSocial.FaceBook = userSocialModel.FaceBook;
                userSocial.UserId = userSocialModel.UserID;

                UserSocial isExist = UserSocialManager.GetUserSocialByUserId(userSocialModel.UserID);

                if (isExist == null)
                {
                    userSocial.CreatedDate = DateTime.Now;
                    UserSocialManager.InsertUserSocial(userSocial);
                }
                else
                {
                    userSocial.SocialId = userSocialModel.SocialId.Value;
                    UserSocialManager.UpdateUserSocial(userSocial);
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
