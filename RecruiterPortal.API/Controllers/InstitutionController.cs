﻿using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/institution")]
    [ApiController]
    public class InstitutionControllerController : CustomControllerBase
    {
        public InstitutionControllerController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-all-by-filter")]
        [HttpPost]
        public IActionResult GetAllInstitution(InstitutionSearchModel institutionSearchModel)
        {
            try
            {
                DataSet data = InstitutionManager.GetAllInstitutionByFilter(institutionSearchModel);
                List<InstitutionListModel> instituteList = new List<InstitutionListModel>();
                int instituteCount = 0;

                if (data != null)
                {
                    DataTable dataTable = data.Tables[1];
                    DataTable rowCountTable = data.Tables[0];
                    if (rowCountTable != null && rowCountTable.Rows.Count > 0)
                    {
                        instituteCount = Convert.ToInt32(rowCountTable.Rows[0]["RowNumber"]);
                    }

                    foreach (DataRow oRow in dataTable.Rows)
                    {
                        InstitutionListModel instituteModel = new InstitutionListModel();
                        instituteModel.Id = Convert.ToInt32(oRow["Id"].ToString());
                        instituteModel.InstituteName = oRow["InstituteName"].ToString();
                        instituteModel.IsActive = Convert.ToBoolean(oRow["IsActive"].ToString());
                        instituteModel.Address = oRow["Address"].ToString();
                        instituteModel.Telephone = oRow["Telephone"].ToString();
                        instituteModel.ZipCode = oRow["ZipCode"].ToString();
                        instituteModel.Town = oRow["Town"].ToString();
                        instituteModel.StateName = oRow["StateName"].ToString();
                        instituteModel.County = oRow["County"].ToString();
                        instituteModel.Website = oRow["Website"].ToString();
                        instituteList.Add(instituteModel);
                    }
                }
                return Ok(new { institutes = instituteList, totalInstitute = instituteCount });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> SaveInstitution(InstitutionRequestModel requestModel)
        {
            try
            {
                return Ok(await InstitutionManager.Insert(requestModel, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
