using Microsoft.AspNetCore.Mvc;
using System.Data;
using iTextSharp.text.pdf;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-uscis")]
    [ApiController]
    public class USCISController : CustomControllerBase
    {
        public USCISController(ILogger<USCISController> logger) : base(logger)
        {
        }

        [Route("get/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserUSCISByUserId(int applicantId)
        {

            try
            {
                Usci userUSCI = USCISManager.GetByUserID(applicantId);
                USCISModel userUSCISModel = null;

                if (userUSCI != null)
                {
                    userUSCISModel = new USCISModel();
                    userUSCISModel.USCISID = userUSCI.Uscisid;
                    userUSCISModel.I94AdmissionNumber = userUSCI.I94admissionNumber;
                    userUSCISModel.USCISNumber = userUSCI.Uscisnumber;
                    base.MapObjects(userUSCI, userUSCISModel);
                }

                return Ok(userUSCISModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(USCISModel userUSCISModel)
        {

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                Usci userUSCI = new Usci();
                base.MapObjects(userUSCISModel, userUSCI);
                userUSCI.I94admissionNumber = userUSCISModel.I94AdmissionNumber;
                userUSCI.Uscisnumber = userUSCISModel.USCISNumber;
                userUSCI.UserId = userUSCISModel.UserID;
                userUSCI.Uscisid = userUSCISModel.USCISID;

                Usci isExist = USCISManager.GetByUserID(userUSCISModel.UserID);

                if (isExist == null)
                {
                    USCISManager.SaveUSCIS(userUSCI);
                    //UserManager.SendMailToRecruiterDBModified(base.GetCurrentUser().UserID, "USCIS");
                }
                else
                {
                    USCISManager.UpdateUSCIS(userUSCI);
                    //UserManager.SendMailToRecruiterDBModified(base.GetCurrentUser().UserID, "USCIS");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public IActionResult DeleteEmploymentByEmpId(long id)
        {
            try
            {
                var result = USCISManager.DeleteUSCIS(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("file/{applicantId}")]
        public IActionResult GetUSCISFileForCustomer(int applicantId)
        {
            string fileName = string.Empty;
            try
            {
                var file = GenerateUSCISFile(applicantId, out fileName);
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

        private byte[] GenerateUSCISFile(int applicantId, out string fileName)
        {
            byte[] data;
            int fileTypeCode = (int)EnumFileType.USCIS;
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

                FillUSCISFormFields(applicantId, pdfFormFields);

                pdfStamper.Close();
                data = outputStream.ToArray();
                bool result = false;
                DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFileByUserIdAndFileType(applicantId, ((int)EnumFileType.USCIS).ToString());
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

        [NonAction]
        private void FillUSCISRecuiterInfo(int applicantId, AcroFields pdfFormFields)
        {
            DataTable dtUsers = UserManager.GetUserDetailsByID(applicantId);
            pdfFormFields.SetField("Signature of Employer or Authorized Representative", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("First Name of Employer or Authorized Representative", GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("Last Name of Employer or Authorized Representative", GetApplicantLastName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("Todays Date mmddyyyy_3", DateTime.Today.ToString("MM/dd/yyyy"));

            pdfFormFields.SetField("Signature of Employer or Authorized Representative_2", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("Todays Date mmddyyyy_4", DateTime.Today.ToString("MM/dd/yyyy"));
            pdfFormFields.SetField("Name of Employer or Authorized Representative", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));

            pdfFormFields.SetField("Employers Business or Organization Name", "Universal Medical Record");
            pdfFormFields.SetField("Employers Business or Organization Address Street Number and Name", "22 The Cross Road");
            pdfFormFields.SetField("City or Town_3", "Cortlandt Manor");
            pdfFormFields.SetField("State_3", "New York");
            pdfFormFields.SetField("ZIP Code_3", "10567");
        }

        [NonAction]
        private void FillUSCISApplicantInfo(int applicantId, AcroFields pdfFormFields)
        {
            //DataTable dt = ApplicantManager.GetSingleApplicant(applicantID);
            DataTable dt = UserManager.GetUserDetailsByID(applicantId);
            pdfFormFields.SetField("Last Name Family Name", GetApplicantLastName(UserManager.GetUserDetailsByID(applicantId)));
            pdfFormFields.SetField("First Name Given Name", GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
            //pdfFormFields.SetField("Middle Initial", GetApplicantMiddleName());
            //pdfFormFields.SetField("Date", DateTime.Today.ToString("MM/dd/yyyy"));
            //pdfFormFields.SetField("Signature", dt.Rows[0]["ApplicantName"].ToString().Trim());
            //pdfFormFields.SetField("Date_2", DateTime.Today.ToString("MM/dd/yyyy"));
            pdfFormFields.SetField("Address Street Number and Name", dt.Rows[0]["StreetAddress"].ToString().Trim());
            pdfFormFields.SetField("Apt Number", dt.Rows[0]["Apartment"].ToString().Trim());
            pdfFormFields.SetField("City or Town", dt.Rows[0]["City"].ToString().Trim());
            if (!string.IsNullOrEmpty(dt.Rows[0]["State"].ToString()))
            {
                DataTable dataTable = ZipCodeManager.GetStateCodeByStateName(dt.Rows[0]["State"].ToString());
                if (dataTable != null && dataTable.Rows.Count > 0)
                {
                    pdfFormFields.SetField("State", dataTable.Rows[0]["SateCode"].ToString());
                }
                else
                {
                    pdfFormFields.SetField("State", dt.Rows[0]["State"].ToString());
                }
            }
            pdfFormFields.SetField("ZIP Code", dt.Rows[0]["ZipCode"].ToString().Trim());

            if (!string.IsNullOrEmpty(dt.Rows[0]["DateOfBirth"].ToString()))
            {
                var birthDate = Convert.ToDateTime(dt.Rows[0]["DateOfBirth"].ToString().Trim()).ToString("MM/dd/yyyy");
                pdfFormFields.SetField("Date of Birth mmddyyyy", birthDate);
            }
            pdfFormFields.SetField("Employees Telephone Number", dt.Rows[0]["Phone"].ToString());
            pdfFormFields.SetField("Employees Email Address", dt.Rows[0]["Email"].ToString());
            //DataTable dtPhones = ApplicantManager.GetApplicantPhones(applicantID);
            //if (dtPhones != null && dtPhones.Rows.Count > 0)
            //{
            //    string phone = dtPhones.Rows[0].Field<string>("PhoneNumber");

            //    if (phone.Length > 3)
            //    {
            //        pdfFormFields.SetField("Employees Telephone Number", phone);
            //    }
            //}

            //DataTable dtemail = ApplicantManager.GetApplicantEmails(applicantID);
            //if (dtemail != null && dtemail.Rows.Count > 0)
            //{
            //    pdfFormFields.SetField("Employees Email Address", dtemail.Rows[0].Field<string>("EmailAddress").ToString().Trim());
            //}


            //pdfFormFields.SetField("DateAvailable", dt.Rows[0]["ApplicantName"].ToString().Trim());
            //int ssnType = -1;
            //if (dt.Rows[0]["SSNType"] != null && dt.Rows[0]["SSNType"] != DBNull.Value)
            //{
            //    Int32.TryParse(dt.Rows[0]["SSNType"].ToString().Trim(), out ssnType);
            //}
            //if (dt.Rows[0]["SSN"] != null && dt.Rows[0]["SSN"] != DBNull.Value && ssnType == (int)SSNType.SSN)
            //{
            if (dt.Rows[0]["ssn"].ToString() != "" && dt.Rows[0]["ssn"].ToString().Length > 0 && dt.Rows[0]["ssn"].ToString().Length <= 3)
            {
                pdfFormFields.SetField("SSNP1", dt.Rows[0]["ssn"].ToString());
            }
            if (dt.Rows[0]["ssn"].ToString().Length > 3 && dt.Rows[0]["ssn"].ToString().Length <= 5)
            {
                pdfFormFields.SetField("SSNP1", dt.Rows[0]["ssn"].ToString().Substring(0, 3));
                pdfFormFields.SetField("SSNP2", dt.Rows[0]["ssn"].ToString().Substring(3));
            }
            if (dt.Rows[0]["ssn"].ToString().Length > 5)
            {
                pdfFormFields.SetField("SSNP1", dt.Rows[0]["ssn"].ToString().Substring(0, 3));
                pdfFormFields.SetField("SSNP2", dt.Rows[0]["ssn"].ToString().Substring(3, 2));
                pdfFormFields.SetField("SSNP3", dt.Rows[0]["ssn"].ToString().Substring(5));
            }
            //}
            if (dt.Rows[0]["IsUSCitizen"] != null && dt.Rows[0]["IsUSCitizen"] != DBNull.Value)
            {
                bool isUSCitizen = Convert.ToBoolean(dt.Rows[0]["IsUSCitizen"].ToString());
                if (isUSCitizen)
                {
                    pdfFormFields.SetField("undefined", "On");
                }
            }
            //DataTable dtVisaType = VisaStatusManager.GetVisaTypeByName("Citizen");
            //if (dt.Rows[0]["VisaStatusId"] != null && dt.Rows[0]["VisaStatusId"] != DBNull.Value)
            //{
            //    string isAuthorised = dt.Rows[0]["VisaStatusId"].ToString();

            //    if (dtVisaType != null && dtVisaType.Rows.Count > 0)
            //    {
            //        string citizenVisaType = dtVisaType.Rows[0]["ID"].ToString();
            //        if (isAuthorised == citizenVisaType)
            //        {
            //            pdfFormFields.SetField("undefined", "On");
            //        }
            //    }
            //}

            //if (dt.Rows[0]["IsAuthorized"] != null && dt.Rows[0]["IsAuthorized"] != DBNull.Value)
            //{
            //    IsAuthorised = Convert.ToBoolean(dt.Rows[0]["IsAuthorized"].ToString());
            //}
        }
        [NonAction]
        private void FillUSCISINfo(int applicantId, AcroFields pdfFormFields)
        {
            DataTable dtUSCIS = USCISManager.GetUSCISUserID(applicantId);
            //DataTable dtBasic = ApplicantManager.GetSingleApplicant(applicantID);
            DataTable dtBasic = UserManager.GetUserDetailsByID(applicantId);
            if (dtUSCIS.Rows.Count > 0)
            {
                DataRow dataUSCIS = dtUSCIS.Rows[0];
                DataRow drBasic = dtBasic.Rows[0];

                if (dataUSCIS["IsNonCitizen"] != null && dataUSCIS["IsNonCitizen"] != DBNull.Value)
                {
                    bool isNonCitizen = Convert.ToBoolean(dataUSCIS["IsNonCitizen"].ToString());

                    if (isNonCitizen)
                    {
                        pdfFormFields.SetField("undefined_2", "On");
                    }
                }

                if (dataUSCIS["IsLawFullPermanent"] != null && dataUSCIS["IsLawFullPermanent"] != DBNull.Value)
                {
                    bool isLawFullPermanent = Convert.ToBoolean(dataUSCIS["IsLawFullPermanent"].ToString());

                    if (isLawFullPermanent)
                    {
                        pdfFormFields.SetField("undefined_3", "On");
                    }

                    if (isLawFullPermanent && dataUSCIS["USCISNumber"] != null && dataUSCIS["USCISNumber"] != DBNull.Value && !String.IsNullOrEmpty(dataUSCIS["USCISNumber"].ToString().Trim()))
                    {
                        pdfFormFields.SetField("3 A lawful permanent resident Alien Registration NumberUSCISNumber", dataUSCIS["USCISNumber"].ToString().Trim());
                    }
                }

                if (drBasic["IsAuthorized"] != null && drBasic["IsAuthorized"] != DBNull.Value)
                {
                    bool isAuthorised = Convert.ToBoolean(drBasic["IsAuthorized"].ToString());
                    if (isAuthorised)
                    {
                        pdfFormFields.SetField("undefined_4", "On");
                        pdfFormFields.SetField("1 Alien Registration NumberUSCISNumber", dataUSCIS["USCISNumber"].ToString().Trim());
                        pdfFormFields.SetField("2 Form I94 Admission Number", dataUSCIS["I94AdmissionNumber"].ToString().Trim());
                        pdfFormFields.SetField("undefined_5", dataUSCIS["ForeignPassort"].ToString().Trim());
                        if (drBasic["CountryOfBirth"] != DBNull.Value)
                        {
                            pdfFormFields.SetField("Number Country of", drBasic["CountryOfBirth"].ToString().Trim());
                        }
                    }
                }

                pdfFormFields.SetField("Signature of Employee", GetApplicantName(UserManager.GetUserDetailsByID(applicantId)));
                pdfFormFields.SetField("Todays Date mmddyyyy", DateTime.Today.ToString("MM/dd/yyyy"));

                if (dataUSCIS["TranslatorFirstName"] != null && dataUSCIS["TranslatorFirstName"] != DBNull.Value && !String.IsNullOrEmpty(dataUSCIS["TranslatorFirstName"].ToString().Trim()))
                {
                    pdfFormFields.SetField("A preparers andor translators assisted the employee in completing Section 1", "On");

                    pdfFormFields.SetField("Signature of Preparer or Translator", dataUSCIS["TranslatorFirstName"].ToString().Trim() + " " + dataUSCIS["TranslatorLastName"].ToString().Trim());
                    pdfFormFields.SetField("Todays Date mmddyyyy_2", DateTime.Today.ToString("MM/dd/yyyy"));
                    pdfFormFields.SetField("Last Name Family Name_2", dataUSCIS["TranslatorLastName"].ToString().Trim());
                    pdfFormFields.SetField("First Name Given Name_2", dataUSCIS["TranslatorFirstName"].ToString().Trim());
                    pdfFormFields.SetField("Address Street Number and Name_2", dataUSCIS["StreetAddress"].ToString().Trim());
                    pdfFormFields.SetField("City or Town_2", dataUSCIS["City"].ToString().Trim());
                    pdfFormFields.SetField("State_2", dataUSCIS["StateName"].ToString().Trim());
                    pdfFormFields.SetField("ZIP Code_2", dataUSCIS["ZipCode"].ToString().Trim());
                }
                else
                {
                    pdfFormFields.SetField("Preparer andor Translator Certification check one", "On");
                }

                pdfFormFields.SetField("Last Name Family Name_3", GetApplicantLastName(UserManager.GetUserDetailsByID(applicantId)));
                pdfFormFields.SetField("First Name Given Name_3", GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
                //pdfFormFields.SetField("MI", GetApplicantMiddleName());
                if (drBasic["IsUSCitizen"] != null && drBasic["IsUSCitizen"] != DBNull.Value)
                {
                    bool isUSCitizen = Convert.ToBoolean(drBasic["IsUSCitizen"].ToString());
                    if (isUSCitizen)
                    {
                        pdfFormFields.SetField("CitizenshipImmigration Status", "Citizen");
                    }
                }
                //if (drBasic["VisaStatusId"] != null && drBasic["VisaStatusId"] != DBNull.Value)
                //{
                //    int visaID = Int32.Parse(drBasic["VisaStatusId"].ToString());
                //    DataTable dtVisa = VisaStatusManager.GetVisaTypeByID(visaID);
                //    if (dtVisa.Rows[0]["VisaType"] != null && dtVisa.Rows[0]["VisaType"] != DBNull.Value)
                //    {
                //        pdfFormFields.SetField("CitizenshipImmigration Status", dtVisa.Rows[0]["VisaType"].ToString());
                //    }
                //}

                pdfFormFields.SetField("Additional Information", dataUSCIS["AdditionalInformation"].ToString().Trim());

                if (dataUSCIS["DocumentTitle"] != null && dataUSCIS["DocumentTitle"] != DBNull.Value && !String.IsNullOrEmpty(dataUSCIS["DocumentTitle"].ToString().Trim()))
                {
                    pdfFormFields.SetField("Last Name Family Name_4", GetApplicantLastName(UserManager.GetUserDetailsByID(applicantId)));
                    pdfFormFields.SetField("First Name Given Name_4", GetApplicantFirstName(UserManager.GetUserDetailsByID(applicantId)));
                    //pdfFormFields.SetField("Middle Initial_2", GetApplicantMiddleName());
                    pdfFormFields.SetField("Date mmddyyyy", DateTime.Today.ToString("MM/dd/yyyy"));

                    if (!string.IsNullOrEmpty(dataUSCIS["ExpirationDate"].ToString()))
                    {
                        var rehireExpirationDate = Convert.ToDateTime(dataUSCIS["ExpirationDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                        pdfFormFields.SetField("Expiration Date if any mmddyyyy_6", rehireExpirationDate);
                    }
                    pdfFormFields.SetField("Document Title_6", dataUSCIS["DocumentTitle"].ToString().Trim());
                    pdfFormFields.SetField("Document Number_6", dataUSCIS["DocumentNumber"].ToString().Trim());
                }

                if (!string.IsNullOrEmpty(dataUSCIS["EmploymentDate"].ToString()))
                {
                    var employmentDate = Convert.ToDateTime(dataUSCIS["EmploymentDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                    pdfFormFields.SetField("See instructions for exemptions", employmentDate);
                }

            }
        }
        [NonAction]
        private void FillUSCISIdentificationInfo(int applicantId, AcroFields pdfFormFields)
        {
            //DataTable dt = ApplicantManager.GetApplicantIdentifications();
            DataTable dt = UserLicenseManager.GetUserLicenseDataTableByUserId(applicantId);
            if (dt != null && dt.Rows.Count > 0)
            {
                int counter = 0;
                foreach (DataRow item in dt.Rows)
                {
                    if (counter == 5)
                    {
                        break;
                    }
                    if (counter == 0)
                    {
                        if (!string.IsNullOrEmpty(item["LicenseNameA"].ToString()))
                        {
                            pdfFormFields.SetField("Document Title", item["LicenseNameA"].ToString().Trim());
                        }
                        else
                        {
                            pdfFormFields.SetField("Document Title", item["LicenseNameB"].ToString().Trim());
                        }
                        pdfFormFields.SetField("Issuing Authority", item["IssueAuthority"].ToString().Trim());
                        pdfFormFields.SetField("Document Number", item["LicenseNo"].ToString().Trim());
                        if (!string.IsNullOrEmpty(item["ExpiryDate"].ToString()))
                        {
                            var expiresDate = Convert.ToDateTime(item["ExpiryDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Expiration Date if any mmddyyyy", expiresDate);
                        }
                    }
                    else if (counter == 1)
                    {
                        if (!string.IsNullOrEmpty(item["LicenseNameA"].ToString()))
                        {
                            pdfFormFields.SetField("Document Title_2", item["LicenseNameA"].ToString().Trim());
                        }
                        else
                        {
                            pdfFormFields.SetField("Document Title_2", item["LicenseNameB"].ToString().Trim());
                        }
                        //pdfFormFields.SetField("Document Title_2", item["LicenseName"].ToString().Trim());
                        pdfFormFields.SetField("Issuing Authority_2", item["IssueAuthority"].ToString().Trim());
                        pdfFormFields.SetField("Document Number_2", item["LicenseNo"].ToString().Trim());
                        if (!string.IsNullOrEmpty(item["ExpiryDate"].ToString()))
                        {
                            var expiresDate = Convert.ToDateTime(item["ExpiryDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Expiration Date if any mmddyyyy_2", expiresDate);
                        }
                    }
                    else if (counter == 2)
                    {
                        if (!string.IsNullOrEmpty(item["LicenseNameA"].ToString()))
                        {
                            pdfFormFields.SetField("Document Title_3", item["LicenseNameA"].ToString().Trim());
                        }
                        else
                        {
                            pdfFormFields.SetField("Document Title_3", item["LicenseNameB"].ToString().Trim());
                        }
                        //pdfFormFields.SetField("Document Title_3", item["LicenseName"].ToString().Trim());
                        pdfFormFields.SetField("Issuing Authority_3", item["IssueAuthority"].ToString().Trim());
                        pdfFormFields.SetField("Document Number_3", item["LicenseNo"].ToString().Trim());
                        if (!string.IsNullOrEmpty(item["ExpiryDate"].ToString()))
                        {
                            var expiresDate = Convert.ToDateTime(item["ExpiryDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Expiration Date if any mmddyyyy_3", expiresDate);
                        }
                    }
                    else if (counter == 3)
                    {
                        if (!string.IsNullOrEmpty(item["LicenseNameA"].ToString()))
                        {
                            pdfFormFields.SetField("Document Title_4", item["LicenseNameA"].ToString().Trim());
                        }
                        else
                        {
                            pdfFormFields.SetField("Document Title_4", item["LicenseNameB"].ToString().Trim());
                        }
                        //pdfFormFields.SetField("Document Title_4", item["LicenseName"].ToString().Trim());
                        pdfFormFields.SetField("Issuing Authority_4", item["IssueAuthority"].ToString().Trim());
                        pdfFormFields.SetField("Document Number_4", item["LicenseNo"].ToString().Trim());
                        if (!string.IsNullOrEmpty(item["ExpiryDate"].ToString()))
                        {
                            var expiresDate = Convert.ToDateTime(item["ExpiryDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Expiration Date if any mmddyyyy_4", expiresDate);
                        }
                    }
                    else if (counter == 4)
                    {
                        if (!string.IsNullOrEmpty(item["LicenseNameA"].ToString()))
                        {
                            pdfFormFields.SetField("Document Title_5", item["LicenseNameA"].ToString().Trim());
                        }
                        else
                        {
                            pdfFormFields.SetField("Document Title_5", item["LicenseNameB"].ToString().Trim());
                        }
                        //pdfFormFields.SetField("Document Title_5", item["LicenseName"].ToString().Trim());
                        pdfFormFields.SetField("Issuing Authority_5", item["IssueAuthority"].ToString().Trim());
                        pdfFormFields.SetField("Document Number_5", item["LicenseNo"].ToString().Trim());
                        if (!string.IsNullOrEmpty(item["ExpiryDate"].ToString()))
                        {
                            var expiresDate = Convert.ToDateTime(item["ExpiryDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Expiration Date if any mmddyyyy_5", expiresDate);
                        }
                    }

                    counter++;
                }
            }
        }
        [NonAction]
        public void FillUSCISFormFields(int applicantId, AcroFields pdfFormFields)
        {
            FillUSCISApplicantInfo(applicantId, pdfFormFields);
            FillUSCISINfo(applicantId, pdfFormFields);
            FillUSCISIdentificationInfo(applicantId, pdfFormFields);
            FillUSCISRecuiterInfo(applicantId, pdfFormFields);
        }
    }
}
