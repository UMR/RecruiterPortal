using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/recruiter")]
    [ApiController]
    public class RecruiterController : CustomControllerBase
    {
        public RecruiterController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetRecruiter()
        {

            try
            {
                List<RecruiterModel> recruiterModelList = new List<RecruiterModel>();
                DataTable recruiterDt = RecruiterManager.GetAllRecruiter();
                int recruiterCount = 0;
                if (recruiterDt != null && recruiterDt.Rows.Count > 0)
                {
                    recruiterCount = recruiterDt.Rows.Count;
                    foreach (DataRow oRow in recruiterDt.Rows)
                    {
                        RecruiterModel recruiter = new RecruiterModel();

                        recruiter.RecruiterId = Convert.ToInt32(oRow["RecruiterId"].ToString());
                        recruiter.LoginId = oRow["LoginId"].ToString();
                        recruiter.FirstName = oRow["FirstName"].ToString();
                        recruiter.LastName = oRow["LastName"].ToString();
                        recruiter.Email = oRow["Email"].ToString();
                        recruiter.Telephone = oRow["Telephone"].ToString();
                        var roleList = RoleManager.GetRoleNamesByRecruiterId(Convert.ToInt64(oRow["RecruiterId"].ToString()));
                        if (roleList != null)
                        {
                            recruiter.RecruiterRole = string.Join(",", roleList.ToArray());
                        }
                        recruiter.IsActive = Convert.ToBoolean(oRow["IsActive"].ToString());
                        recruiterModelList.Add(recruiter);
                    }
                }
                return Ok(new { recruiters = recruiterModelList, count = recruiterCount });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-recruiter-by-filter")]
        [HttpPost]
        public  IActionResult GetRecruiterByFilter(RecruiterSearchModel recruiterSearchModel)
        {

            try
            {
                return Ok(RecruiterManager.GetRecruiterByFilter(AgencyId, recruiterSearchModel));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-current-recruiter")]
        [HttpGet]
        public IActionResult GetCurrentRecruiter()
        {

            try
            {
                Recruiter recruiter = RecruiterManager.GetRecruiterByLoginid(GetCurrentUser().LoginId);
                RecruiterModel recruiterModel = new RecruiterModel();
                recruiterModel.RecruiterId = recruiter.RecruiterId;
                recruiterModel.LoginId = recruiter.LoginId;
                recruiterModel.Password = recruiter.Password;
                recruiterModel.FirstName = recruiter.FirstName;
                recruiterModel.LastName = recruiter.LastName;
                recruiterModel.Email = recruiter.Email;
                recruiterModel.Telephone = recruiter.Telephone;
                recruiterModel.IsActive = recruiter.IsActive;
                recruiterModel.AgencyId = recruiter.AgencyId;
                return Ok(recruiterModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public IActionResult AddRecruiter(RecruiterModel recruiterModel)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    BadRequest(ModelState);
                }

                if (RecruiterManager.GetRecruiterByLoginid(recruiterModel.LoginId) == null)
                {
                    Recruiter recruiter = new Recruiter();
                    recruiter.LoginId = recruiterModel.LoginId;
                    recruiter.Password = recruiterModel.Password;
                    recruiter.FirstName = recruiterModel.FirstName;
                    recruiter.LastName = recruiterModel.LastName;
                    recruiter.Email = recruiterModel.Email;
                    recruiter.Telephone = recruiterModel.Telephone;
                    recruiter.IsActive = recruiterModel.IsActive;
                    recruiter.AgencyId = recruiterModel.AgencyId;
                    recruiter.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                    recruiter.CreatedDate = DateTime.Now;
                    RecruiterManager.SaveRecruiter(recruiter);

                    Recruiter rec = RecruiterManager.GetRecruiterByLoginid(recruiterModel.LoginId);
                    if (rec != null && recruiterModel.RecruiterRole != String.Empty)
                    {
                        var splitRole = recruiterModel.RecruiterRole.Split(",");
                        if (splitRole.Length > 0)
                        {
                            foreach (var item in splitRole)
                            {
                                RecruiterRole recruiterRole = new RecruiterRole();
                                if (item == "recruiter")
                                {
                                    recruiterRole.RoleId = 1;
                                    recruiterRole.RecruiterId = rec.RecruiterId;
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                    recruiterRole.CreatedDate = DateTime.Now;
                                    RoleManager.SaveUserRole(recruiterRole);
                                }
                                if (item == "supervisor")
                                {
                                    recruiterRole.RoleId = 2;
                                    recruiterRole.RecruiterId = rec.RecruiterId;
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                    recruiterRole.CreatedDate = DateTime.Now;
                                    RoleManager.SaveUserRole(recruiterRole);
                                }
                                if (item == "manager")
                                {
                                    recruiterRole.RoleId = 3;
                                    recruiterRole.RecruiterId = rec.RecruiterId;
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                    recruiterRole.CreatedDate = DateTime.Now;
                                    RoleManager.SaveUserRole(recruiterRole);
                                }
                                if (item == "administrator")
                                {
                                    recruiterRole.RoleId = 4;
                                    recruiterRole.RecruiterId = rec.RecruiterId;
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                    recruiterRole.CreatedDate = DateTime.Now;
                                    RoleManager.SaveUserRole(recruiterRole);
                                }

                            }
                        }
                    }

                    return Ok();
                }
                else
                {
                    return Ok("Login Id already exist");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("update")]
        [HttpPost]
        public IActionResult UpdateRecruiter(RecruiterModel recruiterModel)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    BadRequest(ModelState);
                }

                Recruiter recruiter = new Recruiter();
                recruiter.RecruiterId = recruiterModel.RecruiterId;
                recruiter.FirstName = recruiterModel.FirstName;
                recruiter.LastName = recruiterModel.LastName;
                recruiter.Email = recruiterModel.Email;
                recruiter.Telephone = recruiterModel.Telephone;
                recruiter.IsActive = recruiterModel.IsActive;
                recruiter.UpdatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                recruiter.UpdatedDate = DateTime.Now;
                RecruiterManager.UpdateRecruiter(recruiter);

                RoleManager.DeleteRecruiterRole(recruiterModel.RecruiterId);

                if (recruiterModel.RecruiterRole != string.Empty)
                {
                    var splitRole = recruiterModel.RecruiterRole.Split(",");
                    if (splitRole.Length > 0)
                    {
                        foreach (var item in splitRole)
                        {
                            RecruiterRole recruiterRole = new RecruiterRole();
                            if (item == "recruiter")
                            {
                                recruiterRole.RoleId = 1;
                                recruiterRole.RecruiterId = recruiterModel.RecruiterId;
                                recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                recruiterRole.CreatedDate = DateTime.Now;
                                RoleManager.SaveUserRole(recruiterRole);
                            }
                            if (item == "supervisor")
                            {
                                recruiterRole.RoleId = 2;
                                recruiterRole.RecruiterId = recruiterModel.RecruiterId;
                                recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                recruiterRole.CreatedDate = DateTime.Now;
                                RoleManager.SaveUserRole(recruiterRole);
                            }
                            if (item == "manager")
                            {
                                recruiterRole.RoleId = 3;
                                recruiterRole.RecruiterId = recruiterModel.RecruiterId;
                                recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                recruiterRole.CreatedDate = DateTime.Now;
                                RoleManager.SaveUserRole(recruiterRole);
                            }
                            if (item == "administrator")
                            {
                                recruiterRole.RoleId = 4;
                                recruiterRole.RecruiterId = recruiterModel.RecruiterId;
                                recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                                recruiterRole.CreatedDate = DateTime.Now;
                                RoleManager.SaveUserRole(recruiterRole);
                            }

                        }
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

        [Route("update-profile")]
        [HttpPut]
        public IActionResult UpdateRecruiterProfile(RecruiterModel recruiterModel)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    BadRequest(ModelState);
                }

                Recruiter recruiter = new Recruiter();
                recruiter.RecruiterId = recruiterModel.RecruiterId;
                recruiter.FirstName = recruiterModel.FirstName;
                recruiter.LastName = recruiterModel.LastName;
                recruiter.Email = recruiterModel.Email;
                recruiter.Telephone = recruiterModel.Telephone;
                recruiter.IsActive = recruiterModel.IsActive;
                recruiter.UpdatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                recruiter.UpdatedDate = DateTime.Now;
                RecruiterManager.UpdateRecruiter(recruiter);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("update-entry-exit")]
        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> UpdateRecruiterEntry([FromBody] int recruiterId)
        {

            try
            {
                return Ok(await RecruiterManager.UpdateRecruiterEntry(recruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("entry-exit")]
        [HttpPost]
        public IActionResult GetRecruiterEntry(RecruiterHistorySearch recruiterHistorySearch)
        {

            try
            {
                return Ok(RecruiterManager.GetRecruiterEntryExit(AgencyId, recruiterHistorySearch));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("email_exist")]
        [HttpGet]
        public IActionResult IsEmailExist(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest();
                }

                DataTable dtUser = RecruiterManager.IsUserEmailExist(email, base.GetCurrentUser().RecruiterId);

                if (dtUser != null && dtUser.Rows.Count > 0)
                {
                    return Ok(true);
                }

                return Ok(false);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("change-password")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword(PasswordChangeModel passModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                string message = string.Empty;

                Recruiter recruiter = RecruiterManager.GetRecruiterByLoginid(GetCurrentUser().LoginId.ToString());
                if (recruiter != null && recruiter.Password == passModel.OldPassword)
                {
                    return Ok(await RecruiterManager.UpdateRecruiterPassword(GetCurrentUser().RecruiterId, passModel.NewPassword));
                }
                else
                {
                    message = "Password did not match";
                    return BadRequest(message);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
