using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using System.Data;

namespace ApplicantPortalAPI.ResourceServer.Controllers

{
    [Route("api/agency")]
    [ApiController]
    public class AgencyController : CustomControllerBase
    {
        public AgencyController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetAgency()
        {
            try
            {
                List<AgencyModel> agencyModelList = new List<AgencyModel>();
                DataTable agencyDt = AgencyManager.GetAgencies();
                int agencyCount = 0;
                if (agencyDt != null && agencyDt.Rows.Count > 0)
                {
                    agencyCount = agencyDt.Rows.Count;
                    foreach (DataRow oRow in agencyDt.Rows)
                    {
                        AgencyModel agency = new AgencyModel();

                        agency.AgencyAddress = oRow["AgencyAddress"].ToString();
                        agency.AgencyContactPerson = oRow["AgencyContactPerson"].ToString();
                        agency.AgencyContactPersonPhone = oRow["AgencyContactPersonPhone"].ToString();
                        agency.AgencyEmail = oRow["AgencyEmail"].ToString();
                        agency.AgencyName = oRow["AgencyName"].ToString();
                        agency.AgencyPhone = oRow["AgencyPhone"].ToString();
                        agency.UrlPrefix = oRow["URLPrefix"].ToString();
                        agency.IsActive = Convert.ToBoolean(oRow["IsActive"].ToString());
                        agency.AgencyId = Convert.ToInt64(oRow["AgencyId"].ToString());
                        agencyModelList.Add(agency);
                    }
                }
                return Ok(new { agencies = agencyModelList, agencyCount = agencyCount });
                //return Ok(agencyModelList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
        [Route("get-active-agency")]
        [HttpGet]
        public IActionResult GetActiveAgency()
        {
            try
            {
                List<AgencyModel> agencyModelList = new List<AgencyModel>();
                List<Agency> agencyList = AgencyManager.GetAllActiveAgency();
                if (agencyList != null && agencyList.Count > 0)
                {
                    foreach (var oRow in agencyList.ToList())
                    {
                        AgencyModel agency = new AgencyModel();

                        //agency.AgencyAddress = oRow.AgencyAddress.ToString();
                        //agency.AgencyContactPerson = !string.IsNullOrEmpty(oRow.AgencyContactPerson) ? oRow.AgencyContactPerson.ToString() : "" ;
                        //agency.AgencyContactPersonPhone = !string.IsNullOrEmpty(oRow.AgencyContactPerson) ? oRow.AgencyContactPersonPhone.ToString() : "";
                        //agency.AgencyEmail = !string.IsNullOrEmpty(oRow.AgencyEmail) ? oRow.AgencyEmail.ToString() : "";
                        agency.AgencyName = !string.IsNullOrEmpty(oRow.AgencyName) ? oRow.AgencyName.ToString() : "";
                        //agency.AgencyPhone = !string.IsNullOrEmpty(oRow.AgencyPhone) ? oRow.AgencyPhone.ToString() : "";
                        //agency.UrlPrefix = !string.IsNullOrEmpty(oRow.Urlprefix) ? oRow.Urlprefix.ToString() : "";
                        agency.AgencyId = Convert.ToInt64(oRow.AgencyId.ToString());
                        agencyModelList.Add(agency);
                    }
                }
                //return Ok(new { agencies = agencyModelList, agencyCount = agencyCount });
                return Ok(agencyModelList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public IActionResult AddAgency(AgencyModel agencyModel)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    BadRequest(ModelState);
                }


                Agency agency = new Agency();
                agency.AgencyName = agencyModel.AgencyName;
                agency.Urlprefix = agencyModel.UrlPrefix;
                agency.AgencyEmail = agencyModel.AgencyEmail;
                agency.AgencyPhone = agencyModel.AgencyPhone;
                agency.AgencyAddress = agencyModel.AgencyAddress;
                agency.AgencyContactPerson = agencyModel.AgencyContactPerson;
                agency.AgencyContactPersonPhone = agencyModel.AgencyContactPersonPhone;
                agency.IsActive = agencyModel.IsActive;
                agency.CreatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                agency.CreatedDate = DateTime.Now;
                AgencyManager.SaveAgency(agency);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("url_prefix_exist")]
        [HttpGet]
        public async Task<IActionResult> IsUrlPrefixExist(string urlPrefix)
        {
            try
            {
                if (string.IsNullOrEmpty(urlPrefix))
                {
                    return BadRequest();
                }
                int agencyCount = 0;

                agencyCount = await AgencyManager.GetUrlPrefix(urlPrefix);

                if (agencyCount == 0)
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

        [Route("update")]
        [HttpPost]
        public IActionResult UpdateAgency(AgencyModel agencyModel)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    BadRequest(ModelState);
                }

                Agency agency = new Agency();
                agency.AgencyId = agencyModel.AgencyId;
                agency.AgencyName = agencyModel.AgencyName;
                //agency.Urlprefix = agencyModel.Urlprefix;
                agency.AgencyEmail = agencyModel.AgencyEmail;
                agency.AgencyPhone = agencyModel.AgencyPhone;
                agency.AgencyAddress = agencyModel.AgencyAddress;
                agency.AgencyContactPerson = agencyModel.AgencyContactPerson;
                agency.AgencyContactPersonPhone = agencyModel.AgencyContactPersonPhone;
                agency.IsActive = agencyModel.IsActive;
                agency.UpdatedBy = Convert.ToInt32(GetCurrentUser().RecruiterId);
                agency.UpdatedDate = DateTime.Now;
                AgencyManager.UpdateAgency(agency);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                int? result = await AgencyManager.Delete(id);
                if (result == null)
                {
                    return NotFound();
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
