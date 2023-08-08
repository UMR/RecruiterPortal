using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-military")]
    [ApiController]
    public class UserMilitaryController : CustomControllerBase
    {
        public UserMilitaryController(ILogger<UserMilitaryController> logger) : base(logger)
        {
        }

        [Route("get/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserMilitaryByUserId(int applicantId)
        {

            try
            {
                UserMilitary userMilitary = UserMilitaryManager.GetByUserID(applicantId);
                UserMilitaryModel userMilitaryModel = null;

                if (userMilitary != null)
                {
                    userMilitaryModel = new UserMilitaryModel();
                    userMilitaryModel.UserMilitaryID = userMilitary.UserMilitaryId;
                    userMilitaryModel.Branch = userMilitary.Branch;
                    userMilitaryModel.FromDate = userMilitary.FromDate.ToString();
                    userMilitaryModel.ToDate = userMilitary.ToDate.ToString();
                    userMilitaryModel.RankAtDischarge = userMilitary.RankAtDischarge;
                    if (userMilitary.TypeOfDischarge != null)
                    {
                        userMilitaryModel.DischargeType = Convert.ToInt32(userMilitary.TypeOfDischarge).ToString();
                    }
                    else
                    {
                        userMilitaryModel.DischargeType = string.Empty;
                    }
                    userMilitaryModel.DisonourComment = userMilitary.DisonourComment;
                    userMilitaryModel.UserID = userMilitary.UserId;
                }

                return Ok(userMilitaryModel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(UserMilitaryModel userMilitaryModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    UserMilitary userMilitary = new UserMilitary();
                    userMilitary.UserMilitaryId = userMilitaryModel.UserMilitaryID;
                    userMilitary.Branch = userMilitaryModel.Branch;
                    if (!string.IsNullOrEmpty(userMilitaryModel.FromDate))
                    {
                        userMilitary.FromDate = Convert.ToDateTime(userMilitaryModel.FromDate);
                    }
                    else
                    {
                        userMilitary.FromDate = null;
                    }
                    if (!string.IsNullOrEmpty(userMilitaryModel.ToDate))
                    {
                        userMilitary.ToDate = Convert.ToDateTime(userMilitaryModel.ToDate);
                    }
                    else
                    {
                        userMilitary.ToDate = null;
                    }
                    userMilitary.RankAtDischarge = userMilitaryModel.RankAtDischarge;

                    if (!string.IsNullOrEmpty(userMilitaryModel.DischargeType))
                    {
                        if (Convert.ToInt32(userMilitaryModel.DischargeType) == (int)EnumTypeOfDischarge.Honorable)
                        {
                            userMilitary.TypeOfDischarge = Convert.ToBoolean(EnumTypeOfDischarge.Honorable);
                        }
                        else if (Convert.ToInt32(userMilitaryModel.DischargeType) == (int)EnumTypeOfDischarge.Dishonorable)
                        {
                            userMilitary.TypeOfDischarge = Convert.ToBoolean(EnumTypeOfDischarge.Dishonorable);
                        }
                    }
                    else
                    {
                        userMilitary.TypeOfDischarge = null;
                    }

                    userMilitary.DisonourComment = userMilitaryModel.DisonourComment;
                    userMilitary.UserId = userMilitaryModel.UserID;

                    UserMilitary isExist = UserMilitaryManager.GetByUserID(userMilitaryModel.UserID);

                    if (isExist == null)
                    {
                        UserMilitaryManager.SaveUserMilitary(userMilitary);
                    }
                    else
                    {
                        UserMilitaryManager.UpdateUserMilitary(userMilitary);
                    }

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return BadRequest(userMilitaryModel);
        }
    }
}
