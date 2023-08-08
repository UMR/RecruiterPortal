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
    [Route("api/influenza-vaccination")]
    [ApiController]
    public class InfluenzaVaccinationController : CustomControllerBase
    {
        [Route("get-influenza-vaccination/{applicantId}")]
        [HttpGet]
        public IActionResult GetInfluenzaVaccinationByUserId(int applicantId)
        {
            try
            {
                InfluenzaVaccination influenzaVaccination = InfluenzaVaccinationManager.GetInfluenzaVaccinationByUserId(applicantId);
                InfluenzaVaccinationModel influenzaVaccinationModel = null;

                if (influenzaVaccination != null)
                {
                    influenzaVaccinationModel = new InfluenzaVaccinationModel();
                    influenzaVaccinationModel.InfluenzaVaccinationID = influenzaVaccination.InfluenzaVaccinationId;
                    influenzaVaccinationModel.FacilityName = influenzaVaccination.FacilityName;
                    influenzaVaccinationModel.ReasonDeclination = influenzaVaccination.ReasonDeclination;
                    influenzaVaccinationModel.Signature = influenzaVaccination.Signature;
                    influenzaVaccinationModel.EntryDate = influenzaVaccination.EntryDate.ToString();
                    influenzaVaccinationModel.Name = influenzaVaccination.Name;
                    influenzaVaccinationModel.Department = influenzaVaccination.Department;
                    influenzaVaccinationModel.UserID = influenzaVaccination.UserId;
                    influenzaVaccinationModel.CreatedDate = influenzaVaccination.CreatedDate;
                }

                return Ok(influenzaVaccinationModel);
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

        [Route("save-influenza-vaccination")]
        [HttpPost]
        public IActionResult Save(InfluenzaVaccinationModel influenzaVaccinationModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(influenzaVaccinationModel);
                }

                InfluenzaVaccination influenzaVaccination = new InfluenzaVaccination();
                influenzaVaccination.FacilityName = influenzaVaccinationModel.FacilityName;
                influenzaVaccination.ReasonDeclination = influenzaVaccinationModel.ReasonDeclination;
                influenzaVaccination.Signature = influenzaVaccinationModel.Signature;
                influenzaVaccination.EntryDate = !string.IsNullOrEmpty(influenzaVaccinationModel.EntryDate) ? Convert.ToDateTime(influenzaVaccinationModel.EntryDate) : (DateTime?)null;
                influenzaVaccination.Name = influenzaVaccinationModel.Name;
                influenzaVaccination.Department = influenzaVaccinationModel.Department;
                influenzaVaccination.UserId = influenzaVaccinationModel.UserID;

                InfluenzaVaccination isExist = InfluenzaVaccinationManager.GetInfluenzaVaccinationByUserId(influenzaVaccinationModel.UserID);

                if (isExist == null)
                {
                    influenzaVaccination.CreatedDate = DateTime.Now;
                    InfluenzaVaccinationManager.InsertInfluenzaVaccination(influenzaVaccination);
                }
                else
                {
                    influenzaVaccination.InfluenzaVaccinationId = influenzaVaccinationModel.InfluenzaVaccinationID.Value;
                    InfluenzaVaccinationManager.UpdateInfluenzaVaccination(influenzaVaccination);
                }

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

        [HttpGet]
        [Route("get-influenza-vaccination-file/{applicantId}")]
        public IActionResult GetInfluenzaVaccinationFile(int applicantId)
        {
            try
            {
                string fileName = string.Empty;
                var file = GenerateInfluenzaVaccinationFile(applicantId, out fileName);

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

        private byte[] GenerateInfluenzaVaccinationFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            int fileTypeCode = (int)EnumFileType.DeclinationInfluenza;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());

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

                DataTable dtInfluenzaVaccination = InfluenzaVaccinationManager.GetInfluenzaVaccinationDataTableByUserId(applicantId);

                if (dtInfluenzaVaccination != null && dtInfluenzaVaccination.Rows.Count > 0)
                {
                    FillInfluenzaVaccinatonPdfFormFields(pdfFormFields, dtInfluenzaVaccination.Rows[0]);
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
        private void FillInfluenzaVaccinatonPdfFormFields(AcroFields pdfFormFields, DataRow dataRow)
        {
            pdfFormFields.SetField("FacilityName", dataRow["FacilityName"].ToString().Trim());
            string reason = dataRow["ReasonDeclination"].ToString().Trim();

            if (reason.Length > 0)
            {
                if (reason.Length <= 81)
                {
                    string reason1 = reason.Substring(0, reason.Length);
                    pdfFormFields.SetField("ReasonDeclination1", reason1);
                }
                else if (reason.Length > 81 && reason.Length <= 148)
                {
                    string reason1 = reason.Substring(0, 81);
                    string reason2 = reason.Substring(81, reason.Length - 81);
                    pdfFormFields.SetField("ReasonDeclination1", reason1);
                    pdfFormFields.SetField("ReasonDeclination2", reason2);
                }
                else if (reason.Length > 148)
                {
                    string reason1 = reason.Substring(0, 81);
                    string reason2 = reason.Substring(81, 67);
                    string reason3 = reason.Substring(148, reason.Length - 148);
                    pdfFormFields.SetField("ReasonDeclination1", reason1);
                    pdfFormFields.SetField("ReasonDeclination2", reason2);
                    pdfFormFields.SetField("ReasonDeclination3", reason3);
                }
            }
            pdfFormFields.SetField("Signature", dataRow["Signature"].ToString().Trim());
            pdfFormFields.SetField("Name", dataRow["Name"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["EntryDate"].ToString()))
            {
                var entryDate = Convert.ToDateTime(dataRow["EntryDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                pdfFormFields.SetField("EntryDate", entryDate);
            }

            pdfFormFields.SetField("Department", dataRow["Department"].ToString().Trim());
        }

    }
}
