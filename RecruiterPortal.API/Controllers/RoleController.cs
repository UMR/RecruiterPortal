﻿using Microsoft.AspNetCore.Mvc;
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
                List<RoleModel> roleList = new List<RoleModel>();
                foreach (Role role in roles)
                {
                    RoleModel roleModel = new RoleModel();
                    roleModel.RoleId = role.RoleId;
                    roleModel.RoleName = role.RoleName;
                    roleList.Add(roleModel);
                }
                return Ok(roleList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-user-roles")]
        [HttpGet]
        public IActionResult GetRoleByUser()
        {
            try
            {
                DataTable roles = RoleManager.GetUserRoles(GetCurrentUser().RecruiterId);
                List<Role> roleList = new List<Role>();
                if (roles != null && roles.Rows.Count > 0)
                {
                    foreach (DataRow role in roles.Rows)
                    {
                        Role roleModel = new Role();
                        roleModel.RoleName = role["RoleName"].ToString();
                        roleModel.RoleKey = role["RoleKey"].ToString(); ;
                        roleList.Add(roleModel);
                    }
                }
                return Ok(roleList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
