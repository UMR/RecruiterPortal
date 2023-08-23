using ApplicantPortalAPI.ResourceServer.Controllers;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/employment")]
    [ApiController]
    public class EmploymentController : CustomControllerBase
    {
        public EmploymentController(ILogger<EducationController> logger) : base(logger)
        {
        }

        [HttpGet("get-emploments-by-userid/{userId}")]
        public IActionResult GetEmployment(long userId)
        {
            try
            {
                IEnumerable<UserCompany> employments = EmploymentManager.GetEmploymentsByUserId(userId);
                List<EmploymentModel> employmentsModel = new List<EmploymentModel>();

                if (employments != null && employments.Count() > 0)
                {
                    foreach (var employ in employments)
                    {
                        EmploymentModel employment = new EmploymentModel();
                        employment.ID = employ.UserCompanyId.ToString();
                        employment.CompanyName = employ.CompanyName;
                        employment.CompanyAddress = employ.CompanyAddress;
                        employment.Supervisor = employ.Supervisor;
                        employment.CompanyPhone = employ.CompanyPhone;
                        employment.JobTitle = employ.JobTitle;
                        employment.PositionID = employ.EmpositionId;
                        employment.Responisiblities = employ.Responisiblities;
                        employment.StartingSalary = employ.StartingSalary;
                        employment.EndingSalary = employ.EndingSalary;
                        employment.FromDate = employ.FromDate.HasValue ? employ.FromDate.Value.ToString("MM-dd-yyyy") : "";
                        employment.ToDate = employ.ToDate.HasValue ? employ.ToDate.Value.ToString("MM-dd-yyyy") : "";
                        employment.LeaveReason = employ.LeaveReason;
                        employment.CanContactThisEmployer = employ.CanContactThisEmployer;
                        employmentsModel.Add(employment);
                    }
                }
                return Ok(employmentsModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }


        [Route("get-emploment-by-id/{id}")]
        [HttpGet]
        public IActionResult GetEmploymentByEmploymentId(long id)
        {
            try
            {
                UserCompany employment = EmploymentManager.GetEmploymentById(id);
                EmploymentModel employmentModel = new EmploymentModel();

                if (employment != null)
                {
                    employmentModel.ID = employment.UserCompanyId.ToString();
                    employmentModel.CompanyName = employment.CompanyName;
                    employmentModel.InstituteID = employment.EminstituteId.Value;
                    employmentModel.CompanyAddress = employment.CompanyAddress;
                    employmentModel.Supervisor = employment.Supervisor;
                    employmentModel.CompanyPhone = employment.CompanyPhone;
                    employmentModel.JobTitle = employment.JobTitle;
                    employmentModel.PositionID = employment.EmpositionId;
                    employmentModel.Responisiblities = employment.Responisiblities;
                    employmentModel.StartingSalary = employment.StartingSalary;
                    employmentModel.EndingSalary = employment.EndingSalary;
                    employmentModel.FromDate = employment.FromDate.HasValue ? employment.FromDate.Value.ToString("MM-dd-yyyy") : "";
                    employmentModel.ToDate = employment.ToDate.HasValue ? employment.ToDate.Value.ToString("MM-dd-yyyy") : "";
                    employmentModel.LeaveReason = employment.LeaveReason;
                    employmentModel.CanContactThisEmployer = employment.CanContactThisEmployer;
                }

                return Ok(employmentModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert-employment")]
        public IActionResult SaveEmployment(EmploymentModel employment)
        {
            try
            {
                UserCompany userCompany = new UserCompany();
                userCompany.CompanyName = employment.CompanyName;
                userCompany.EminstituteId = employment.InstituteID;
                userCompany.Supervisor = employment.Supervisor;
                userCompany.CompanyPhone = employment.CompanyPhone;
                userCompany.JobTitle = employment.JobTitle;
                userCompany.EmpositionId = employment.PositionID;
                userCompany.StartingSalary = employment.StartingSalary;
                userCompany.EndingSalary = employment.EndingSalary;

                if (String.IsNullOrEmpty(employment.FromDate))
                {
                    userCompany.FromDate = null;
                }
                else
                {
                    userCompany.FromDate = DateTime.Parse(employment.FromDate);
                }

                if (String.IsNullOrEmpty(employment.ToDate))
                {
                    userCompany.ToDate = null;
                }
                else
                {
                    userCompany.ToDate = DateTime.Parse(employment.ToDate);
                }
                userCompany.LeaveReason = employment.LeaveReason;
                userCompany.CanContactThisEmployer = employment.CanContactThisEmployer;
                userCompany.Responisiblities = employment.Responisiblities;
                userCompany.UserId = employment.ApplicantID;
                EmploymentManager.InsertEmployment(userCompany);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("update-employment")]
        public IActionResult UpdateEmployment(EmploymentModel employment)
        {
            try
            {
                UserCompany userCompany = new UserCompany();
                userCompany.UserCompanyId = Convert.ToInt64(employment.ID);
                userCompany.CompanyName = employment.CompanyName;
                userCompany.EminstituteId = employment.InstituteID;
                userCompany.CompanyAddress = employment.CompanyAddress;
                userCompany.Supervisor = employment.Supervisor;
                userCompany.CompanyPhone = employment.CompanyPhone;
                userCompany.JobTitle = employment.JobTitle;
                userCompany.EmpositionId = employment.PositionID;
                userCompany.StartingSalary = employment.StartingSalary;
                userCompany.EndingSalary = employment.EndingSalary;
                if (String.IsNullOrEmpty(employment.FromDate))
                {
                    userCompany.FromDate = null;
                }
                else
                {
                    userCompany.FromDate = DateTime.Parse(employment.FromDate);
                }

                if (String.IsNullOrEmpty(employment.ToDate))
                {
                    userCompany.ToDate = null;
                }
                else
                {
                    userCompany.ToDate = DateTime.Parse(employment.ToDate);
                }
                userCompany.LeaveReason = employment.LeaveReason;
                userCompany.CanContactThisEmployer = employment.CanContactThisEmployer;
                userCompany.Responisiblities = employment.Responisiblities;
                userCompany.UserId = employment.ApplicantID;
                EmploymentManager.UpdateEmployment(userCompany);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("delete-employment-by-id/{id}")]
        public IActionResult DeleteEmployment(long id)
        {
            try
            {                
                EmploymentManager.DeleteEmploment(id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("institute")]
        [HttpGet]
        public IActionResult GetInstituteByText(string text)
        {
            try
            {
                IEnumerable<Institution> institutions = InstitutionManager.GetInstitutions(text);
                return Ok(institutions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("position")]
        [HttpGet]
        public IActionResult GetPositionByText(string text)
        {
            try
            {
                IEnumerable<Position> positions = PositionManager.GetPositions(text);
                return Ok(positions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
