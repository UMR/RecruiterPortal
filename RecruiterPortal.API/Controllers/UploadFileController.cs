using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/upload-file")]
    [ApiController]
    public class UploadFileController : CustomControllerBase
    {
        public UploadFileController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("upload")]
        [HttpPost]
        public IActionResult UploadFile(UploadFileModel uploadFileModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                UserFile userFile = new UserFile();
                userFile.FileData = Convert.FromBase64String(uploadFileModel.FIleData);
                userFile.FileName = uploadFileModel.FileName;
                userFile.CreatedDate = DateTime.Now;
                userFile.UserId = uploadFileModel.UserID;
                Enum.TryParse(uploadFileModel.FileType.ToString(), out EnumFileType enumFileType);
                userFile.FileType = (byte)enumFileType;
                int userFileID = UploadFileManager.SaveUserFile(userFile);
                //if (uploadFileModel.FileType == EnumFileType.W9)
                //{
                //    UserManager.SendMailToRecruiter(base.GetCurrentUser().UserID);
                //}
                //else if (uploadFileModel.FileType == EnumFileType.VoidedCheque || uploadFileModel.FileType == EnumFileType.Payroll)
                //{
                //    UserManager.SendMailToFinance(enumFileType, base.GetCurrentUser().UserID);
                //}

                return Ok(userFile);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("list/{userId}")]
        [HttpGet]
        public IActionResult GetUploadFileByApplicantId(long userId)
        {
            try
            {
                IEnumerable<UserFile> userFiles = UploadFileManager.GetUserFileByID(userId);
                List<UserFileModel> userFileList = new List<UserFileModel>();

                if (userFiles != null && userFiles.Count() > 0)
                {
                    foreach (var userFile in userFiles)
                    {
                        UserFileModel userFileModel = new UserFileModel();
                        userFileModel.UserFileID = userFile.UserFileId;
                        userFileModel.UserID = userFile.UserId;
                        userFileModel.FileName = userFile.FileName;
                        userFileModel.CreatedDate = userFile.CreatedDate;
                        userFileModel.FileType = userFile.FileType;
                        userFileList.Add(userFileModel);
                    }
                }

                return Ok(userFileList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("list/{userId}/{fileType}")]
        [HttpGet]
        public IActionResult GetUploadFile(long userId, byte fileType)
        {
            try
            {
                IEnumerable<UserFile> userFiles = UploadFileManager.GetUserFileByFileType(userId, fileType);
                List<UserFileModel> userFileList = new List<UserFileModel>();

                if (userFiles != null && userFiles.Count() > 0)
                {
                    foreach (var userFile in userFiles)
                    {
                        UserFileModel userFileModel = new UserFileModel();
                        userFileModel.UserFileID = userFile.UserFileId;
                        userFileModel.UserID = userFile.UserId;
                        userFileModel.FileName = userFile.FileName;
                        userFileModel.CreatedDate = userFile.CreatedDate;
                        userFileModel.FileType = userFile.FileType;
                        userFileList.Add(userFileModel);
                    }
                }

                return Ok(userFileList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }        

        [Route("delete/{fileId}")]
        [HttpDelete]
        public IActionResult DeleteFileByFileId(long fileId)
        {
            try
            {
                var result = UploadFileManager.DeleteUserFile(fileId);
                if (result == 1)
                {
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
    }
}
