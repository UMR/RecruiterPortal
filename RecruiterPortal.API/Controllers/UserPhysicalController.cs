using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-physical")]
    [ApiController]
    public class UserPhysicalController : CustomControllerBase
    {
        public UserPhysicalController(ILogger<UserPhysicalController> logger) : base(logger)
        {
        }

        [Route("get/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserPhysicalInfoByUserId(int applicantId)
        {
            try
            {
                UserPhysical userPhysical = UserPhysicalManager.GetByUserID(applicantId);
                UserPhysicalModel userPhysicalModel = null;

                if (userPhysical != null)
                {
                    userPhysicalModel = new UserPhysicalModel();
                    userPhysicalModel.UserPhysicalID = userPhysical.UserPhysicalId;
                    userPhysicalModel.Height = userPhysical.Height;
                    userPhysicalModel.HairColor = userPhysical.HairColor;
                    userPhysicalModel.EyeColor = userPhysical.EyeColor;
                    userPhysicalModel.Race = userPhysical.Race;
                    userPhysicalModel.Weight = userPhysical.Weight;
                    userPhysicalModel.UserID = userPhysical.UserId;
                }

                return Ok(userPhysicalModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }            
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(UserPhysicalModel userPhysicalModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    UserPhysical userPhysical = new UserPhysical();
                    userPhysical.UserPhysicalId = userPhysicalModel.UserPhysicalID;
                    userPhysical.Height = userPhysicalModel.Height;
                    userPhysical.HairColor = userPhysicalModel.HairColor;
                    userPhysical.EyeColor = userPhysicalModel.EyeColor;
                    userPhysical.Race = userPhysicalModel.Race;
                    userPhysical.Weight = userPhysicalModel.Weight;
                    userPhysical.UserId = userPhysicalModel.UserID;

                    UserPhysical isExist = UserPhysicalManager.GetByUserID(userPhysicalModel.UserID);

                    if (isExist == null)
                    {
                        UserPhysicalManager.SaveUserPhysical(userPhysical);
                    }
                    else
                    {
                        userPhysical.UserPhysicalId = isExist.UserPhysicalId;
                        UserPhysicalManager.UpdateUserPhysical(userPhysical);
                    }

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }

            return BadRequest(userPhysicalModel);
        }
    }
}
