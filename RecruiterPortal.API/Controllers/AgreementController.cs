using Microsoft.AspNetCore.Mvc;
using System.Data;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortal.DAL.Models;
using RecruiterPortalDAL.Managers;
using static RecruiterPortal.DAL.Utility.Utility;
using iTextSharp.text.pdf;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-agreement")]
    [ApiController]
    public class AgreementController : CustomControllerBase
    {

        [Route("get/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserAgreementByUserId(int applicantId)
        {

            try
            {
                AgreementFrom userUSCI = AgreementFormManager.GetAgreementByUserID(applicantId);
                AgreementModel agreemetModel = null;

                if (userUSCI != null)
                {
                    agreemetModel = new AgreementModel();
                    base.MapObjects(userUSCI, agreemetModel);
                }

                return Ok(agreemetModel);
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
                //    return StatusCode(500, ex.Message);
                //}
                return StatusCode(500, ex.Message);
            }

            return BadRequest();
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(AgreementModel agreement)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    AgreementFrom agreementFrom = new AgreementFrom();
                    base.MapObjects(agreement, agreementFrom);
                    agreementFrom.UserId = agreement.UserID;

                    AgreementFrom isExist = AgreementFormManager.GetAgreementByUserID(agreement.UserID);

                    if (isExist == null)
                    {
                        AgreementFormManager.SaveAgreement(agreementFrom);
                    }
                    else
                    {
                        AgreementFormManager.UpdateAgreement(agreementFrom);
                    }

                    return Ok();
                }
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

        [HttpGet]
        [Route("file/{applicantId}")]
        public IActionResult GetFileForCustomer(int applicantId)
        {
            string fileName = string.Empty;
            try
            {
                var file = GenerateAgreementFile(applicantId, out fileName);
                return new FileContentResult(file, "application/octet-stream")
                {
                    FileDownloadName = fileName
                };
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

        private byte[] GenerateAgreementFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            int fileTypeCode = (int)EnumFileType.IndependentContractorAgreement;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());
            DataTable dtAggreement = AgreementFormManager.GetAgreementDataTableByUserID(applicantId);

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

                if (dtAggreement != null && dtAggreement.Rows.Count > 0)
                {
                    AgreementFillPdfFormFields(pdfFormFields, dtAggreement.Rows[0]);
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
        private void AgreementFillPdfFormFields(AcroFields pdfFormFields, DataRow dataRow)
        {
            pdfFormFields.SetField("ContractorName", dataRow["ContractorName"].ToString().Trim());
            pdfFormFields.SetField("Notary", dataRow["Notary"].ToString().Trim());
            string date = string.Empty;
            if (dataRow["Date"].ToString() != "")
            {
                date = (Convert.ToDateTime(dataRow["Date"]).ToString("MM/dd/yyyy"));
                pdfFormFields.SetField("Date", date);
            }
            string name = "STEVEN CHARLES COHN, M.D.";
            pdfFormFields.SetField("By", name);
        }
    }
}
