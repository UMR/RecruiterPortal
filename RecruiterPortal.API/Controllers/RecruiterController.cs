using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
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

                        recruiter.LoginId = oRow["LoginId"].ToString();
                        recruiter.FirstName = oRow["FirstName"].ToString();
                        recruiter.LastName = oRow["LastName"].ToString();
                        recruiter.Email = oRow["Email"].ToString();
                        recruiter.Telephone = oRow["Telephone"].ToString();
                        var roleList = RoleManager.GetRoleNamesByRecruiterId(Convert.ToInt64(oRow["UserId"].ToString()));
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
                    recruiter.CreatedBy = Convert.ToInt32(GetCurrentUser().UserId);
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
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().UserId);
                                    recruiterRole.CreatedDate = DateTime.Now;
                                    RoleManager.SaveUserRole(recruiterRole);
                                }
                                if (item == "supervisor")
                                {
                                    recruiterRole.RoleId = 2;
                                    recruiterRole.RecruiterId = rec.RecruiterId;
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().UserId);
                                    recruiterRole.CreatedDate = DateTime.Now;
                                    RoleManager.SaveUserRole(recruiterRole);
                                }
                                if (item == "manager")
                                {
                                    recruiterRole.RoleId = 3;
                                    recruiterRole.RecruiterId = rec.RecruiterId;
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().UserId);
                                    recruiterRole.CreatedDate = DateTime.Now;
                                    RoleManager.SaveUserRole(recruiterRole);
                                }
                                if (item == "administrator")
                                {
                                    recruiterRole.RoleId = 4;
                                    recruiterRole.RecruiterId = rec.RecruiterId;
                                    recruiterRole.CreatedBy = Convert.ToInt32(GetCurrentUser().UserId);
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
    }
}
