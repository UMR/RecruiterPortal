using System.Collections;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/education")]
    [ApiController]
    public class EducationController : CustomControllerBase
    {
        [Route("info/{applicantId}")]
        [HttpGet]
        public IActionResult GetEducationInfo(int applicantId)
        {
            try
            {
                List<EducationModel> educationModelList = new List<EducationModel>();
                IEnumerable<UserEducation> userEducationList = EducationManager.GetEducationByUserID(applicantId);

                foreach (var item in userEducationList)
                {
                    EducationModel educationModel = new EducationModel();
                    educationModel.SchoolName = item.SchoolName;
                    educationModel.SchoolAddress = item.SchoolAddress;
                    educationModel.Degree = item.Degree;
                    educationModel.FromDate = item.FromDate.HasValue ? item.FromDate.Value.ToString() : "";
                    educationModel.ToDate = item.ToDate.HasValue ? item.ToDate.Value.ToString() : "";
                    educationModel.InstitutionType = item.InstitutionType.Value;
                    //educationModel.InstitutionTypeName = item.InstitutionTypeName;
                    educationModel.EducationID = item.UserEducationId;
                    educationModel.IsGraduate = item.IsGraduate;
                    educationModelList.Add(educationModel);
                }

                return Ok(educationModelList);
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
        }

        [HttpPut]
        public IActionResult UpdateEducationInfo(EducationModel educationModel)
        {
            try
            {
                var currentUser = base.GetCurrentUser();

                //EducationManager.DeleteEducationByUserID(currentUser.UserID);
                UserEducation userEducation = new UserEducation();
                userEducation.SchoolName = educationModel.SchoolName;
                userEducation.SchoolAddress = educationModel.SchoolAddress;
                userEducation.Degree = educationModel.Degree;
                if (String.IsNullOrEmpty(educationModel.FromDate))
                {
                    userEducation.FromDate = null;
                }
                else
                {
                    userEducation.FromDate = int.Parse(educationModel.FromDate);
                }

                if (String.IsNullOrEmpty(educationModel.ToDate))
                {
                    userEducation.ToDate = null;
                }
                else
                {
                    userEducation.ToDate = int.Parse(educationModel.ToDate);
                }
                userEducation.InstitutionType = Convert.ToByte(educationModel.InstitutionType);
                userEducation.UserEducationId = educationModel.EducationID;
                userEducation.UserId = currentUser.UserId;
                userEducation.IsGraduate = educationModel.IsGraduate;
                EducationManager.UpdateEducation(userEducation);

                return Ok();
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
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetEducationByEduId(long id)
        {
            try
            {
                UserEducation userEducation = EducationManager.GetEducationByEduID(id);
                EducationModel educationModel = new EducationModel();
                educationModel.SchoolName = userEducation.SchoolName;
                educationModel.SchoolAddress = userEducation.SchoolAddress;
                educationModel.Degree = userEducation.Degree;
                educationModel.FromDate = userEducation.FromDate.HasValue ? userEducation.FromDate.Value.ToString() : "";
                educationModel.ToDate = userEducation.ToDate.HasValue ? userEducation.ToDate.Value.ToString() : "";
                educationModel.InstitutionType = userEducation.InstitutionType.Value;
                //educationModel.InstitutionTypeName = userEducation.InstitutionTypeName;
                educationModel.EducationID = userEducation.UserEducationId;
                educationModel.IsGraduate = userEducation.IsGraduate;
                return Ok(educationModel);
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
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteEducationByEduID(long id)
        {
            try
            {
                EducationManager.DeleteEducationByEduID(id);
                return Ok();
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
        }

        [Route("{applicantId}")]
        [HttpPost]
        public IActionResult SaveEmploymentInfo(int applicantId, EducationModel educationModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    BadRequest(ModelState);
                }

                UserEducation userEducation = new UserEducation();
                userEducation.SchoolName = educationModel.SchoolName;
                userEducation.SchoolAddress = educationModel.SchoolAddress;
                userEducation.Degree = educationModel.Degree;
                if (string.IsNullOrEmpty(educationModel.FromDate))
                {
                    userEducation.FromDate = null;
                }
                else
                {
                    userEducation.FromDate = Convert.ToInt32(educationModel.FromDate);
                }
                if (string.IsNullOrEmpty(educationModel.ToDate))
                {
                    userEducation.ToDate = null;
                }
                else
                {
                    userEducation.ToDate = Convert.ToInt32(educationModel.ToDate);
                }

                userEducation.InstitutionType = Convert.ToByte(educationModel.InstitutionType);
                userEducation.UserEducationId = educationModel.EducationID;
                userEducation.UserId = applicantId;
                userEducation.IsGraduate = educationModel.IsGraduate;
                userEducation.UserId = applicantId;
                EducationManager.InsertEducation(userEducation);
                return Ok();
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
        }

        [Route("facility_type")]
        [HttpGet]
        public IActionResult GetFacilityTypes()
        {
            //try
            //{
            //    SortedList institutionTypes = EducationManager.GetAllInstitutionTypes();

            //    List<KeyValueModel> result = new List<KeyValueModel>();

            //    if (institutionTypes != null)
            //    {
            //        for (int i = 0; i < institutionTypes.Count; i++)
            //        {
            //            KeyValueModel childNode = new KeyValueModel();
            //            childNode.Value = institutionTypes.GetKey(i).ToString();
            //            childNode.Text = institutionTypes.GetByIndex(i).ToString();
            //            result.Add(childNode);
            //        }
            //        return Ok(result);
            //    }
            //    else
            //    {
            //        return Ok();
            //    }
            //}
            //catch (Exception ex)
            //{
            //    //Log.Write(ex);
            //    //if (ApplicantPortalAPI.AuthorizationServer.Constants.IsProductionBuild)
            //    //{
            //    //    return StatusCode(500);
            //    //}
            //    //else
            //    //{
            //    return StatusCode(500, ex.Message);
            //    //}
            //}
            return Ok();
        }
    }
}