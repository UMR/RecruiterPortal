using Microsoft.AspNetCore.Mvc;
using System.Data;
using iTextSharp.text.pdf;
using RecruiterPortal.API.Controllers;
using RecruiterPortalDAL.Models;
using RecruiterPortal.DAL.SqlModels;
using static RecruiterPortal.DAL.Utility.Utility;
using RecruiterPortalDAL.Managers;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/emergency-info")]
    [ApiController]
    public class EmergencyInfoController : CustomControllerBase
    {
        public EmergencyInfoController(ILogger<EmergencyInfoController> logger) : base(logger)
        {
        }

        [Route("primary")]
        [HttpPost]
        public IActionResult SavePrimaryInfo(EmergencyInfo emergencyInfo)
        {
            try
            {
                UserEmergencyInfo infoModel = new UserEmergencyInfo();
                infoModel.EmrFirstName = emergencyInfo.EmrFirstName;
                infoModel.EmrLastName = emergencyInfo.EmrLastName;
                infoModel.NatureOfRelationship = emergencyInfo.NatureOfRelationship;
                infoModel.EmrHomePhone = emergencyInfo.EmrHomePhone;
                infoModel.EmrCellPhone = emergencyInfo.EmrCellPhone;
                infoModel.EmrWorkPhone = emergencyInfo.EmrWorkPhone;
                infoModel.UserId = emergencyInfo.UserId;
                infoModel.EmrType = Convert.ToByte(EnumEmergencyInfo.Primary);
                if (GetEmrInfoByIdAndType(infoModel.UserId, infoModel.EmrType))
                {
                    EmergencyInfoManager.UpdateEmrInfo(infoModel);
                }
                else
                {
                    EmergencyInfoManager.InsertEmrInfo(infoModel);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("secondary")]
        [HttpPost]
        public IActionResult SaveSecondaryInfo(EmergencyInfo emergencyInfo)
        {
            try
            {
                UserEmergencyInfo infoModel = new UserEmergencyInfo();
                infoModel.EmrFirstName = emergencyInfo.EmrFirstName;
                infoModel.EmrLastName = emergencyInfo.EmrLastName;
                infoModel.NatureOfRelationship = emergencyInfo.NatureOfRelationship;
                infoModel.EmrHomePhone = emergencyInfo.EmrHomePhone;
                infoModel.EmrCellPhone = emergencyInfo.EmrCellPhone;
                infoModel.EmrWorkPhone = emergencyInfo.EmrWorkPhone;
                infoModel.UserId = emergencyInfo.UserId;
                infoModel.EmrType = Convert.ToByte(EnumEmergencyInfo.Secondary);
                if (GetEmrInfoByIdAndType(infoModel.UserId, infoModel.EmrType))
                {
                    EmergencyInfoManager.UpdateEmrInfo(infoModel);
                }
                else
                {
                    EmergencyInfoManager.InsertEmrInfo(infoModel);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-emergency-info/{applicantId}")]
        [HttpGet]
        public IActionResult GetEmergencyInfo(int applicantId)
        {
            try
            {
                IEnumerable<UserEmergencyInfo> emrInfos = EmergencyInfoManager.GetEmrInfo(applicantId);
                List<UserEmergencyInfo> userEmergencyInfos = new List<UserEmergencyInfo>();

                if (emrInfos != null && emrInfos.Count() > 0)
                {
                    foreach (var emrInfo in emrInfos)
                    {
                        UserEmergencyInfo emergencyInfo = new UserEmergencyInfo();
                        emergencyInfo.EmrFirstName = emrInfo.EmrFirstName;
                        emergencyInfo.EmrLastName = emrInfo.EmrLastName;
                        emergencyInfo.NatureOfRelationship = emrInfo.NatureOfRelationship;
                        emergencyInfo.EmrHomePhone = emrInfo.EmrHomePhone;
                        emergencyInfo.EmrCellPhone = emrInfo.EmrCellPhone;
                        emergencyInfo.EmrWorkPhone = emrInfo.EmrWorkPhone;
                        emergencyInfo.EmrType = emrInfo.EmrType;
                        userEmergencyInfos.Add(emergencyInfo);
                    }
                }
                return Ok(userEmergencyInfos);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        private bool GetEmrInfoByIdAndType(long userId, byte emrType)
        {
            return EmergencyInfoManager.AlreadyEmrInfoExist(userId, emrType);
        }

        [HttpGet]
        [Route("get-emergency-info-file/{applicantId}")]
        public IActionResult GetEmergencyInfoFileByApplicantId(int applicantId)
        {
            string fileName = string.Empty;
            try
            {
                var file = GenerateEmergencyInfoFile(applicantId, out fileName);
                return new FileContentResult(file, "application/octet-stream")
                {
                    FileDownloadName = fileName
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        private byte[] GenerateEmergencyInfoFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;


            int fileTypeCode = (int)EnumFileType.EmergencyContact;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());
            DataTable dtPrimaryEmergencyInfo = EmergencyInfoManager.GetEmrInfoDataTableByUserID(applicantId, (byte)EnumEmergencyInfo.Primary);
            DataTable dtSecondaryEmergencyInfo = EmergencyInfoManager.GetEmrInfoDataTableByUserID(applicantId, (byte)EnumEmergencyInfo.Secondary);
            //DataTable dtApplicant = ApplicantManager.GetApplicant(applicantID);
            DataTable dtApplicant = UserManager.GetUserDetailsByID(applicantId);

            if (dtPdfTemplate != null && dtPdfTemplate.Rows.Count > 0)
            {
                long pdfTermplateId = Convert.ToInt64(dtPdfTemplate.Rows[0]["TermplateID"].ToString());
                byte[] temlateFileData = dtPdfTemplate.Rows[0]["FileData"] as byte[];
                string templateFIleName = dtPdfTemplate.Rows[0]["FIleName"].ToString();
                templateFIleName = templateFIleName.Substring(0, templateFIleName.LastIndexOf('.'));
                fileName = $"{templateFIleName}_{GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId))}_{DateTime.Now.ToString("MMddyyyyHHmmss")}.pdf";

                Stream inputStream = new MemoryStream(temlateFileData);
                MemoryStream outputStream = new MemoryStream();
                PdfReader pdfReader = new PdfReader(inputStream);
                PdfStamper pdfStamper = new PdfStamper(pdfReader, outputStream);
                var image = iTextSharp.text.Image.GetInstance("watermark.png");
                image.SetAbsolutePosition(250, 40);
                for (var i = 0; i < pdfReader.NumberOfPages; i++)
                {
                    var content = pdfStamper.GetUnderContent(i + 1);
                    content.AddImage(image);
                }
                pdfStamper.FormFlattening = true;
                AcroFields pdfFormFields = pdfStamper.AcroFields;

                if (dtApplicant != null && dtApplicant.Rows.Count > 0)
                {
                    FillEmergencyInfoApplicantPdfFormFields(applicantId, pdfFormFields, dtApplicant.Rows[0]);
                }
                if (dtPrimaryEmergencyInfo != null && dtPrimaryEmergencyInfo.Rows.Count > 0)
                {
                    FillPrimaryEmergencyInfoPdfFormFields(pdfFormFields, dtPrimaryEmergencyInfo.Rows[0]);
                }
                if (dtSecondaryEmergencyInfo != null && dtSecondaryEmergencyInfo.Rows.Count > 0)
                {
                    FillSecondaryEmergencyInfoPdfFormFields(pdfFormFields, dtSecondaryEmergencyInfo.Rows[0]);
                    pdfStamper.Close();
                    data = outputStream.ToArray();

                    DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFileByUserIdAndFileType(applicantId, fileTypeCode.ToString());
                    if (dtGeneratedFile != null && dtGeneratedFile.Rows.Count > 0)
                    {

                        long generatedFileId = Convert.ToInt64(dtGeneratedFile.Rows[0]["GeneratedFileID"].ToString());
                        result = UpdateGeneratedFile(pdfTermplateId, data, templateFIleName, generatedFileId, applicantId, fileTypeCode);
                    }
                    else
                    {
                        result = AddGeneratedFile(pdfTermplateId, data, templateFIleName, applicantId, fileTypeCode);
                    }

                    return data;
                }
                else
                {
                    return temlateFileData;
                }
            }
            else
            {
                fileName = "";
                return null;
            }

        }

        [NonAction]
        private void FillPrimaryEmergencyInfoPdfFormFields(AcroFields pdfFormFields, DataRow dataRow)
        {
            pdfFormFields.SetField("PrimaryEmergencyContactName", dataRow["EmrLastName"].ToString().Trim() + " " + dataRow["EmrFirstName"].ToString().Trim());
            pdfFormFields.SetField("PrimaryRelationship", dataRow["NatureOfRelationship"].ToString().Trim());
            pdfFormFields.SetField("PrimaryPhoneCell", dataRow["EmrCellPhone"].ToString().Trim());
            pdfFormFields.SetField("PrimaryPhoneHome", dataRow["EmrHomePhone"].ToString().Trim());
            pdfFormFields.SetField("PrimaryPhoneWork", dataRow["EmrWorkPhone"].ToString().Trim());
        }
        [NonAction]
        private void FillSecondaryEmergencyInfoPdfFormFields(AcroFields pdfFormFields, DataRow dataRow)
        {
            pdfFormFields.SetField("SecondaryEmergencyContactName", dataRow["EmrLastName"].ToString().Trim() + " " + dataRow["EmrFirstName"].ToString().Trim());
            pdfFormFields.SetField("SecondaryRelationship", dataRow["NatureOfRelationship"].ToString().Trim());
            pdfFormFields.SetField("SecondaryPhoneCell", dataRow["EmrCellPhone"].ToString().Trim());
            pdfFormFields.SetField("SecondaryPhoneHome", dataRow["EmrHomePhone"].ToString().Trim());
            pdfFormFields.SetField("SecondaryPhoneWork", dataRow["EmrWorkPhone"].ToString().Trim());
        }
        [NonAction]
        private void FillEmergencyInfoApplicantPdfFormFields(int applicantId, AcroFields pdfFormFields, DataRow dataRow)
        {
            try
            {
                pdfFormFields.SetField("Name", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
                string address = dataRow["StreetAddress"].ToString().Trim() + ", " + dataRow["City"].ToString() + ", " + dataRow["State"].ToString() + "," + dataRow["ZipCode"].ToString();
                pdfFormFields.SetField("Address", address);
                string applicantTelephoneHome = dataRow["Phone"].ToString();
                pdfFormFields.SetField("HomePhone", applicantTelephoneHome);
                string applicantPhoneCell = dataRow["Phone"].ToString();
                pdfFormFields.SetField("CellPhone", applicantPhoneCell);
                pdfFormFields.SetField("HomeEmailAddress", dataRow["Email"].ToString());
                pdfFormFields.SetField("Signature", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
                pdfFormFields.SetField("Date", DateTime.Now.ToString("MM/dd/yyyy"));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}