using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-license")]
    [ApiController]
    public class UserLicenseController : CustomControllerBase
    {
        public UserLicenseController(ILogger<UserLicenseController> logger) : base(logger)
        {
        }

        [Route("get-all/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserLicenseByUserID(int applicantId)
        {
            try
            {
                IEnumerable<UserLicense> userLicenses = UserLicenseManager.GetUserLicenseByUserId(applicantId);
                List<UserLicenseModel> userLicenseList = new List<UserLicenseModel>();

                if (userLicenses != null && userLicenses.Count() > 0)
                {
                    foreach (var userLicense in userLicenses)
                    {
                        UserLicenseModel userLicenseModel = new UserLicenseModel();
                        userLicenseModel.LicenseID = userLicense.LicenseId;
                        userLicenseModel.LicenseNameA = userLicense.LicenseNameA;
                        userLicenseModel.LicenseNameB = userLicense.LicenseNameB;
                        userLicenseModel.LicenseNameC = userLicense.LicenseNameC;
                        userLicenseModel.LicenseNo = userLicense.LicenseNo;
                        if (userLicense.ExpiryDate != null)
                        {
                            userLicenseModel.ExpiryDate = userLicense.ExpiryDate.ToString();
                        }
                        else
                        {
                            userLicenseModel.ExpiryDate = string.Empty;
                        }
                        userLicenseModel.CreatedDate = userLicense.CreatedDate;
                        userLicenseModel.UserID = userLicense.UserId;
                        userLicenseModel.FIleData = userLicense.FileData;
                        userLicenseModel.FileName = userLicense.FileName;
                        if (userLicense.IssuedDate != null)
                        {
                            userLicenseModel.IssuedDate = userLicense.IssuedDate.ToString();
                        }
                        else
                        {
                            userLicenseModel.IssuedDate = string.Empty;
                        }
                        if (userLicense.FileType != null)
                        {
                            userLicenseModel.FileType = userLicense.FileType.Value;
                        }
                        else
                        {
                            userLicenseModel.FileType = null;
                        }

                        userLicenseList.Add(userLicenseModel);
                    }
                }

                return Ok(userLicenseList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-all/{fileType}")]
        [HttpGet]
        public IActionResult GetUserLicenseByFileType(byte fileType)
        {
            try
            {
                //Enum.TryParse(fileType.ToString(), out EnumFileType enumFileType);
                IEnumerable<UserLicense> userLicenses = UserLicenseManager.GetUserLicenseByFileType(base.GetCurrentUser().UserId, fileType);
                List<UserLicenseModel> userLicenseList = new List<UserLicenseModel>();

                if (userLicenses != null && userLicenses.Count() > 0)
                {
                    foreach (var userLicense in userLicenses)
                    {
                        UserLicenseModel userLicenseModel = new UserLicenseModel();
                        userLicenseModel.LicenseID = userLicense.LicenseId;
                        userLicenseModel.LicenseNameA = userLicense.LicenseNameA;
                        userLicenseModel.LicenseNameB = userLicense.LicenseNameB;
                        userLicenseModel.LicenseNameC = userLicense.LicenseNameC;
                        userLicenseModel.LicenseNo = userLicense.LicenseNo;
                        if (userLicense.ExpiryDate != null)
                        {
                            userLicenseModel.ExpiryDate = userLicense.ExpiryDate.ToString();
                        }
                        else
                        {
                            userLicenseModel.ExpiryDate = string.Empty;
                        }
                        userLicenseModel.CreatedDate = userLicense.CreatedDate;
                        userLicenseModel.UserID = userLicense.UserId;
                        userLicenseModel.FIleData = userLicense.FileData;
                        userLicenseModel.FileName = userLicense.FileName;
                        if (userLicense.IssuedDate != null)
                        {
                            userLicenseModel.IssuedDate = userLicense.IssuedDate.ToString();
                        }
                        else
                        {
                            userLicenseModel.IssuedDate = string.Empty;
                        }
                        if (userLicense.FileType != null)
                        {
                            userLicenseModel.FileType = userLicense.FileType.Value;
                        }
                        else
                        {
                            userLicenseModel.FileType = null;
                        }
                        if (userLicense.IssueAuthority != null)
                        {
                            userLicenseModel.IssueAuthority = userLicense.IssueAuthority.ToString();
                        }
                        else
                        {
                            userLicenseModel.IssueAuthority = string.Empty;
                        }

                        userLicenseList.Add(userLicenseModel);
                    }
                }

                return Ok(userLicenseList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get/{userLicenseId}")]
        [HttpGet]
        public IActionResult GetUserReferenceByUserId(long userLicenseId)
        {
            try
            {
                UserLicense userLicense = UserLicenseManager.GetUserLicenseById(userLicenseId);
                UserLicenseModel userLicenseModel = new UserLicenseModel();

                if (userLicense != null)
                {
                    userLicenseModel.LicenseID = userLicense.LicenseId;
                    userLicenseModel.LicenseNameA = userLicense.LicenseNameA;
                    userLicenseModel.LicenseNameB = userLicense.LicenseNameB;
                    userLicenseModel.LicenseNameC = userLicense.LicenseNameC;
                    userLicenseModel.LicenseNo = userLicense.LicenseNo;

                    if (userLicense.ExpiryDate != null)
                    {
                        userLicenseModel.ExpiryDate = userLicense.ExpiryDate.ToString();
                    }
                    else
                    {
                        userLicenseModel.ExpiryDate = string.Empty;
                    }
                    userLicenseModel.CreatedDate = userLicense.CreatedDate;
                    userLicenseModel.UserID = userLicense.UserId;
                    userLicenseModel.FIleData = userLicense.FileData;
                    userLicenseModel.FileName = userLicense.FileName;
                    if (userLicense.IssuedDate != null)
                    {
                        userLicenseModel.IssuedDate = userLicense.IssuedDate.ToString();
                    }
                    else
                    {
                        userLicenseModel.IssuedDate = string.Empty;
                    }
                    if (userLicense.FileType != null)
                    {
                        userLicenseModel.FileType = userLicense.FileType.Value;
                    }
                    else
                    {
                        userLicenseModel.FileType = null;
                    }
                    if (userLicense.IssueAuthority != null)
                    {
                        userLicenseModel.IssueAuthority = userLicense.IssueAuthority.ToString();
                    }
                    else
                    {
                        userLicenseModel.IssueAuthority = string.Empty;
                    }
                }

                return Ok(userLicenseModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(UserLicenseCreateUpdateModel userLicenseModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    UserLicense userLicense = new UserLicense();
                    userLicense.LicenseNameA = userLicenseModel.LicenseNameA;
                    userLicense.LicenseNameB = userLicenseModel.LicenseNameB;
                    userLicense.LicenseNameC = userLicenseModel.LicenseNameC;
                    userLicense.LicenseNo = userLicenseModel.LicenseNo;

                    if (!string.IsNullOrEmpty(userLicenseModel.ExpiryDate))
                    {
                        userLicense.ExpiryDate = Convert.ToDateTime(userLicenseModel.ExpiryDate);
                    }
                    else
                    {
                        userLicense.ExpiryDate = null;
                    }
                    userLicense.UserId = userLicenseModel.UserID;
                    if (userLicenseModel.FileType != null)
                    {
                        Enum.TryParse(userLicenseModel.FileType.ToString(), out EnumFileType enumFileType);
                        userLicense.FileType = (byte)enumFileType;
                    }
                    else
                    {
                        userLicense.FileType = null;
                    }
                    userLicense.FileName = userLicenseModel.FileName;
                    if (!string.IsNullOrEmpty(userLicenseModel.FileData))
                    {
                        userLicense.FileData = Convert.FromBase64String(userLicenseModel.FileData);
                    }
                    if (!string.IsNullOrEmpty(userLicenseModel.IssuedDate))
                    {
                        userLicense.IssuedDate = Convert.ToDateTime(userLicenseModel.IssuedDate);
                    }
                    else
                    {
                        userLicense.IssuedDate = null;
                    }
                    if (!string.IsNullOrEmpty(userLicenseModel.IssueAuthority))
                    {
                        userLicense.IssueAuthority = userLicenseModel.IssueAuthority;
                    }
                    else
                    {
                        userLicense.IssueAuthority = null;
                    }

                    UserLicenseManager.Save(userLicense);

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }

        [Route("update")]
        [HttpPut]
        public IActionResult Update(UserLicenseCreateUpdateModel userLicenseModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    UserLicense userLicense = new UserLicense();
                    userLicense.LicenseId = userLicenseModel.LicenseID;
                    userLicense.LicenseNameA = userLicenseModel.LicenseNameA;
                    userLicense.LicenseNameB = userLicenseModel.LicenseNameB;
                    userLicense.LicenseNameC = userLicenseModel.LicenseNameC;
                    userLicense.LicenseNo = userLicenseModel.LicenseNo;
                    if (!string.IsNullOrEmpty(userLicenseModel.ExpiryDate))
                    {
                        userLicense.ExpiryDate = Convert.ToDateTime(userLicenseModel.ExpiryDate);
                    }
                    else
                    {
                        userLicense.ExpiryDate = null;
                    }
                    userLicense.UserId = userLicenseModel.UserID;
                    if (userLicenseModel.FileType != null)
                    {
                        Enum.TryParse(userLicenseModel.FileType.ToString(), out EnumFileType enumFileType);
                        userLicense.FileType = (byte)enumFileType;
                    }
                    else
                    {
                        userLicense.FileType = null;
                    }
                    userLicense.FileName = userLicenseModel.FileName;
                    if (!string.IsNullOrEmpty(userLicenseModel.FileData))
                    {
                        userLicense.FileData = Convert.FromBase64String(userLicenseModel.FileData);
                    }
                    if (!string.IsNullOrEmpty(userLicenseModel.IssuedDate))
                    {
                        userLicense.IssuedDate = Convert.ToDateTime(userLicenseModel.IssuedDate);
                    }
                    else
                    {
                        userLicense.IssuedDate = null;
                    }
                    if (!string.IsNullOrEmpty(userLicenseModel.IssueAuthority))
                    {
                        userLicense.IssueAuthority = userLicenseModel.IssueAuthority;
                    }
                    else
                    {
                        userLicense.IssueAuthority = null;
                    }

                    UserLicenseManager.Update(userLicense);

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }

        [Route("delete/{userLicenseId}")]
        [HttpDelete]
        public IActionResult DeleteUserLicenseById(long userLicenseId)
        {

            try
            {
                UserLicenseManager.Delete(userLicenseId);
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