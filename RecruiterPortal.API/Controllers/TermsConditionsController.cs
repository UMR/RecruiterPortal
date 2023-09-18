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
    [Route("api/terms-conditions")]
    [ApiController]
    public class TermsConditionsController : CustomControllerBase
    {
        public TermsConditionsController(ILogger<TermsConditionsController> logger) : base(logger)
        {
        }

        [Route("get-terms-conditions/{applicantId}")]
        [HttpGet]
        public IActionResult GetTermsConditionsByUserId(int applicantId)
        {
            try
            {
                TermsCondition termsCondition = TermsConditionsManager.GetTermsConditionByUserId(applicantId);
                TermsConditionModel termsConditionModel = null;

                if (termsCondition != null)
                {
                    termsConditionModel = new TermsConditionModel();
                    termsConditionModel.TermsConditionsID = termsCondition.TermsConditionsId;
                    termsConditionModel.EffectiveDate = termsCondition.EffectiveDate.ToString();
                    termsConditionModel.FacilityName = termsCondition.FacilityName;
                    termsConditionModel.StreetAddress = termsCondition.StreetAddress;
                    termsConditionModel.ZipCode = termsCondition.ZipCode;
                    termsConditionModel.City = termsCondition.City;
                    termsConditionModel.StateName = termsCondition.StateName;
                    termsConditionModel.OfficePhone = termsCondition.OfficePhone;
                    termsConditionModel.Position = termsCondition.Position;
                    termsConditionModel.RatePayCompensation = termsCondition.RatePayCompensation;
                    termsConditionModel.DaysPerWeek = termsCondition.DaysPerWeek;
                    termsConditionModel.NameGeneralLiabilityInsurance = termsCondition.NameGeneralLiabilityInsurance;
                    termsConditionModel.GeneralLiabilityInsurancePolicyNo = termsCondition.GeneralLiabilityInsurancePolicyNo;
                    termsConditionModel.NameMalpracticeInsurance = termsCondition.NameMalpracticeInsurance;
                    termsConditionModel.MalpracticeInsurancePolicyNo = termsCondition.MalpracticeInsurancePolicyNo;
                    termsConditionModel.NameWorkersCompensationInsurance = termsCondition.NameWorkersCompensationInsurance;
                    termsConditionModel.WorkersCompensationInsurancePolicyNo = termsCondition.WorkersCompensationInsurancePolicyNo;
                    termsConditionModel.NameDisabilityInsurance = termsCondition.NameDisabilityInsurance;
                    termsConditionModel.NameDisabilityInsurancePolicyNo = termsCondition.NameDisabilityInsurancePolicyNo;
                    termsConditionModel.SignatureDate = termsCondition.SignatureDate.ToString();
                    termsConditionModel.AuthorizedBy = termsCondition.AuthorizedBy;
                    termsConditionModel.AuthorizedDate = termsCondition.AuthorizedDate.ToString();
                    termsConditionModel.UserID = termsCondition.UserId;
                    termsConditionModel.CreatedDate = termsCondition.CreatedDate;
                }

                return Ok(termsConditionModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }            
        }

        [Route("save-terms-conditions")]
        [HttpPost]
        public IActionResult Save(TermsConditionModel termsConditionModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(termsConditionModel);
                }

                TermsCondition termsCondition = new TermsCondition();
                termsCondition.EffectiveDate = !string.IsNullOrEmpty(termsConditionModel.EffectiveDate) ? Convert.ToDateTime(termsConditionModel.EffectiveDate) : (DateTime?)null;
                termsCondition.FacilityName = termsConditionModel.FacilityName;
                termsCondition.StreetAddress = termsConditionModel.StreetAddress;
                termsCondition.ZipCode = termsConditionModel.ZipCode;
                termsCondition.City = termsConditionModel.City;
                termsCondition.StateName = termsConditionModel.StateName;
                termsCondition.OfficePhone = termsConditionModel.OfficePhone;
                termsCondition.Position = termsConditionModel.Position;
                termsCondition.RatePayCompensation = termsConditionModel.RatePayCompensation;
                termsCondition.DaysPerWeek = termsConditionModel.DaysPerWeek;
                termsCondition.NameGeneralLiabilityInsurance = termsConditionModel.NameGeneralLiabilityInsurance;
                termsCondition.GeneralLiabilityInsurancePolicyNo = termsConditionModel.GeneralLiabilityInsurancePolicyNo;
                termsCondition.NameMalpracticeInsurance = termsConditionModel.NameMalpracticeInsurance;
                termsCondition.MalpracticeInsurancePolicyNo = termsConditionModel.MalpracticeInsurancePolicyNo;
                termsCondition.NameWorkersCompensationInsurance = termsConditionModel.NameWorkersCompensationInsurance;
                termsCondition.WorkersCompensationInsurancePolicyNo = termsConditionModel.WorkersCompensationInsurancePolicyNo;
                termsCondition.NameDisabilityInsurance = termsConditionModel.NameDisabilityInsurance;
                termsCondition.NameDisabilityInsurancePolicyNo = termsConditionModel.NameDisabilityInsurancePolicyNo;
                termsCondition.SignatureDate = !string.IsNullOrEmpty(termsConditionModel.SignatureDate) ? Convert.ToDateTime(termsConditionModel.SignatureDate) : (DateTime?)null;
                termsCondition.AuthorizedBy = termsConditionModel.AuthorizedBy;
                termsCondition.AuthorizedDate = !string.IsNullOrEmpty(termsConditionModel.AuthorizedDate) ? Convert.ToDateTime(termsConditionModel.AuthorizedDate) : (DateTime?)null;
                termsCondition.UserId = termsConditionModel.UserID;

                TermsCondition isExist = TermsConditionsManager.GetTermsConditionByUserId(termsConditionModel.UserID);

                if (isExist == null)
                {
                    termsCondition.CreatedDate = DateTime.Now;
                    TermsConditionsManager.InsertTermsCondition(termsCondition);
                    UserManager.SendMailToRecruiterDBModified(termsConditionModel.UserID, "Terms and Conditions");
                }
                else
                {
                    termsCondition.TermsConditionsId = termsConditionModel.TermsConditionsID.Value;
                    TermsConditionsManager.UpdateTermsCondition(termsCondition);
                    UserManager.SendMailToRecruiterDBModified(termsConditionModel.UserID, "Terms and Conditions");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("get-terms-conditions-file/{applicantId}")]
        public IActionResult GetInfluenzaVaccinationFile(int applicantId)
        {
            try
            {
                string fileName = string.Empty;
                var file = GenerateTermsAndConditionsFile(applicantId, out fileName);
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
        private byte[] GenerateTermsAndConditionsFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            int fileTypeCode = (int)EnumFileType.TermsAndConditionsIndependentContractor;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());

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

                DataTable dtTermsConditions = TermsConditionsManager.GetTermsConditionDataTableByUserId(applicantId);
                DataTable dtApplicant = UserManager.GetUserDetailsByID(applicantId);

                if (dtApplicant != null && dtApplicant.Rows.Count > 0)
                {
                    FillTermsAndConditionsApplicantPdfFormFields(pdfFormFields, dtApplicant.Rows[0]);

                    if (dtTermsConditions != null && dtTermsConditions.Rows.Count > 0)
                    {
                        FillTermsAndConditionsPdfFormFields(pdfFormFields, dtTermsConditions.Rows[0]);
                    }

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
        public void FillTermsAndConditionsPdfFormFields(AcroFields pdfFormFields, DataRow dataRow)
        {
            if (!string.IsNullOrEmpty(dataRow["EffectiveDate"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dataRow["EffectiveDate"].ToString());
                pdfFormFields.SetField("EffectiveDateMonth", dateParts[0]);
                pdfFormFields.SetField("EffectiveDateDay", dateParts[1]);
                pdfFormFields.SetField("EffectiveDateYear", dateParts[2]);
            }
            pdfFormFields.SetField("FacilityName", dataRow["FacilityName"].ToString().Trim());
            pdfFormFields.SetField("StreetAddress", dataRow["StreetAddress"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["ZipCode"].ToString()))
            {
                //string stateName = string.Empty;
                //if (!string.IsNullOrEmpty(dataRow["StateName"].ToString()))
                //{
                //    stateName = GetStateName(Convert.ToInt32(dataRow["StateName"].ToString()));
                //}
                string cityStateZipCode = dataRow["City"].ToString() + ", " + dataRow["StateName"].ToString() + ", " + dataRow["ZipCode"].ToString();
                pdfFormFields.SetField("CityStateZipCode", cityStateZipCode);
            }
            if (!string.IsNullOrEmpty(dataRow["OfficePhone"].ToString()))
            {
                string[] phoneParts = GetPhoneParts(dataRow["OfficePhone"].ToString());
                pdfFormFields.SetField("OfficePhoneFirst", phoneParts[0]);
                pdfFormFields.SetField("OfficePhoneSecond", phoneParts[1]);
                pdfFormFields.SetField("OfficePhoneThird", phoneParts[2]);
            }
            pdfFormFields.SetField("Position", dataRow["Position"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["RatePayCompensation"].ToString()))
            {
                pdfFormFields.SetField("RatePayCompensation", dataRow["RatePayCompensation"].ToString());
            }
            if (!string.IsNullOrEmpty(dataRow["DaysPerWeek"].ToString()))
            {
                pdfFormFields.SetField("DaysPerWeek", dataRow["DaysPerWeek"].ToString());
            }
            pdfFormFields.SetField("NameGeneralLiabilityInsurance", dataRow["NameGeneralLiabilityInsurance"].ToString().Trim());
            pdfFormFields.SetField("GeneralLiabilityInsurancePolicyNo", dataRow["GeneralLiabilityInsurancePolicyNo"].ToString().Trim());
            pdfFormFields.SetField("NameMalpracticeInsurance", dataRow["NameMalpracticeInsurance"].ToString().Trim());
            pdfFormFields.SetField("MalpracticeInsurancePolicyNo", dataRow["MalpracticeInsurancePolicyNo"].ToString().Trim());
            pdfFormFields.SetField("NameWorkersCompensationInsurance", dataRow["NameWorkersCompensationInsurance"].ToString().Trim());
            pdfFormFields.SetField("WorkersCompensationInsurancePolicyNo", dataRow["WorkersCompensationInsurancePolicyNo"].ToString().Trim());
            pdfFormFields.SetField("NameDisabilityInsurance", dataRow["NameDisabilityInsurance"].ToString().Trim());
            pdfFormFields.SetField("NameDisabilityInsurancePolicyNo", dataRow["NameDisabilityInsurancePolicyNo"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["SignatureDate"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dataRow["SignatureDate"].ToString());
                pdfFormFields.SetField("ContractorSignatureDateFirst", dateParts[0]);
                pdfFormFields.SetField("ContractorSignatureDateSecond", dateParts[1]);
                pdfFormFields.SetField("ContractorSignatureDateThird", dateParts[2]);
            }
            pdfFormFields.SetField("AuthorizedBy", dataRow["AuthorizedBy"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["AuthorizedDate"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dataRow["AuthorizedDate"].ToString());
                pdfFormFields.SetField("AuthorizedDateFirst", dateParts[0]);
                pdfFormFields.SetField("AuthorizedDateSecond", dateParts[1]);
                pdfFormFields.SetField("AuthorizedDateThird", dateParts[2]);
            }
        }
        [NonAction]
        public void FillTermsAndConditionsApplicantPdfFormFields(AcroFields pdfFormFields, DataRow dataRow)
        {
            pdfFormFields.SetField("ApplicantName", GetApplicantName());
            pdfFormFields.SetField("ApplicantStreetAddress", dataRow["StreetAddress"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["ZipCode"].ToString()))
            {
                string cityStateZipCode = dataRow["City"].ToString() + ", " + dataRow["State"].ToString() + "," + dataRow["ZipCode"].ToString();
                pdfFormFields.SetField("ApplicantCityStateZipCode", cityStateZipCode);
            }

            pdfFormFields.SetField("ContractorBusinessName", GetApplicantName());
            pdfFormFields.SetField("ContractorBusinessStreetAddress", dataRow["StreetAddress"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["ZipCode"].ToString()))
            {
                string cityStateZipCode = dataRow["City"].ToString() + ", " + dataRow["State"].ToString() + ", " + dataRow["ZipCode"].ToString();
                pdfFormFields.SetField("ContractorBusinessCityStateZipCode", cityStateZipCode);
            }

            pdfFormFields.SetField("ContractorSignature", GetApplicantName());
        }

    }
}
