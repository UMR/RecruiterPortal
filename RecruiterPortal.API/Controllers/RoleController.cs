using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/role")]
    [ApiController]
    public class RoleController : CustomControllerBase
    {
        public RoleController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetRole()
        {
            try
            {
                IEnumerable<Role> roles = RoleManager.GetRole();
                List<string> roleList = new List<string>();
                foreach (Role role in roles)
                {
                    roleList.Add(role.RoleName);
                }
                return Ok(roleList.ToArray());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
