using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-reference")]
    [ApiController]
    public class ReferenceController : CustomControllerBase
    {
        [Route("applicant-reference/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserReferenceByUserId(int applicantId)
        {
            try
            {
                IEnumerable<UserReference> userReferences = ReferenceManager.GetUserReferenceByUserId(applicantId);
                List<UserReferenceModel> userReferenceList = new List<UserReferenceModel>();

                if (userReferences != null && userReferences.Count() > 0)
                {
                    foreach (var userReference in userReferences)
                    {
                        UserReferenceModel userReferenceModel = new UserReferenceModel();
                        userReferenceModel.UserReferenceID = userReference.UserReferenceId;
                        userReferenceModel.RefLastName = userReference.RefLastName;
                        userReferenceModel.RefFirstName = userReference.RefFirstName;
                        userReferenceModel.RefMiddleName = userReference.RefMiddleName;
                        userReferenceModel.ReferenceType = userReference.ReferenceType;
                        userReferenceModel.NatureOfRelationship = userReference.NatureOfRelationship;
                        userReferenceModel.CompanyName = userReference.CompanyName;
                        userReferenceModel.EMInstituteID = userReference.EminstituteId;
                        userReferenceModel.RefPhone = userReference.RefPhone;
                        userReferenceModel.RefEmail = userReference.RefEmail;
                        userReferenceModel.RefAddress = userReference.RefAddress;
                        userReferenceModel.UserID = userReference.UserId;
                        userReferenceList.Add(userReferenceModel);
                    }
                }

                return Ok(userReferenceList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }

        [Route("user-reference-by-id/{userReferenceId}")]
        [HttpGet]
        public IActionResult GetUserReferenceByUserId(long userReferenceId)
        {
            try
            {
                UserReference userReference = ReferenceManager.GetUserReferenceById(userReferenceId);

                if (userReference == null)
                {
                    return NotFound();
                }

                UserReferenceModel userReferenceModel = new UserReferenceModel();

                if (userReference != null)
                {
                    userReferenceModel.UserReferenceID = userReference.UserReferenceId;
                    userReferenceModel.RefLastName = userReference.RefLastName;
                    userReferenceModel.RefFirstName = userReference.RefFirstName;
                    userReferenceModel.RefMiddleName = userReference.RefMiddleName;
                    userReferenceModel.ReferenceType = userReference.ReferenceType;
                    userReferenceModel.NatureOfRelationship = userReference.NatureOfRelationship;
                    userReferenceModel.CompanyName = userReference.CompanyName;
                    userReferenceModel.EMInstituteID = userReference.EminstituteId;
                    userReferenceModel.RefPhone = userReference.RefPhone;
                    userReferenceModel.RefEmail = userReference.RefEmail;
                    userReferenceModel.RefAddress = userReference.RefAddress;
                    userReferenceModel.UserID = userReference.UserId;
                }

                return Ok(userReferenceModel);
            }
            catch (Exception ex)
            {
                //Log.Write(ex);
                //if (ApplicantPortalAPI.AuthorizationServer.Constants.IsProductionBuild)
                //{
                //    return StatusCode(500);
                //}
                //else
                //{
                return StatusCode(500, ex.Message);
                //}
            }

            return BadRequest();
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(UserReferenceModel userReferenceModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    UserReference userReference = new UserReference();
                    userReference.UserReferenceId = userReferenceModel.UserReferenceID;
                    userReference.RefLastName = userReferenceModel.RefLastName;
                    userReference.RefFirstName = userReferenceModel.RefFirstName;
                    userReference.RefMiddleName = userReferenceModel.RefMiddleName;
                    userReference.ReferenceType = userReferenceModel.ReferenceType;
                    userReference.NatureOfRelationship = userReferenceModel.NatureOfRelationship;
                    userReference.CompanyName = userReferenceModel.CompanyName;
                    userReference.EminstituteId = null;
                    userReference.RefPhone = userReferenceModel.RefPhone;
                    userReference.RefEmail = userReferenceModel.RefEmail;
                    userReference.RefAddress = userReferenceModel.RefAddress;
                    userReference.UserId = userReferenceModel.UserID;
                    userReference.CreatedDate = DateTime.Now;

                    if (userReferenceModel.UserReferenceID == 0)
                    {
                        ReferenceManager.Save(userReference);
                    }
                    else
                    {
                        ReferenceManager.Update(userReference);
                    }
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }

        [Route("delete/{userReferenceId}")]
        [HttpDelete]
        public IActionResult DeleteUserReferenceId(long userReferenceId)
        {

            try
            {
                ReferenceManager.Delete(userReferenceId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }
    }
}