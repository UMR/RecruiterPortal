using ApplicantPortalAPI.ResourceServer.Controllers;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using Serilog;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/employment")]
    [ApiController]
    public class EmploymentController : CustomControllerBase
    {
        public EmploymentController(ILogger<EducationController> logger) : base(logger)
        {
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
                userCompany.JobTItle = employment.JobTitle;
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
                EmploymentManager.InsertEmploy(userCompany);
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
