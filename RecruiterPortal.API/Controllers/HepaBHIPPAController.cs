using Microsoft.AspNetCore.Mvc;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Data;
using RecruiterPortal.API.Controllers;
using RecruiterPortalDAL.Models;
using RecruiterPortalDAL.Managers;
using RecruiterPortal.DAL.SqlModels;
using static RecruiterPortal.DAL.Utility.Utility;
using System.Text.Json;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/hepab-hippa")]
    [ApiController]
    public class HepaBHIPPAController : CustomControllerBase
    {
        public HepaBHIPPAController(ILogger<HepaBHIPPAController> logger) : base(logger)
        {
        }

        [Route("get/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserHepaBHIPPAByUserId(int applicantId)
        {

            try
            {
                HepaBhippa userHepaBHIPPA = HepaBHIPPAManager.GetByUserID(applicantId);
                HepaBHIPPAModel userHepaBHIPPAModel = null;

                if (userHepaBHIPPA != null)
                {
                    userHepaBHIPPAModel = new HepaBHIPPAModel();
                    userHepaBHIPPAModel.HepaBHIPPAID = userHepaBHIPPA.HepaBhippaid;
                    base.MapObjects(userHepaBHIPPA, userHepaBHIPPAModel);
                }

                return Ok(userHepaBHIPPAModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(HepaBHIPPAModel userHepaBHIPPAModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    HepaBhippa userHepaBHIPPA = new HepaBhippa();
                    userHepaBHIPPA.HepaBhippaid = userHepaBHIPPAModel.HepaBHIPPAID;
                    userHepaBHIPPA.HasHepaConcent = userHepaBHIPPAModel.HasHepaConcent;
                    userHepaBHIPPA.HasHepaSheet = userHepaBHIPPAModel.HasHepaSheet;
                    userHepaBHIPPA.HasHepaTraining = userHepaBHIPPAModel.HasHepaTraining;
                    userHepaBHIPPA.IsExamined = userHepaBHIPPAModel.IsExamined;
                    userHepaBHIPPA.HasNoCostHepa = userHepaBHIPPAModel.HasNoCostHepa;
                    userHepaBHIPPA.HasFacilityInfo = userHepaBHIPPAModel.HasFacilityInfo;
                    userHepaBHIPPA.Comment = userHepaBHIPPAModel.Comment;
                    userHepaBHIPPA.SignatureDate = userHepaBHIPPAModel.SignatureDate;
                    userHepaBHIPPA.WitnessName = userHepaBHIPPAModel.WitnessName;
                    userHepaBHIPPA.WitnessSignatureDate = userHepaBHIPPAModel.WitnessSignatureDate;
                    userHepaBHIPPA.ComplianceOfficer = userHepaBHIPPAModel.ComplianceOfficer;
                    userHepaBHIPPA.UserId = userHepaBHIPPAModel.UserID;

                    HepaBhippa isExist = HepaBHIPPAManager.GetByUserID(userHepaBHIPPAModel.UserID);

                    if (isExist == null)
                    {
                        HepaBHIPPAManager.SaveHepaBHIPPA(userHepaBHIPPA);
                    }
                    else
                    {
                        userHepaBHIPPA.HepaBhippaid = userHepaBHIPPAModel.HepaBHIPPAID;
                        HepaBHIPPAManager.UpdateHepaBHIPPA(userHepaBHIPPA);
                    }

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

        [Route("delete/{id}")]
        [HttpDelete]
        public IActionResult DeleteHepaBHIPPAById(long id)
        {
            try
            {
                var result = HepaBHIPPAManager.DeleteHepaBHIPPA(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("hippa-hepa-file/{applicantId}")]
        public IActionResult GetHIPPAHepaFileForCustomer(int applicantId)
        {

            string fileName = string.Empty;
            var fileHIPPA = GenerateHIPPAFile(applicantId, out fileName);

            fileName = string.Empty;
            var fileHepa = GenerateHepaBFile(applicantId, out fileName);

            List<byte[]> pdfByteContent = new List<byte[]>();
            pdfByteContent.Add(fileHIPPA);
            pdfByteContent.Add(fileHepa);


            byte[] file = MergedPDF(pdfByteContent);
            fileName = $"HIPPAandHepatitisB_{GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId))}_{DateTime.Now.ToString("MMddyyyyHHmmss")}.pdf";

            try
            {
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

        [HttpGet]
        [Route("hippa-file/{applicantId}")]
        public IActionResult GetHIPPAFileForCustomer(int applicantId)
        {
            string fileName = string.Empty;
            try
            {
                var file = GenerateHIPPAFile(applicantId, out fileName);
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

        [HttpGet]
        [Route("Hepa-file/{applicantId}")]
        public IActionResult GetHepaFileForCustomer(int applicantId)
        {
            string fileName = string.Empty;
            try
            {
                var file = GenerateHepaBFile(applicantId, out fileName);
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
        private byte[] GenerateHIPPAFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            int fileTypeCode = (int)EnumFileType.HippaForm;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());
            DataTable dataHIPPA = HepaBHIPPAManager.GetHepaBHIPPADtByUserID(applicantId);

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

                if (dataHIPPA != null && dataHIPPA.Rows.Count > 0)
                {
                    FillPdfFormFieldsHIPPA(applicantId, pdfFormFields, dataHIPPA.Rows[0]);

                    pdfStamper.Close();
                    data = outputStream.ToArray();

                    DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFileByUserIdAndFileType(applicantId, ((int)EnumFileType.HippaForm).ToString());
                    if (dtGeneratedFile != null && dtGeneratedFile.Rows.Count > 0)
                    {
                        long generatedFileId = Convert.ToInt64(dtGeneratedFile.Rows[0]["GeneratedFileID"].ToString());
                        result = UpdateGeneratedFile(pdfTermplateId, data, templateFIleName, generatedFileId, applicantId, fileTypeCode, GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
                    }
                    else
                    {
                        result = AddGeneratedFile(pdfTermplateId, data, templateFIleName, applicantId, fileTypeCode, GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
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

        private byte[] GenerateHepaBFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            int fileTypeCode = (int)EnumFileType.HepatitisB;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());
            DataTable dataHepaB = HepaBHIPPAManager.GetHepaBHIPPADtByUserID(applicantId);

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

                if (dataHepaB != null && dataHepaB.Rows.Count > 0)
                {
                    FillPdfFormFieldsHepaB(applicantId, pdfFormFields, dataHepaB.Rows[0]);
                    pdfStamper.Close();
                    data = outputStream.ToArray();

                    DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFileByUserIdAndFileType(applicantId, fileTypeCode.ToString());
                    if (dtGeneratedFile != null && dtGeneratedFile.Rows.Count > 0)
                    {
                        long generatedFileId = Convert.ToInt64(dtGeneratedFile.Rows[0]["GeneratedFileID"].ToString());
                        result = UpdateGeneratedFile(pdfTermplateId, data, templateFIleName, generatedFileId, applicantId, fileTypeCode, GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
                    }
                    else
                    {
                        result = AddGeneratedFile(pdfTermplateId, data, templateFIleName, applicantId, fileTypeCode, GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
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

        public static byte[] MergedPDF(List<byte[]> pdfByteContent)
        {

            using (var ms = new MemoryStream())
            {
                using (var doc = new Document())
                {
                    using (var copy = new PdfSmartCopy(doc, ms))
                    {
                        doc.Open();

                        //Loop through each byte array
                        foreach (var p in pdfByteContent)
                        {

                            //Create a PdfReader bound to that byte array
                            using (var reader = new PdfReader(p))
                            {

                                //Add the entire document instead of page-by-page
                                copy.AddDocument(reader);
                            }
                        }

                        doc.Close();
                    }
                }

                //Return just before disposing
                return ms.ToArray();
            }
        }

        #region HIPPA
        [NonAction]
        public void FillPdfFormFieldsHIPPA(int applicantId, AcroFields pdfFormFields, DataRow dataRow)
        {
            //DataTable dt = ApplicantManager.GetSingleApplicant(applicantID);

            pdfFormFields.SetField("Employee", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
            if (!string.IsNullOrEmpty(dataRow["SignatureDate"].ToString()))
            {
                var entryDate = Convert.ToDateTime(dataRow["SignatureDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                pdfFormFields.SetField("Date", entryDate);
            }

            pdfFormFields.SetField("Signature of Employee", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("Signature of Compliance Officer", dataRow["ComplianceOfficer"].ToString().Trim());
        }
        #endregion

        #region HepaB
        [NonAction]
        public void FillPdfFormFieldsHepaB(int applicantId, AcroFields pdfFormFields, DataRow dataRow)
        {
            //DataTable dt = ApplicantManager.GetSingleApplicant(applicantID);


            pdfFormFields.SetField("Name", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
            DataTable dt = UserManager.GetUserDetailsByID(applicantId);
            if (dt.Rows[0]["ssn"] != null && dt.Rows[0]["ssn"] != DBNull.Value)
            {
                pdfFormFields.SetField("Social Security No", dt.Rows[0]["ssn"].ToString().Trim());
            }
            //pdfFormFields.SetField("Date", dataRow["ReasonDeclination"].ToString().Trim());
            pdfFormFields.SetField("Comment", dataRow["Comment"].ToString().Trim());

            if (!string.IsNullOrEmpty(dataRow["SignatureDate"].ToString()))
            {
                var signatureDate = Convert.ToDateTime(dataRow["SignatureDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                pdfFormFields.SetField("EmployeeDate", signatureDate);
            }
            if (!string.IsNullOrEmpty(dataRow["WitnessSignatureDate"].ToString()))
            {
                var witnessSignatureDate = Convert.ToDateTime(dataRow["WitnessSignatureDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                pdfFormFields.SetField("WitnessDate", witnessSignatureDate);
            }

            pdfFormFields.SetField("SignatureEMployee", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("SignatureWitness", dataRow["WitnessName"].ToString().Trim());
        }
        #endregion
    }
}
