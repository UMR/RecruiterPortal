using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using System.Data;
using System.Text.Json;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/nurse-form")]
    [ApiController]
    public class NurseFormController : CustomControllerBase
    {
        public NurseFormController(ILogger<NurseFormController> logger) : base(logger)
        {
        }

        [Route("get-nurse-form/{applicantId}")]
        [HttpGet]
        public IActionResult GetNurseFormByUserId(int applicantId)
        {
            try
            {

                NurseForm nurseForm = NurseFormManager.GetNurseFormByUserId(applicantId);
                NurseFormModel nurseFormModel = null;

                if (nurseForm != null)
                {
                    nurseFormModel = new NurseFormModel();
                    nurseFormModel.NurseFormID = nurseForm.NurseFormId;

                    nurseFormModel.ApplyingForJobType = nurseForm.ApplyingForJobType == null ? string.Empty : nurseForm.ApplyingForJobType.ToString();
                    nurseFormModel.ApplyingForPosition = nurseForm.ApplyingForPosition == null ? string.Empty : nurseForm.ApplyingForPosition.ToString();

                    nurseFormModel.LicensedJurisdiction = nurseForm.LicensedJurisdiction == null ? string.Empty : nurseForm.LicensedJurisdiction.ToString();
                    nurseFormModel.FailedRNLicensing = nurseForm.FailedRnlicensing == null ? string.Empty : nurseForm.FailedRnlicensing.ToString();
                    nurseFormModel.FailedPNLicensing = nurseForm.FailedPnlicensing == null ? string.Empty : nurseForm.FailedPnlicensing.ToString();
                    nurseFormModel.CGFNSCNATSCompleted = nurseForm.Cgfnscnatscompleted;
                    nurseFormModel.CGFNSExaminationDate = nurseForm.CgfnsexaminationDate.ToString();
                    nurseFormModel.CGFNSCertificateNumber = nurseForm.CgfnscertificateNumber;
                    nurseFormModel.CNATSExaminationDate = nurseForm.CnatsexaminationDate.ToString();
                    nurseFormModel.CNATSExamScore = nurseForm.CnatsexamScore;
                    nurseFormModel.NursingSchoolAttended = nurseForm.NursingSchoolAttended;
                    nurseFormModel.NursingSchoolAddress = nurseForm.NursingSchoolAddress;
                    nurseFormModel.NursingSchoolCompletedDate = nurseForm.NursingSchoolCompletedDate.ToString();
                    nurseFormModel.PermitteesName = nurseForm.PermitteesName;
                    nurseFormModel.RNLPNEmployed = nurseForm.Rnlpnemployed;
                    nurseFormModel.EmployerName = nurseForm.EmployerName;
                    nurseFormModel.EmployerStreetAddress = nurseForm.EmployerStreetAddress;
                    nurseFormModel.EmployerCity = nurseForm.EmployerCity;
                    nurseFormModel.EmployerStateProvince = nurseForm.EmployerStateProvince;
                    nurseFormModel.EmployerZipCode = nurseForm.EmployerZipCode;
                    nurseFormModel.EmployerCountry = nurseForm.EmployerCountry;
                    nurseFormModel.EmployerTelephone = nurseForm.EmployerTelephone;
                    nurseFormModel.EmployerFax = nurseForm.EmployerFax;
                    nurseFormModel.EmployerEmail = nurseForm.EmployerEmail;
                    nurseFormModel.PracticeName = nurseForm.PracticeName;
                    nurseFormModel.PracticeStreetAddress = nurseForm.PracticeStreetAddress;
                    nurseFormModel.PracticeCity = nurseForm.PracticeCity;
                    nurseFormModel.PracticeStateProvince = nurseForm.PracticeStateProvince;
                    nurseFormModel.PracticeZipCode = nurseForm.PracticeZipCode;
                    nurseFormModel.PracticeCountry = nurseForm.PracticeCountry;
                    nurseFormModel.PracticeTelephone = nurseForm.PracticeTelephone;
                    nurseFormModel.PracticeFax = nurseForm.PracticeFax;
                    nurseFormModel.PracticeEmail = nurseForm.PracticeEmail;
                    nurseFormModel.RegisteredProfessionalNurse = nurseForm.RegisteredProfessionalNurse;
                    nurseFormModel.NewYorkStateLicenseNumber1 = nurseForm.NewYorkStateLicenseNumber1;
                    nurseFormModel.NewYorkStateLicenseNumber2 = nurseForm.NewYorkStateLicenseNumber2;
                    nurseFormModel.SignatureBehalfEmployer = nurseForm.SignatureBehalfEmployer;
                    nurseFormModel.SignatureDate = nurseForm.SignatureDate.ToString();
                    nurseFormModel.PrintName = nurseForm.PrintName;
                    nurseFormModel.Title = nurseForm.Title;
                    nurseFormModel.NewYorkStateProfession = nurseForm.NewYorkStateProfession;
                    nurseFormModel.NewYorkStateProfessionalLicenseNumber = nurseForm.NewYorkStateProfessionalLicenseNumber;
                    nurseFormModel.UserID = applicantId;
                    nurseFormModel.CreatedDate = nurseForm.CreatedDate;
                }

                string json = JsonSerializer.Serialize(nurseFormModel, new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

                return Ok(json);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save-nurse-form")]
        [HttpPost]
        public IActionResult Save(NurseFormModel nurseFormModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(nurseFormModel);
                }

                NurseForm nurseForm = new NurseForm();

                nurseForm.ApplyingForJobType = !string.IsNullOrEmpty(nurseFormModel.ApplyingForJobType) ? Convert.ToBoolean(nurseFormModel.ApplyingForJobType) : (bool?)null;
                nurseForm.ApplyingForPosition = !string.IsNullOrEmpty(nurseFormModel.ApplyingForPosition) ? Convert.ToByte(nurseFormModel.ApplyingForPosition) : (byte?)null; ;

                nurseForm.LicensedJurisdiction = !string.IsNullOrEmpty(nurseFormModel.LicensedJurisdiction) ? Convert.ToBoolean(nurseFormModel.LicensedJurisdiction) : (bool?)null;
                nurseForm.FailedRnlicensing = !string.IsNullOrEmpty(nurseFormModel.FailedRNLicensing) ? Convert.ToBoolean(nurseFormModel.FailedRNLicensing) : (bool?)null; ;
                nurseForm.FailedPnlicensing = !string.IsNullOrEmpty(nurseFormModel.FailedPNLicensing) ? Convert.ToBoolean(nurseFormModel.FailedPNLicensing) : (bool?)null;
                nurseForm.Cgfnscnatscompleted = nurseFormModel.CGFNSCNATSCompleted;
                nurseForm.CgfnsexaminationDate = !string.IsNullOrEmpty(nurseFormModel.CGFNSExaminationDate) ? Convert.ToDateTime(nurseFormModel.CGFNSExaminationDate) : (DateTime?)null;
                nurseForm.CgfnscertificateNumber = nurseFormModel.CGFNSCertificateNumber;
                nurseForm.CnatsexaminationDate = !string.IsNullOrEmpty(nurseFormModel.CNATSExaminationDate) ? Convert.ToDateTime(nurseFormModel.CNATSExaminationDate) : (DateTime?)null;
                nurseForm.CnatsexamScore = nurseFormModel.CNATSExamScore;
                nurseForm.NursingSchoolAttended = nurseFormModel.NursingSchoolAttended;
                nurseForm.NursingSchoolAddress = nurseFormModel.NursingSchoolAddress;
                nurseForm.NursingSchoolCompletedDate = !string.IsNullOrEmpty(nurseFormModel.NursingSchoolCompletedDate) ? Convert.ToDateTime(nurseFormModel.NursingSchoolCompletedDate) : (DateTime?)null;
                nurseForm.PermitteesName = nurseFormModel.PermitteesName;
                nurseForm.Rnlpnemployed = nurseFormModel.RNLPNEmployed;
                nurseForm.EmployerName = nurseFormModel.EmployerName;
                nurseForm.EmployerStreetAddress = nurseFormModel.EmployerStreetAddress;
                nurseForm.EmployerCity = nurseFormModel.EmployerCity;
                nurseForm.EmployerStateProvince = nurseFormModel.EmployerStateProvince;
                nurseForm.EmployerZipCode = nurseFormModel.EmployerZipCode;
                nurseForm.EmployerCountry = nurseFormModel.EmployerCountry;
                nurseForm.EmployerTelephone = nurseFormModel.EmployerTelephone;
                nurseForm.EmployerFax = nurseFormModel.EmployerFax;
                nurseForm.EmployerEmail = nurseFormModel.EmployerEmail;
                nurseForm.PracticeName = nurseFormModel.PracticeName;
                nurseForm.PracticeStreetAddress = nurseFormModel.PracticeStreetAddress;
                nurseForm.PracticeCity = nurseFormModel.PracticeCity;
                nurseForm.PracticeStateProvince = nurseFormModel.PracticeStateProvince;
                nurseForm.PracticeZipCode = nurseFormModel.PracticeZipCode;
                nurseForm.PracticeCountry = nurseFormModel.PracticeCountry;
                nurseForm.PracticeTelephone = nurseFormModel.PracticeTelephone;
                nurseForm.PracticeFax = nurseFormModel.PracticeFax;
                nurseForm.PracticeEmail = nurseFormModel.PracticeEmail;
                nurseForm.RegisteredProfessionalNurse = nurseFormModel.RegisteredProfessionalNurse;
                nurseForm.NewYorkStateLicenseNumber1 = nurseFormModel.NewYorkStateLicenseNumber1;
                nurseForm.NewYorkStateLicenseNumber2 = nurseFormModel.NewYorkStateLicenseNumber2;
                nurseForm.SignatureBehalfEmployer = nurseFormModel.SignatureBehalfEmployer;
                nurseForm.SignatureDate = !string.IsNullOrEmpty(nurseFormModel.SignatureDate) ? Convert.ToDateTime(nurseFormModel.SignatureDate) : (DateTime?)null;
                nurseForm.PrintName = nurseFormModel.PrintName;
                nurseForm.Title = nurseFormModel.Title;
                nurseForm.NewYorkStateProfession = nurseFormModel.NewYorkStateProfession;
                nurseForm.NewYorkStateProfessionalLicenseNumber = nurseFormModel.NewYorkStateProfessionalLicenseNumber;
                nurseForm.UserId = nurseFormModel.UserID;

                NurseForm isExist = NurseFormManager.GetNurseFormByUserId(nurseFormModel.UserID);

                if (isExist == null)
                {
                    nurseForm.CreatedDate = DateTime.Now;
                    NurseFormManager.InsertNurseForm(nurseForm);
                    //UserManager.SendMailToRecruiterDBModified(base.GetCurrentUser().UserID, "Nurse Form");
                }
                else
                {
                    nurseForm.NurseFormId = nurseFormModel.NurseFormID.Value;
                    NurseFormManager.UpdateNurseForm(nurseForm);
                    //UserManager.SendMailToRecruiterDBModified(base.GetCurrentUser().UserID, "Nurse Form");
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
        [Route("get-nurse-form-file/{applicantId}")]
        public IActionResult GetNurseFormFileByApplicantId(int applicantId)
        {
            try
            {
                string fileName = string.Empty;
                var file = GenerateNurseFormFile(applicantId, out fileName);
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
        private byte[] GenerateNurseFormFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            try
            {
                int fileTypeCode = (int)EnumFileType.NurseForm;
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

                    FillNurseFormPdfFormFields(applicantId, pdfFormFields);
                    FillNurseFormApplicantPdfFormFields(applicantId, pdfFormFields);

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
                    fileName = "";
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [NonAction]
        public void FillNurseFormApplicantPdfFormFields(int applicantId, AcroFields pdfFormFields)
        {
            //DataTable dtApplicant = ApplicantManager.GetApplicant(applicantID);

            DataTable dtApplicant = UserManager.GetUserDetailsByID(applicantId);

            DataRow dataRow = dtApplicant.Rows[0];

            pdfFormFields.SetField("Last", GetApplicantLastName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("First", GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
            //pdfFormFields.SetField("Middle", GetApplicantMiddleName());
            if (!string.IsNullOrEmpty(dataRow["ssn"].ToString()))
            {
                string ssn = dataRow["ssn"].ToString();
                if (ssn.Length > 0 && ssn.Length < 9)
                {
                    pdfFormFields.SetField("SocialSecurityNumber", ssn.Substring(0, ssn.Length));
                }
                else if (ssn.Length >= 9)
                {
                    pdfFormFields.SetField("SocialSecurityNumber", ssn.Substring(0, 9));
                }
            }
            if (!string.IsNullOrEmpty(dataRow["DateOfBirth"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dataRow["DateOfBirth"].ToString());
                pdfFormFields.SetField("BirthDateMonth", dateParts[0]);
                pdfFormFields.SetField("BirthDateDay", dateParts[1]);
                pdfFormFields.SetField("BirthDateYear", dateParts[2]);
            }
            if (!string.IsNullOrEmpty(dataRow["Phone"].ToString()))
            {
                string[] phoneParts = GetPhoneParts(dataRow["Phone"].ToString());
                pdfFormFields.SetField("Phone1", phoneParts[0]);
                pdfFormFields.SetField("Phone2", phoneParts[1]);
                pdfFormFields.SetField("Phone3", phoneParts[2]);
            }
            pdfFormFields.SetField("EmailAddress", GetApplicantEmail());
            if (!string.IsNullOrEmpty(dataRow["ZipCode"].ToString()))
            {
                string zipcode = dataRow["ZipCode"].ToString();
                int zipcodeLength = zipcode.Length;
                if (zipcodeLength > 0 && zipcodeLength <= 5)
                {
                    pdfFormFields.SetField("ZIPCode1", zipcode.Substring(0, zipcodeLength));
                }
                else if (zipcodeLength > 5 && zipcodeLength <= 9)
                {
                    pdfFormFields.SetField("ZIPCode1", zipcode.Substring(0, 5));
                    pdfFormFields.SetField("ZIPCode2", zipcode.Substring(5, zipcodeLength - 5));
                }
                else
                {
                    pdfFormFields.SetField("ZIPCode1", zipcode.Substring(0, 5));
                    pdfFormFields.SetField("ZIPCode2", zipcode.Substring(5, 4));
                }
            }
            pdfFormFields.SetField("City", dataRow["City"].ToString());
            if (!string.IsNullOrEmpty(dataRow["State"].ToString()))
            {
                DataTable dataTable = ZipCodeManager.GetStateCodeByStateName(dataRow["State"].ToString());
                if (dataTable != null && dataTable.Rows.Count > 0)
                {
                    pdfFormFields.SetField("State", dataTable.Rows[0]["SateCode"].ToString());
                }
                else
                {
                    pdfFormFields.SetField("State", dataRow["State"].ToString());
                }
            }
            if (!string.IsNullOrEmpty(dataRow["CountryOfBirth"].ToString()))
            {
                pdfFormFields.SetField("Province", dataRow["CountryOfBirth"].ToString());
            }
            string mailingAddress = dataRow["StreetAddress"].ToString();
            if (!string.IsNullOrEmpty(dataRow["Apartment"].ToString()))
            {
                mailingAddress += " , Apt# " + dataRow["Apartment"].ToString();
            }
            int mailingAddressLength = mailingAddress.Length;
            if (mailingAddressLength > 0)
            {
                if (mailingAddressLength > 0 && mailingAddressLength <= 21)
                {
                    pdfFormFields.SetField("MailingAddressLine1", mailingAddress.Substring(0, mailingAddressLength));
                }
                else if (mailingAddressLength > 21 && mailingAddressLength <= 42)
                {
                    pdfFormFields.SetField("MailingAddressLine1", mailingAddress.Substring(0, 21));
                    pdfFormFields.SetField("MailingAddressLine2", mailingAddress.Substring(21, mailingAddressLength - 21));
                }
                else if (mailingAddressLength > 42 && mailingAddressLength <= 63)
                {
                    pdfFormFields.SetField("MailingAddressLine1", mailingAddress.Substring(0, 21));
                    pdfFormFields.SetField("MailingAddressLine2", mailingAddress.Substring(21, 42));
                    pdfFormFields.SetField("MailingAddressLine3", mailingAddress.Substring(42, mailingAddressLength - 42));
                }
                else
                {
                    pdfFormFields.SetField("MailingAddressLine1", mailingAddress.Substring(0, 21));
                    pdfFormFields.SetField("MailingAddressLine2", mailingAddress.Substring(21, 42));
                    pdfFormFields.SetField("MailingAddressLine3", mailingAddress.Substring(42, mailingAddressLength));
                }
            }
            pdfFormFields.SetField("ApplicantsSignature", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("PermitteesName", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
        }
        [NonAction]
        public void FillNurseFormPdfFormFields(int applicantId, AcroFields pdfFormFields)
        {

            DataTable dtNurseForm = NurseFormManager.GetNurseDataTableByUserId(applicantId);
            DataRow dataRow = dtNurseForm.Rows[0];

            if (!string.IsNullOrEmpty(dataRow["ApplyingForJobType"].ToString()))
            {
                if (dataRow["ApplyingForJobType"].ToString() == "True")
                {
                    pdfFormFields.SetField("ApplyingForJobType", "RegisteredProfessionalNurse");
                }
                else
                {
                    pdfFormFields.SetField("ApplyingForJobType", "LicensedPracticalNurse");
                }
            }
            if (!string.IsNullOrEmpty(dataRow["ApplyingForPosition"].ToString()))
            {
                if (dataRow["ApplyingForPosition"].ToString() == "1")
                {
                    pdfFormFields.SetField("ApplyingForPosition", "OriginalPermit");
                }
                else if (dataRow["ApplyingForPosition"].ToString() == "2")
                {
                    pdfFormFields.SetField("ApplyingForPosition", "AdditionalSupervisor");
                }
                else if (dataRow["ApplyingForPosition"].ToString() == "3")
                {
                    pdfFormFields.SetField("ApplyingForPosition", "ChangeSupervisor");
                }
            }
            if (!string.IsNullOrEmpty(dataRow["LicensedJurisdiction"].ToString()))
            {
                if (dataRow["LicensedJurisdiction"].ToString() == "True")
                {
                    pdfFormFields.SetField("LicensedJurisdiction", "Yes");
                }
                else
                {
                    pdfFormFields.SetField("LicensedJurisdiction", "No");
                }
            }
            if (!string.IsNullOrEmpty(dataRow["FailedRNLicensing"].ToString()))
            {
                if (dataRow["FailedRNLicensing"].ToString() == "True")
                {
                    pdfFormFields.SetField("FailedRNLicensing", "Yes");
                }
                else
                {
                    pdfFormFields.SetField("FailedRNLicensing", "No");
                }
            }
            if (!string.IsNullOrEmpty(dataRow["FailedPNLicensing"].ToString()))
            {
                if (dataRow["FailedPNLicensing"].ToString() == "True")
                {
                    pdfFormFields.SetField("FailedPNLicensing", "Yes");
                }
                else
                {
                    pdfFormFields.SetField("FailedPNLicensing", "No");
                }
            }

            if (!string.IsNullOrEmpty(dataRow["CGFNSCertificateNumber"].ToString()))
            {
                pdfFormFields.SetField("CGFNS", "CGFNS");
            }
            if (!string.IsNullOrEmpty(dataRow["CNATSExamScore"].ToString()))
            {
                pdfFormFields.SetField("CGFNS", "CNATS");
            }
            if (!string.IsNullOrEmpty(dataRow["CGFNSExaminationDate"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dataRow["CGFNSExaminationDate"].ToString());
                pdfFormFields.SetField("CGFNSExaminationDateMonth", dateParts[0]);
                pdfFormFields.SetField("CGFNSExaminationDateDay", dateParts[1]);
                pdfFormFields.SetField("CGFNSExaminationDateYear", dateParts[2]);
            }
            pdfFormFields.SetField("CGFNSCertificateNumber", dataRow["CGFNSCertificateNumber"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["CNATSExaminationDate"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dataRow["CNATSExaminationDate"].ToString());
                pdfFormFields.SetField("CNATSExaminationDateMonth", dateParts[0]);
                pdfFormFields.SetField("CNATSExaminationDateDay", dateParts[1]);
                pdfFormFields.SetField("CNATSExaminationDateYear", dateParts[2]);
            }
            pdfFormFields.SetField("CNATSExamScore", dataRow["CNATSExamScore"].ToString().Trim());
            pdfFormFields.SetField("NursingSchoolAttended", dataRow["NursingSchoolAttended"].ToString().Trim());
            pdfFormFields.SetField("NursingSchoolAddress", dataRow["NursingSchoolAddress"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["NursingSchoolCompletedDate"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dataRow["NursingSchoolCompletedDate"].ToString());
                pdfFormFields.SetField("NursingSchoolCompletedDateMonth", dateParts[0]);
                pdfFormFields.SetField("NursingSchoolCompletedDateDay", dateParts[1]);
                pdfFormFields.SetField("NursingSchoolCompletedDateYear", dateParts[2]);
            }
            //pdfFormFields.SetField("PermitteesName", dataRow["PermitteesName"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["RNLPNEmployed"].ToString()))
            {
                if (dataRow["RNLPNEmployed"].ToString() == "RN")
                {
                    pdfFormFields.SetField("EmployedAs", "RN");
                }
                else if (dataRow["RNLPNEmployed"].ToString() == "LPN")
                {
                    pdfFormFields.SetField("EmployedAs", "LPN");
                }
            }
            pdfFormFields.SetField("EmployerName", dataRow["EmployerName"].ToString().Trim());
            pdfFormFields.SetField("EmployerStreetAddress", dataRow["EmployerStreetAddress"].ToString().Trim());
            pdfFormFields.SetField("EmployerCity", dataRow["EmployerCity"].ToString().Trim());
            pdfFormFields.SetField("EmployerStateProvince", dataRow["EmployerStateProvince"].ToString().Trim());
            pdfFormFields.SetField("EmployerZipCode", dataRow["EmployerZipCode"].ToString().Trim());
            pdfFormFields.SetField("EmployerCountry", dataRow["EmployerCountry"].ToString().Trim());
            pdfFormFields.SetField("EmployerTelephone", dataRow["EmployerTelephone"].ToString().Trim());
            pdfFormFields.SetField("EmployerFax", dataRow["EmployerFax"].ToString().Trim());
            pdfFormFields.SetField("EmployerEmail", dataRow["EmployerEmail"].ToString().Trim());

            pdfFormFields.SetField("PracticeName", dataRow["PracticeName"].ToString().Trim());
            pdfFormFields.SetField("PracticeStreetAddress", dataRow["PracticeStreetAddress"].ToString().Trim());
            pdfFormFields.SetField("PracticeCity", dataRow["PracticeCity"].ToString().Trim());
            pdfFormFields.SetField("PracticeStateProvince", dataRow["PracticeStateProvince"].ToString().Trim());
            pdfFormFields.SetField("PracticeZipCode", dataRow["PracticeZipCode"].ToString().Trim());
            pdfFormFields.SetField("PracticeCountry", dataRow["PracticeCountry"].ToString().Trim());
            pdfFormFields.SetField("PracticeTelephone", dataRow["PracticeTelephone"].ToString().Trim());
            pdfFormFields.SetField("PracticeFax", dataRow["PracticeFax"].ToString().Trim());
            pdfFormFields.SetField("PracticeEmail", dataRow["PracticeEmail"].ToString().Trim());

            pdfFormFields.SetField("RegisteredProfessionalNurse1", dataRow["RegisteredProfessionalNurse"].ToString().Trim());
            pdfFormFields.SetField("RegisteredProfessionalNurse2", dataRow["RegisteredProfessionalNurse"].ToString().Trim());
            pdfFormFields.SetField("NewYorkStateLicenseNumber1", dataRow["NewYorkStateLicenseNumber1"].ToString().Trim());
            pdfFormFields.SetField("NewYorkStateLicenseNumber2", dataRow["NewYorkStateLicenseNumber2"].ToString().Trim());
            pdfFormFields.SetField("SignatureBehalfEmployer", dataRow["SignatureBehalfEmployer"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["SignatureDate"].ToString()))
            {
                pdfFormFields.SetField("SignatureDate", Convert.ToDateTime(dataRow["SignatureDate"].ToString()).ToString("MM/dd/yyyy"));
            }
            pdfFormFields.SetField("PrintName", dataRow["PrintName"].ToString().Trim());
            pdfFormFields.SetField("Title", dataRow["Title"].ToString().Trim());
            pdfFormFields.SetField("NewYorkStateProfession", dataRow["NewYorkStateProfession"].ToString().Trim());
            pdfFormFields.SetField("NewYorkStateProfessionalLicenseNumber", dataRow["NewYorkStateProfessionalLicenseNumber"].ToString().Trim());
        }
    }
}
