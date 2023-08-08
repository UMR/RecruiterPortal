using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using System.Data;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-w9")]
    [ApiController]
    public class W9FormController : CustomControllerBase
    {
        public W9FormController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserW9FormByUserId(int applicantId)
        {

            try
            {
                W9from userUSCI = W9FormManager.GetW9FormByUserID(applicantId);
                W9Model w9Model = null;

                if (userUSCI != null)
                {
                    w9Model = new W9Model();
                    base.MapObjects(userUSCI, w9Model);
                }

                return Ok(w9Model);
            }
            catch (Exception ex)
            {
                _logger.LogError("");
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(W9Model w9Model)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    W9from W9From = new W9from();
                    base.MapObjects(w9Model, W9From);
                    W9From.UserId = w9Model.UserID;

                    W9from isExist = W9FormManager.GetW9FormByUserID(w9Model.UserID);

                    if (isExist == null)
                    {
                        W9FormManager.SaveW9Form(W9From);
                        //UserManager.SendMailToRecruiterDBModified(base.GetCurrentUser().UserID, "W9");
                    }
                    else
                    {
                        W9FormManager.UpdateW9Form(W9From);
                        //UserManager.SendMailToRecruiterDBModified(base.GetCurrentUser().UserID, "W9");
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


        [HttpGet]
        [Route("file/{applicantId}")]
        public IActionResult GetFileForCustomer(int applicantId)
        {
            string fileName = string.Empty;
            try
            {
                var file = GenerateW9File(applicantId, out fileName);
                return new FileContentResult(file, "application/octet-stream")
                {
                    FileDownloadName = fileName
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private byte[] GenerateW9File(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            int fileTypeCode = (int)EnumFileType.W9;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());
            DataTable dtW9 = W9FormManager.GetW9FormDataTableByUserID(applicantId);

            if (dtPdfTemplate != null && dtPdfTemplate.Rows.Count > 0)
            {
                long pdfTermplateId = Convert.ToInt64(dtPdfTemplate.Rows[0]["TermplateID"].ToString());
                byte[] temlateFileData = dtPdfTemplate.Rows[0]["FileData"] as byte[];
                string templateFIleName = dtPdfTemplate.Rows[0]["FIleName"].ToString();
                templateFIleName = templateFIleName.Substring(0, templateFIleName.LastIndexOf('.'));
                fileName = $"{templateFIleName}_{GetApplicantFirstName()}_{DateTime.Now.ToString("MMddyyyyHHmmss")}.pdf";

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

                if (dtW9 != null && dtW9.Rows.Count > 0)
                {
                    try
                    {
                        W9FillPdfFormFields(pdfFormFields, dtW9.Rows[0]);
                    }
                    catch (Exception ex)
                    {

                        throw ex;
                    }

                    pdfStamper.Close();
                    data = outputStream.ToArray();
                    //DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFilesByApplicantIDandFileCode(applicantID, ((int)EnumFileType.IndependentContractorAgreement).ToString());
                    DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFileByUserIdAndFileType(applicantId, fileTypeCode.ToString());
                    if (dtGeneratedFile != null && dtGeneratedFile.Rows.Count > 0)
                    {

                        long generatedFileId = Convert.ToInt64(dtGeneratedFile.Rows[0]["GeneratedFileID"].ToString());
                        result = UpdateGeneratedFile(pdfTermplateId, data, templateFIleName, generatedFileId, applicantId, fileTypeCode);
                    }
                    else
                    {
                        //int generatedFileId;
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
        public void W9FillPdfFormFields(AcroFields pdfFormFields, DataRow dataRow)
        {
            pdfFormFields.SetField("Name", dataRow["Name"].ToString().Trim());
            pdfFormFields.SetField("BusinessName", dataRow["BusinessName"].ToString().Trim());
            if (dataRow["CompanyLiability"].ToString() == "True")
            {
                pdfFormFields.SetField("CompanyLiability", "On");
            }
            if (dataRow["IndividualProprietor"].ToString() == "True")
            {
                pdfFormFields.SetField("IndividualProprietor", "On");
            }
            if (dataRow["CCorporation"].ToString() == "True")
            {
                pdfFormFields.SetField("CCorporation", "On");
            }
            if (dataRow["SCorporation"].ToString() == "True")
            {
                pdfFormFields.SetField("SCorporation", "On");
            }
            if (dataRow["Partnership"].ToString() == "True")
            {
                pdfFormFields.SetField("Partnership", "On");
            }
            if (dataRow["Trust"].ToString() == "True")
            {
                pdfFormFields.SetField("Trust", "On");
            }
            if (dataRow["Other"].ToString() == "True")
            {
                pdfFormFields.SetField("Other", "On");
            }
            pdfFormFields.SetField("PayeeCode", dataRow["PayeeCode"].ToString().Trim());
            pdfFormFields.SetField("ReportingCode", dataRow["ReportingCode"].ToString());
            pdfFormFields.SetField("StreetAddressandApt", dataRow["StreetAddress"].ToString() + "," + dataRow["AptNo"].ToString());
            pdfFormFields.SetField("CityStateZip", dataRow["City"].ToString().Trim() + "," + dataRow["StateName"].ToString().Trim() + "," + dataRow["ZipCode"].ToString().Trim());
            pdfFormFields.SetField("AccountNumber", dataRow["AccountNumber"].ToString().Trim());
            pdfFormFields.SetField("RequesterNameAddress", dataRow["RequesterNameAddress"].ToString().Trim());
            if (dataRow["SSN"].ToString() != "" && dataRow["SSN"].ToString().Length > 0 && dataRow["SSN"].ToString().Length <= 3)
            {
                pdfFormFields.SetField("SSN1", dataRow["SSN"].ToString());
            }
            if (dataRow["SSN"].ToString().Length > 3 && dataRow["SSN"].ToString().Length <= 5)
            {
                pdfFormFields.SetField("SSN1", dataRow["SSN"].ToString().Substring(0, 3));
                pdfFormFields.SetField("SSN2", dataRow["SSN"].ToString().Substring(3));
            }
            if (dataRow["SSN"].ToString().Length > 5)
            {
                pdfFormFields.SetField("SSN1", dataRow["SSN"].ToString().Substring(0, 3));
                pdfFormFields.SetField("SSN2", dataRow["SSN"].ToString().Substring(3, 2));
                pdfFormFields.SetField("SSN3", dataRow["SSN"].ToString().Substring(5));
            }
            if (dataRow["EmployerIdNo"].ToString() != "" && dataRow["EmployerIdNo"].ToString().Length > 0 && dataRow["EmployerIdNo"].ToString().Length <= 2)
            {
                pdfFormFields.SetField("EmployerIdNo1", dataRow["EmployerIdNo"].ToString());
            }
            if (dataRow["EmployerIdNo"].ToString().Length > 2)
            {
                pdfFormFields.SetField("EmployerIdNo1", dataRow["EmployerIdNo"].ToString().Substring(0, 2));
                pdfFormFields.SetField("EmployerIdNo2", dataRow["EmployerIdNo"].ToString().Substring(2));
            }

            pdfFormFields.SetField("SIgnature", GetApplicantName());
            string date = string.Empty;
            if (dataRow["Date"].ToString() != "")
            {
                date = (Convert.ToDateTime(dataRow["Date"]).ToString("MM/dd/yyyy"));
            }

            pdfFormFields.SetField("Date", date);

        }

    }
}
