using System.Data;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RecruiterPortal.API.Controllers;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/applicant-info")]
    [ApiController]
    public class ApplicantInfoController : CustomControllerBase
    {
        public ApplicantInfoController(ILogger<ApplicantInfoController> logger) : base(logger)
        {
        }

        [Route("get-all-applicant")]
        [HttpPost]
        public IActionResult GetAllApplicant(ApplicantSearchModel applicantSearchModel)
        {
            try
            {
                DataSet data = UserManager.GetAllUserByFilter(applicantSearchModel);
                List<ApplicantInfoModel> appModelList = new List<ApplicantInfoModel>();
                int applicantCount = 0;

                if (data != null)
                {
                    DataTable dataTable = data.Tables[1];
                    DataTable rowCountTable = data.Tables[0];
                    if (rowCountTable != null && rowCountTable.Rows.Count > 0)
                    {
                        applicantCount = Convert.ToInt32(rowCountTable.Rows[0]["RowNumber"]);
                    }

                    foreach (DataRow oRow in dataTable.Rows)
                    {
                        ApplicantInfoModel userReferenceModel = new ApplicantInfoModel();
                        userReferenceModel.Email = oRow["Email"].ToString(); ;
                        userReferenceModel.FirstName = oRow["First_Name"].ToString();
                        userReferenceModel.LastName = oRow["Last_Name"].ToString();
                        userReferenceModel.UserId = Convert.ToInt32(oRow["UserID"].ToString());
                        appModelList.Add(userReferenceModel);
                    }
                }
                return Ok(new { applicants = appModelList, totalApplicants = applicantCount });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Registration(User user)
        {
            try
            {
                user.IsVerified = false;
                int userId = UserManager.AddApplicant(user);

                return Ok(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }
        [Route("{email}")]
        [HttpGet]
        public IActionResult GetUserByEmail(string email)
        {
            try
            {
                return Ok(UserManager.GetUserByEmail(email));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex);
            }
        }

        [Route("get-applicant-email")]
        [HttpGet]
        public IActionResult GetApplicantEmail(string email)
        {
            try
            {
                DataTable dataTable = UserManager.GetUserEmail(email);
                List<string> emailList = new List<string>();
                foreach (DataRow dr in dataTable.Rows)
                {
                    emailList.Add(dr["Email"].ToString());
                }
                return Ok(emailList.ToArray());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-applicant-firstname")]
        [HttpGet]
        public IActionResult GetApplicantFirstName(string firstName)
        {
            try
            {
                DataTable dataTable = UserManager.GetUserFirstName(firstName);
                List<string> userList = new List<string>();
                foreach (DataRow dr in dataTable.Rows)
                {
                    userList.Add(dr["First_Name"].ToString());
                }
                return Ok(userList.ToArray());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
        [Route("get-applicant-lastname")]
        [HttpGet]
        public IActionResult GetApplicantLastName(string laseName)
        {
            try
            {
                DataTable dataTable = UserManager.GetUserLastName(laseName);
                List<string> userList = new List<string>();
                foreach (DataRow dr in dataTable.Rows)
                {
                    userList.Add(dr["Last_Name"].ToString());
                }
                return Ok(userList.ToArray());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("details/{applicantId}")]
        [HttpGet]
        public IActionResult GetApplicantInfoById(int applicantId)
        {
            try
            {
                DataTable dt = UserManager.GetUserDetailsByID(applicantId);
                string jsonString = JsonConvert.SerializeObject(dt, new JsonSerializerSettings { ContractResolver = null });

                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("update")]
        [HttpPut]
        public IActionResult UpdateEducationInfo(ApplicantInfoModel applicantInfoModel)
        {
            try
            {
                var currentUser = base.GetCurrentUser();
                UserManager.SaveUserDetails(applicantInfoModel.UserId, applicantInfoModel);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("country-name")]
        [HttpGet]
        public IActionResult GetCountryName(string text)
        {
            try
            {
                IEnumerable<Country> countries = CountryManager.GetCountryName(text);
                return Ok(countries);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("race")]
        [HttpGet]
        public IActionResult GetAllRace()
        {
            try
            {
                IEnumerable<Race> races = RaceManager.GetRace();
                List<string> raceList = new List<string>();
                foreach (Race race in races)
                {
                    raceList.Add(race.Race1);
                }
                return Ok(raceList.ToArray());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("eye-color")]
        [HttpGet]
        public IActionResult GetAllEyeColor()
        {
            try
            {
                IEnumerable<EyeColor> eyeColors = EyeColorManager.GetEyeColor();
                List<string> eyeColorList = new List<string>();
                foreach (EyeColor eyeColor in eyeColors)
                {
                    eyeColorList.Add(eyeColor.EyeColor1);
                }
                return Ok(eyeColorList.ToArray());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
        [Route("hair-color")]
        [HttpGet]
        public IActionResult GetAllHairColor()
        {
            try
            {
                IEnumerable<HairColor> hairColors = HairColorManager.GetHairColor();
                List<string> hairColorList = new List<string>();
                foreach (HairColor race in hairColors)
                {
                    hairColorList.Add(race.HairColor1);
                }
                return Ok(hairColorList.ToArray());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("zipcode-city-state")]
        [HttpGet]
        public IActionResult GetZipCodeCityStateByZipCode(string zipCode)
        {
            try
            {
                IEnumerable<ViewLookUpZipCode> zipcodes = ZipCodeManager.GetZipCodeCityStateByZipCode(zipCode);
                return Ok(zipcodes);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("issuing-authority")]
        [HttpGet]
        public IActionResult GetIssueingAuthorityByText(string text)
        {
            try
            {
                string filterText = string.Empty;
                if (string.IsNullOrEmpty(text)) 
                {
                    filterText = "AllIssueAuthority";
                }

                IEnumerable<ViewIssuingAuthority> issueAuthorities = ZipCodeManager.GetIssueingAuthorityByText(filterText);
                return Ok(issueAuthorities);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet]
        [Route("file/{applicantId}")]
        public IActionResult GetFileForEmploynentApplication(int applicantId)
        {
            try
            {
                string fileName = string.Empty;
                var file = GenerateEAFile(applicantId, out fileName);

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

        private byte[] GenerateEAFile(int applicantId, out string fileName)
        {
            byte[] data;
            int fileTypeCode = (int)EnumFileType.EmploymentApplication;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());
            //DataTable data = HepaBHIPPAManager.GetHepaBHIPPAByApplicantID(ApplicantID);

            if (dtPdfTemplate != null && dtPdfTemplate.Rows.Count > 0)
            {
                long pdfTermplateId = Convert.ToInt64(dtPdfTemplate.Rows[0]["TermplateID"].ToString());
                byte[] temlateFileData = dtPdfTemplate.Rows[0]["FileData"] as byte[];
                string templateFIleName = dtPdfTemplate.Rows[0]["FIleName"].ToString();
                templateFIleName = templateFIleName.Substring(0, templateFIleName.LastIndexOf('.'));
                fileName = $"{templateFIleName.Replace(' ', '_')}_{GetApplicantFirstName()}_{DateTime.Now.ToString("MMddyyyyHHmmss")}.pdf";
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


                FillPdfFormFieldsEA(applicantId, pdfFormFields);


                pdfStamper.Close();
                data = outputStream.ToArray();
                bool result = false;
                DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFileByUserIdAndFileType(applicantId, fileTypeCode.ToString());
                if (dtGeneratedFile != null && dtGeneratedFile.Rows.Count > 0)
                {
                    long generatedFileId = Convert.ToInt64(dtGeneratedFile.Rows[0]["GeneratedFileID"].ToString());
                    result = UpdateGeneratedFile(pdfTermplateId, data, templateFIleName, generatedFileId, applicantId, fileTypeCode);
                }
                else
                {
                    int generatedFileId;
                    result = AddGeneratedFile(pdfTermplateId, data, templateFIleName, applicantId, fileTypeCode);
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
        private void FillPdfFormFieldsEA(int applicantId, AcroFields pdfFormFields)
        {
            FillPdfFormFieldsEABasic(applicantId, pdfFormFields);
            FillPdfFormFieldsEAEducation(applicantId, pdfFormFields);
            FillPdfFormFieldsEARef(applicantId, pdfFormFields);
            FillPdfFormFieldsEAWorkHistory(applicantId, pdfFormFields);
            FillPdfFormFieldsEAMilitery(applicantId, pdfFormFields);
        }

        [NonAction]
        private void FillPdfFormFieldsEABasic(int applicantId, AcroFields pdfFormFields)
        {
            // DataTable dt = ApplicantManager.GetSingleApplicant(applicantID);
            DataTable dt = UserManager.GetUserDetailsByID(applicantId);
            pdfFormFields.SetField("Full Name", GetApplicantName());
            pdfFormFields.SetField("Date", DateTime.Today.ToString("MM/dd/yyyy"));
            pdfFormFields.SetField("Signature", GetApplicantName());
            pdfFormFields.SetField("Date_2", DateTime.Today.ToString("MM/dd/yyyy"));
            string apartment = string.Empty;
            if (!string.IsNullOrEmpty(dt.Rows[0]["Apartment"].ToString()))
            {
                apartment = " Apt# " + dt.Rows[0]["Apartment"].ToString().Trim();
            }
            pdfFormFields.SetField("StreetAndApartment", dt.Rows[0]["StreetAddress"].ToString().Trim() + apartment);
            pdfFormFields.SetField("CityStateZip", dt.Rows[0]["City"].ToString().Trim() + "," + dt.Rows[0]["State"].ToString().Trim() + " " + dt.Rows[0]["ZipCode"].ToString().Trim());

            //DataTable dtPhones = ApplicantManager.GetApplicantPhones(applicantID);
            if (!string.IsNullOrEmpty(dt.Rows[0]["Phone"].ToString()))
            {
                string phone = dt.Rows[0]["Phone"].ToString();

                if (phone.Length > 3)
                {
                    pdfFormFields.SetField("PhonePt1", phone.Substring(0, 3));
                    pdfFormFields.SetField("PhonePt2", phone.Substring(3));
                }
                else
                {

                    pdfFormFields.SetField("PhonePt1", phone);
                }
                //lblMobile.Text = Utility.GetPhoneNumber(dtPhones, ApplicantTelephoneType.MobileCell, Utility.PhoneFormat);
            }

            //DataTable dtemail = ApplicantManager.GetApplicantEmails(applicantID);
            //if (dtemail != null && dtemail.Rows.Count > 0)
            //{
            pdfFormFields.SetField("ApplicantEmail", dt.Rows[0]["Email"].ToString());
            //}


            //pdfFormFields.SetField("DateAvailable", dt.Rows[0]["ApplicantName"].ToString().Trim());
            //int ssnType = -1;
            //if (dt.Rows[0]["SSNType"] != null && dt.Rows[0]["SSNType"] != DBNull.Value)
            //{
            //    Int32.TryParse(dt.Rows[0]["SSNType"].ToString().Trim(), out ssnType);
            //}
            if (dt.Rows[0]["ssn"] != null && dt.Rows[0]["ssn"] != DBNull.Value)
            {
                pdfFormFields.SetField("SocialSecurity", dt.Rows[0]["ssn"].ToString().Trim());
            }

            pdfFormFields.SetField("DesiredSalary", dt.Rows[0]["DesiredSalary"].ToString().Trim());
            //int desiredPositionId;
            if (dt.Rows[0]["PositionAppliedFor"] != null)
            {
                //DataTable dtPosi = PositionManager.GetPosition(desiredPositionId);
                //if (dtPosi != null && dtPosi.Rows.Count > 0)
                //{
                pdfFormFields.SetField("Position Applied For", dt.Rows[0]["PositionAppliedFor"].ToString().Trim());
                //}
            }


            //DataTable dtVisaType = VisaStatusManager.GetVisaTypeByName("Citizen");
            if (dt.Rows[0]["IsUSCitizen"] != null && dt.Rows[0]["IsUSCitizen"] != DBNull.Value)
            {
                bool isAuthorised = Convert.ToBoolean(dt.Rows[0]["IsUSCitizen"].ToString());
                if (isAuthorised)
                {
                    pdfFormFields.SetField("UsCitizenYes", "On");
                }
                else
                {
                    pdfFormFields.SetField("UsCitizenNo", "On");
                }
                //}
                //else
                //{
                //    pdfFormFields.SetField("UsCitizenNo", "On");
                //}
            }

            if (dt.Rows[0]["IsAuthorized"] != null && dt.Rows[0]["IsAuthorized"] != DBNull.Value)
            {
                bool isAuthorised = Convert.ToBoolean(dt.Rows[0]["IsAuthorized"].ToString());

                if (isAuthorised)
                {
                    pdfFormFields.SetField("WorkAuthYes", "On");
                }
                else
                {
                    pdfFormFields.SetField("WorkAuthNo", "On");
                }
            }
            if (dt.Rows[0]["IsOldClient"] != null && dt.Rows[0]["IsOldClient"] != DBNull.Value)
            {
                bool isAuthorised = Convert.ToBoolean(dt.Rows[0]["IsOldClient"].ToString());

                if (isAuthorised)
                {
                    pdfFormFields.SetField("WorkedBeforeYes", "On");
                }
                else
                {
                    pdfFormFields.SetField("WorkedBeforeNo", "On");
                }
            }
            if (dt.Rows[0]["IsConvict"] != null && dt.Rows[0]["IsConvict"] != DBNull.Value)
            {
                bool isConvict = Convert.ToBoolean(dt.Rows[0]["IsConvict"].ToString());
                if (isConvict)
                {
                    pdfFormFields.SetField("FelonYes", "On");
                    pdfFormFields.SetField("FelonyName", (dt.Rows[0]["ConvictionDetail"] != null && dt.Rows[0]["ConvictionDetail"] != DBNull.Value) ? dt.Rows[0]["ConvictionDetail"].ToString() : string.Empty);
                }
                else
                {
                    pdfFormFields.SetField("FelonNo", "On");
                }
            }

        }
        [NonAction]
        private void FillPdfFormFieldsEAEducation(int applicantId, AcroFields pdfFormFields)
        {
            DataTable dt = EducationManager.GetEducationByUserIDandInstitutionType(applicantId, Convert.ToInt32(EnumEducationInstitutionType.HighSchool));

            //DataTable dt = ApplicantManager.GetApplicantEducations(applicantID, GetEnumDescription(EnumEducationInstitutionType.HighSchool));
            if (dt != null && dt.Rows.Count > 0)
            {
                pdfFormFields.SetField("HighSchoolName", dt.Rows[0]["SchoolName"].ToString().Trim());
                //pdfFormFields.SetField("HighSchoolAddress", dt.Rows[0]["ApplicantName"].ToString().Trim());
                if (!string.IsNullOrEmpty(dt.Rows[0]["FromDate"].ToString()))
                {
                    var signatureDate = new DateTime(Convert.ToInt32(dt.Rows[0]["FromDate"].ToString()), 1, 1);
                    //var signatureDate = Convert.ToDateTime(dt.Rows[0]["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                    pdfFormFields.SetField("HighSchoolFrom", signatureDate.ToString());
                }
                if (!string.IsNullOrEmpty(dt.Rows[0]["ToDate"].ToString()))
                {
                    var signatureDate = new DateTime(Convert.ToInt32(dt.Rows[0]["ToDate"].ToString()), 12, 31);
                    //var signatureDate = Convert.ToDateTime(dt.Rows[0]["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                    pdfFormFields.SetField("HighSchoolTo", signatureDate.ToString());
                }
                //pdfFormFields.SetField("HighSchoolFrom", dt.Rows[0]["ApplicantName"].ToString().Trim());
                //pdfFormFields.SetField("HighSchoolTo", dt.Rows[0]["ApplicantName"].ToString().Trim());
                if (dt.Rows[0]["IsGraduate"] != null && dt.Rows[0]["IsGraduate"] != DBNull.Value)
                {
                    bool isGraduate = Convert.ToBoolean(dt.Rows[0]["IsGraduate"].ToString());

                    if (isGraduate)
                    {
                        pdfFormFields.SetField("HighSchoolGradYes", "On");
                    }
                    else
                    {
                        pdfFormFields.SetField("HighSchoolGradNo", "On");
                    }
                }
                //pdfFormFields.SetField("HighSchoolGradYes", dt.Rows[0]["ApplicantName"].ToString().Trim());
                //pdfFormFields.SetField("HighSchoolGradNo", dt.Rows[0]["ApplicantName"].ToString().Trim());
                pdfFormFields.SetField("HighSchoolDegree", dt.Rows[0]["Degree"].ToString().Trim());
            }

            //dt = ApplicantManager.GetApplicantEducations(applicantID, GetEnumDescription(EnumEducationInstitutionType.College));
            dt = EducationManager.GetEducationByUserIDandInstitutionType(applicantId, Convert.ToInt32(EnumEducationInstitutionType.College));
            if (dt != null && dt.Rows.Count > 0)
            {
                pdfFormFields.SetField("CollegeName", dt.Rows[0]["SchoolName"].ToString().Trim());
                //pdfFormFields.SetField("CollegeAddress", dt.Rows[0]["ApplicantName"].ToString().Trim());
                if (!string.IsNullOrEmpty(dt.Rows[0]["FromDate"].ToString()))
                {
                    var fromDate = new DateTime(Convert.ToInt32(dt.Rows[0]["FromDate"].ToString()), 1, 1);
                    pdfFormFields.SetField("CollegeFrom", fromDate.ToString());
                }
                if (!string.IsNullOrEmpty(dt.Rows[0]["ToDate"].ToString()))
                {
                    var toDate = new DateTime(Convert.ToInt32(dt.Rows[0]["ToDate"].ToString()), 12, 31);
                    pdfFormFields.SetField("CollegeTo", toDate.ToString());
                }
                //pdfFormFields.SetField("CollegeFrom", dt.Rows[0]["ApplicantName"].ToString().Trim());
                //pdfFormFields.SetField("CollegeTo", dt.Rows[0]["ApplicantName"].ToString().Trim());
                if (dt.Rows[0]["IsGraduate"] != null && dt.Rows[0]["IsGraduate"] != DBNull.Value)
                {
                    bool isGraduate = Convert.ToBoolean(dt.Rows[0]["IsGraduate"].ToString());

                    if (isGraduate)
                    {
                        pdfFormFields.SetField("CollegeGradYes", "On");
                    }
                    else
                    {
                        pdfFormFields.SetField("CollegeGradNo", "On");
                    }
                }
                //pdfFormFields.SetField("CollegeGradYes", dt.Rows[0]["ApplicantName"].ToString().Trim());
                //pdfFormFields.SetField("CollegeGradNo", dt.Rows[0]["ApplicantName"].ToString().Trim());
                pdfFormFields.SetField("CollegeDegree", dt.Rows[0]["Degree"].ToString().Trim());
            }

            //dt = ApplicantManager.GetApplicantEducations(applicantID, GetEnumDescription(EnumEducationInstitutionType.Other));
            dt = EducationManager.GetEducationByUserIDandInstitutionType(applicantId, Convert.ToInt32(EnumEducationInstitutionType.Other));
            if (dt != null && dt.Rows.Count > 0)
            {
                pdfFormFields.SetField("OtherName", dt.Rows[0]["SchoolName"].ToString().Trim());
                //pdfFormFields.SetField("OtherAddress", dt.Rows[0]["ApplicantName"].ToString().Trim());
                if (!string.IsNullOrEmpty(dt.Rows[0]["FromDate"].ToString()))
                {
                    //var signatureDate = Convert.ToDateTime(dt.Rows[0]["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                    var fromDate = new DateTime(Convert.ToInt32(dt.Rows[0]["FromDate"].ToString()), 1, 1);
                    pdfFormFields.SetField("OtherFrom", fromDate.ToString());
                }
                if (!string.IsNullOrEmpty(dt.Rows[0]["ToDate"].ToString()))
                {
                    //var signatureDate = Convert.ToDateTime(dt.Rows[0]["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                    var toDate = new DateTime(Convert.ToInt32(dt.Rows[0]["ToDate"].ToString()), 12, 31);
                    pdfFormFields.SetField("OtherTo", toDate.ToString());
                }
                //pdfFormFields.SetField("OtherFrom", dt.Rows[0]["ApplicantName"].ToString().Trim());
                //pdfFormFields.SetField("OtherTo", dt.Rows[0]["ApplicantName"].ToString().Trim());
                if (dt.Rows[0]["IsGraduate"] != null && dt.Rows[0]["IsGraduate"] != DBNull.Value)
                {
                    bool isGraduate = Convert.ToBoolean(dt.Rows[0]["IsGraduate"].ToString());

                    if (isGraduate)
                    {
                        pdfFormFields.SetField("OtherGradYes", "On");
                    }
                    else
                    {
                        pdfFormFields.SetField("OtherGradNo", "On");
                    }
                }
                //pdfFormFields.SetField("OtherGradYes", dt.Rows[0]["ApplicantName"].ToString().Trim());
                //pdfFormFields.SetField("OtherGradNo", dt.Rows[0]["ApplicantName"].ToString().Trim());
                pdfFormFields.SetField("OtherDegree", dt.Rows[0]["Degree"].ToString().Trim());
            }
        }
        [NonAction]
        private void FillPdfFormFieldsEARef(int applicantId, AcroFields pdfFormFields)
        {
            DataTable dt = ReferenceManager.GetUserReferenceDataTableByUserId(applicantId);
            if (dt != null && dt.Rows.Count > 0)
            {
                int counter = 0;
                foreach (DataRow item in dt.Rows)
                {
                    if (counter == 3)
                    {
                        break;
                    }
                    if (counter == 0)
                    {
                        string name = string.Empty;
                        if (!string.IsNullOrEmpty(item["RefMiddleName"].ToString()))
                        {
                            name = item["RefFirstName"].ToString() + " " + item["RefMiddleName"].ToString() + " " + item["RefLastName"].ToString();
                        }
                        else
                        {
                            name = item["RefFirstName"].ToString() + " " + item["RefLastName"].ToString();
                        }
                        pdfFormFields.SetField("Ref1Name", name);
                        pdfFormFields.SetField("Ref1Relation", item["NatureOfRelationship"].ToString().Trim());
                        pdfFormFields.SetField("Ref1Company", item["CompanyName"].ToString().Trim());
                        string phone = item["RefPhone"].ToString();

                        if (phone.Length > 3)
                        {
                            pdfFormFields.SetField("Ref1PhonePt1", phone.Substring(0, 3));
                            pdfFormFields.SetField("Ref1PhonePt2", phone.Substring(3));
                        }
                        else
                        {

                            pdfFormFields.SetField("Ref1PhonePt1", phone);
                        }
                        //pdfFormFields.SetField("Ref1PhonePt1", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("Ref1PhonePt2", item["ApplicantName"].ToString().Trim());
                        pdfFormFields.SetField("Ref1Address", item["RefAddress"].ToString().Trim());
                    }
                    else if (counter == 1)
                    {
                        string name = string.Empty;
                        if (!string.IsNullOrEmpty(item["RefMiddleName"].ToString()))
                        {
                            name = item["RefFirstName"].ToString() + " " + item["RefMiddleName"].ToString() + " " + item["RefLastName"].ToString();
                        }
                        else
                        {
                            name = item["RefFirstName"].ToString() + " " + item["RefLastName"].ToString();
                        }
                        pdfFormFields.SetField("Ref2Name", name);
                        pdfFormFields.SetField("Ref2Relation", item["NatureOfRelationship"].ToString().Trim());
                        pdfFormFields.SetField("Ref2Company", item["CompanyName"].ToString().Trim());
                        string phone = item["RefPhone"].ToString();

                        if (phone.Length > 3)
                        {
                            pdfFormFields.SetField("Ref2PhonePt1", phone.Substring(0, 3));
                            pdfFormFields.SetField("Ref2PhonePt2", phone.Substring(3));
                        }
                        else
                        {

                            pdfFormFields.SetField("Ref1PhonePt1", phone);
                        }
                        //pdfFormFields.SetField("Ref2PhonePt1", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("Ref2PhonePt2", item["ApplicantName"].ToString().Trim());
                        pdfFormFields.SetField("Ref2Address", item["RefAddress"].ToString().Trim());
                    }
                    else if (counter == 2)
                    {
                        string name = string.Empty;
                        if (!string.IsNullOrEmpty(item["RefMiddleName"].ToString()))
                        {
                            name = item["RefFirstName"].ToString() + " " + item["RefMiddleName"].ToString() + " " + item["RefLastName"].ToString();
                        }
                        else
                        {
                            name = item["RefFirstName"].ToString() + " " + item["RefLastName"].ToString();
                        }
                        pdfFormFields.SetField("Ref3Name", name);
                        pdfFormFields.SetField("Ref3Relation", item["NatureOfRelationship"].ToString().Trim());
                        pdfFormFields.SetField("Ref3Company", item["CompanyName"].ToString().Trim());
                        string phone = item["RefPhone"].ToString();

                        if (phone.Length > 3)
                        {
                            pdfFormFields.SetField("Ref3PhonePt1", phone.Substring(0, 3));
                            pdfFormFields.SetField("Ref3PhonePt2", phone.Substring(3));
                        }
                        else
                        {

                            pdfFormFields.SetField("Ref3PhonePt1", phone);
                        }
                        //pdfFormFields.SetField("Ref3PhonePt1", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("Ref3PhonePt2", item["ApplicantName"].ToString().Trim());
                        pdfFormFields.SetField("Ref3Address", item["RefAddress"].ToString().Trim());
                    }

                    counter++;
                }
            }
        }
        [NonAction]
        private void FillPdfFormFieldsEAWorkHistory(int applicantId, AcroFields pdfFormFields)
        {
            DataTable dt = EmploymentManager.GetEmployDataTable(applicantId);

            //DataTable dt = ApplicantManager.GetApplicantWorkHistorys(applicantID);

            if (dt != null && dt.Rows.Count > 0)
            {
                int counter = 0;
                foreach (DataRow item in dt.Rows)
                {
                    if (counter == 3)
                    {
                        break;
                    }
                    if (counter == 0)
                    {
                        pdfFormFields.SetField("Prev1Company", item["CompanyName"].ToString().Trim());

                        //lblCurrentInstituteMainPhone.Text = "-";
                        if (!string.IsNullOrEmpty(item["CompanyPhone"].ToString()))
                        {
                            string phone = item["CompanyPhone"].ToString();

                            if (phone.Length > 3)
                            {
                                pdfFormFields.SetField("Prev1PhonePt1", phone.Substring(0, 3));
                                pdfFormFields.SetField("Prev1PhonePt2", phone.Substring(3));
                            }
                            else
                            {
                                pdfFormFields.SetField("Prev1PhonePt1", phone);
                            }
                        }

                        pdfFormFields.SetField("Prev1CompanyAdd", item["CompanyAddress"].ToString().Trim());
                        pdfFormFields.SetField("Prev1Super", item["Supervisor"].ToString().Trim());
                        pdfFormFields.SetField("Prev1JobTitle", item["JobTItle"].ToString().Trim());
                        pdfFormFields.SetField("Prev1StartSal", item["StartingSalary"].ToString().Trim());
                        pdfFormFields.SetField("Prev1EndingSalary", item["EndingSalary"].ToString().Trim());
                        pdfFormFields.SetField("Prev1Responsible", item["Responisiblities"].ToString().Trim());

                        if (!string.IsNullOrEmpty(item["FromDate"].ToString()))
                        {
                            var signatureDate = Convert.ToDateTime(item["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Prev1StartDate", signatureDate);
                        }
                        if (!string.IsNullOrEmpty(item["ToDate"].ToString()))
                        {
                            var signatureDate = Convert.ToDateTime(item["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Prev1EndDate", signatureDate);
                        }

                        pdfFormFields.SetField("Prev1LeaveReason", item["LeaveReason"].ToString().Trim());

                        if (item["CanContactThisEmployer"] != null && item["CanContactThisEmployer"] != DBNull.Value)
                        {
                            bool isAuthorised = Convert.ToBoolean(item["CanContactThisEmployer"].ToString());

                            if (isAuthorised)
                            {
                                pdfFormFields.SetField("Prev1CanContactYes", "On");
                            }
                            else
                            {
                                pdfFormFields.SetField("Prev1CanContactNo", "On");
                            }
                        }
                    }
                    else if (counter == 1)
                    {
                        pdfFormFields.SetField("Prev2Company", item["CompanyName"].ToString().Trim());


                        if (!string.IsNullOrEmpty(item["CompanyPhone"].ToString()))
                        {
                            string phone = item["CompanyPhone"].ToString();

                            if (phone.Length > 3)
                            {
                                pdfFormFields.SetField("Prev2PhonePt1", phone.Substring(0, 3));
                                pdfFormFields.SetField("Prev2PhonePt2", phone.Substring(3));
                            }
                            else
                            {

                                pdfFormFields.SetField("Prev2PhonePt1", phone);
                            }
                        }

                        //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());

                        pdfFormFields.SetField("Prev2CompanyAdd", item["CompanyAddress"].ToString().Trim());
                        pdfFormFields.SetField("Prev2Super", item["Supervisor"].ToString().Trim());
                        pdfFormFields.SetField("Prev2JobTitle", item["JobTItle"].ToString().Trim());
                        pdfFormFields.SetField("Prev2StartSal", item["StartingSalary"].ToString().Trim());
                        pdfFormFields.SetField("Prev2EndingSalary", item["EndingSalary"].ToString().Trim());
                        pdfFormFields.SetField("Prev2Responsible", item["Responisiblities"].ToString().Trim());

                        if (!string.IsNullOrEmpty(item["FromDate"].ToString()))
                        {
                            var signatureDate = Convert.ToDateTime(item["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Prev2StartDate", signatureDate);
                        }
                        if (!string.IsNullOrEmpty(item["ToDate"].ToString()))
                        {
                            var signatureDate = Convert.ToDateTime(item["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Prev2EndDate", signatureDate);
                        }
                        //pdfFormFields.SetField("Prev2StartDate", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("Prev2EndDate", item["ApplicantName"].ToString().Trim());

                        pdfFormFields.SetField("Prev2LeaveReason", item["LeaveReason"].ToString().Trim());

                        if (item["CanContactThisEmployer"] != null && item["CanContactThisEmployer"] != DBNull.Value)
                        {
                            bool isAuthorised = Convert.ToBoolean(item["CanContactThisEmployer"].ToString());

                            if (isAuthorised)
                            {
                                pdfFormFields.SetField("Prev2CanContactYes", "On");
                            }
                            else
                            {
                                pdfFormFields.SetField("Prev2CanContactNo", "On");
                            }
                        }
                        //pdfFormFields.SetField("Prev2CanContactYes", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("Prev2CanContactNo", item["ApplicantName"].ToString().Trim());
                    }
                    else if (counter == 2)
                    {
                        pdfFormFields.SetField("Prev3Company", item["CompanyName"].ToString().Trim());


                        if (!string.IsNullOrEmpty(item["CompanyPhone"].ToString()))
                        {
                            string phone = item["CompanyPhone"].ToString();


                            if (phone.Length > 3)
                            {
                                pdfFormFields.SetField("Prev3PhonePt1", phone.Substring(0, 3));
                                pdfFormFields.SetField("Prev3PhonePt2", phone.Substring(3));
                            }
                            else
                            {

                                pdfFormFields.SetField("Prev3PhonePt1", phone);
                            }
                        }

                        //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());

                        pdfFormFields.SetField("Prev3CompanyAdd", item["CompanyAddress"].ToString().Trim());
                        pdfFormFields.SetField("Prev3Super", item["Supervisor"].ToString().Trim());
                        pdfFormFields.SetField("Prev3JobTitle", item["JobTItle"].ToString().Trim());
                        pdfFormFields.SetField("Prev3StartSal", item["StartingSalary"].ToString().Trim());
                        pdfFormFields.SetField("Prev3EndingSalary", item["EndingSalary"].ToString().Trim());
                        pdfFormFields.SetField("Prev3Responsible", item["Responisiblities"].ToString().Trim());

                        if (!string.IsNullOrEmpty(item["FromDate"].ToString()))
                        {
                            var signatureDate = Convert.ToDateTime(item["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Prev3StartDate", signatureDate);
                        }
                        if (!string.IsNullOrEmpty(item["ToDate"].ToString()))
                        {
                            var signatureDate = Convert.ToDateTime(item["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                            pdfFormFields.SetField("Prev3EndDate", signatureDate);
                        }
                        ///pdfFormFields.SetField("Prev3StartDate", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("Prev3EndDate", item["ApplicantName"].ToString().Trim());

                        pdfFormFields.SetField("Prev3LeaveReason", item["LeaveReason"].ToString().Trim());

                        if (item["CanContactThisEmployer"] != null && item["CanContactThisEmployer"] != DBNull.Value)
                        {
                            bool isAuthorised = Convert.ToBoolean(item["CanContactThisEmployer"].ToString());

                            if (isAuthorised)
                            {
                                pdfFormFields.SetField("Prev3CanContactYes", "On");
                            }
                            else
                            {
                                pdfFormFields.SetField("Prev3CanContactNo", "On");
                            }
                        }
                        //pdfFormFields.SetField("Prev3CanContactYes", item["ApplicantName"].ToString().Trim());
                        //pdfFormFields.SetField("Prev3CanContactNo", item["ApplicantName"].ToString().Trim());
                    }

                    counter++;
                }
            }

            if (dt == null || dt.Rows.Count < 3)
            {
                int countWS = 0;
                if (dt != null)
                {
                    countWS = dt.Rows.Count;
                }

                //DataTable dtUserCompany = ImportedApplicantPortalExperienceManager.GetImportedApplicantPortalExperienceByApplicantId(applicantID);
                DataTable dtUserCompany = new DataTable();
                if (dtUserCompany != null && dtUserCompany.Rows.Count > 0)
                {
                    int counter = 0;
                    foreach (DataRow item in dtUserCompany.Rows)
                    {
                        if (counter + countWS == 3)
                        {
                            break;
                        }
                        if (counter == 0 && countWS == 0)
                        {
                            pdfFormFields.SetField("Prev1Company", item["CompanyName"].ToString().Trim());


                            //int instituteID = Convert.ToInt32(item["InstituteID"].ToString());
                            //DataTable dtPhones = InstitutionManager.GetInstitutionPhone(instituteID, InstitutionTelephoneType.MainPhoneNumber);
                            ////lblCurrentInstituteMainPhone.Text = "-";
                            if (!string.IsNullOrEmpty(item["CompanyPhone"].ToString()))
                            {
                                string phone = item["CompanyPhone"].ToString();

                                if (phone.Length > 3)
                                {
                                    pdfFormFields.SetField("Prev1PhonePt1", phone.Substring(0, 3));
                                    pdfFormFields.SetField("Prev1PhonePt2", phone.Substring(3));
                                }
                                else
                                {

                                    pdfFormFields.SetField("Prev1PhonePt1", phone);
                                }
                            }

                            //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());

                            if (!string.IsNullOrEmpty(item["CompanyAddress"].ToString()))
                            {
                                pdfFormFields.SetField("Prev1CompanyAdd", item["CompanyAddress"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["Supervisor"].ToString()))
                            {
                                pdfFormFields.SetField("Prev1Super", item["Supervisor"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["JobTItle"].ToString()))
                            {
                                pdfFormFields.SetField("Prev1JobTitle", item["JobTItle"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["StartingSalary"].ToString()))
                            {
                                pdfFormFields.SetField("Prev1StartSal", item["StartingSalary"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["EndingSalary"].ToString()))
                            {
                                pdfFormFields.SetField("Prev1EndingSalary", item["EndingSalary"].ToString().Trim());
                            }
                            pdfFormFields.SetField("Prev1Responsible", item["Responisiblities"].ToString().Trim());

                            if (!string.IsNullOrEmpty(item["FromDate"].ToString()))
                            {
                                var signatureDate = Convert.ToDateTime(item["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                                pdfFormFields.SetField("Prev1StartDate", signatureDate);
                            }
                            if (!string.IsNullOrEmpty(item["ToDate"].ToString()))
                            {
                                var signatureDate = Convert.ToDateTime(item["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                                pdfFormFields.SetField("Prev1EndDate", signatureDate);
                            }
                            //pdfFormFields.SetField("Prev1StartDate", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("Prev1EndDate", item["ApplicantName"].ToString().Trim());

                            if (!string.IsNullOrEmpty(item["LeaveReason"].ToString()))
                            {
                                pdfFormFields.SetField("Prev1LeaveReason", item["LeaveReason"].ToString().Trim());
                            }

                            if (item["CanContactThisEmployer"] != null && item["CanContactThisEmployer"] != DBNull.Value)
                            {
                                bool isAuthorised = Convert.ToBoolean(item["CanContactThisEmployer"].ToString());

                                if (isAuthorised)
                                {
                                    pdfFormFields.SetField("Prev1CanContactYes", "On");
                                }
                                else
                                {
                                    pdfFormFields.SetField("Prev1CanContactNo", "On");
                                }
                            }
                            //pdfFormFields.SetField("Prev1CanContactYes", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("Prev1CanContactNo", item["ApplicantName"].ToString().Trim());
                        }
                        else if ((counter == 1 && countWS == 0) || (counter == 0 && countWS == 1))
                        {
                            pdfFormFields.SetField("Prev2Company", item["CompanyName"].ToString().Trim());


                            if (!string.IsNullOrEmpty(item["CompanyPhone"].ToString()))
                            {
                                string phone = item["CompanyPhone"].ToString();

                                if (phone.Length > 3)
                                {
                                    pdfFormFields.SetField("Prev2PhonePt1", phone.Substring(0, 3));
                                    pdfFormFields.SetField("Prev2PhonePt2", phone.Substring(3));
                                }
                                else
                                {

                                    pdfFormFields.SetField("Prev2PhonePt1", phone);
                                }
                            }

                            //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());

                            if (!string.IsNullOrEmpty(item["CompanyAddress"].ToString()))
                            {
                                pdfFormFields.SetField("Prev2CompanyAdd", item["CompanyAddress"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["Supervisor"].ToString()))
                            {
                                pdfFormFields.SetField("Prev2Super", item["Supervisor"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["JobTItle"].ToString()))
                            {
                                pdfFormFields.SetField("Prev2JobTitle", item["JobTItle"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["StartingSalary"].ToString()))
                            {
                                pdfFormFields.SetField("Prev2StartSal", item["StartingSalary"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["EndingSalary"].ToString()))
                            {
                                pdfFormFields.SetField("Prev2EndingSalary", item["EndingSalary"].ToString().Trim());
                            }
                            pdfFormFields.SetField("Prev2Responsible", item["Responisiblities"].ToString().Trim());

                            if (!string.IsNullOrEmpty(item["FromDate"].ToString()))
                            {
                                var signatureDate = Convert.ToDateTime(item["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                                pdfFormFields.SetField("Prev2StartDate", signatureDate);
                            }
                            if (!string.IsNullOrEmpty(item["ToDate"].ToString()))
                            {
                                var signatureDate = Convert.ToDateTime(item["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                                pdfFormFields.SetField("Prev2EndDate", signatureDate);
                            }
                            //pdfFormFields.SetField("Prev2StartDate", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("Prev2EndDate", item["ApplicantName"].ToString().Trim());
                            if (!string.IsNullOrEmpty(item["LeaveReason"].ToString()))
                            {
                                pdfFormFields.SetField("Prev2LeaveReason", item["LeaveReason"].ToString().Trim());
                            }

                            if (item["CanContactThisEmployer"] != null && item["CanContactThisEmployer"] != DBNull.Value)
                            {
                                bool isAuthorised = Convert.ToBoolean(item["CanContactThisEmployer"].ToString());

                                if (isAuthorised)
                                {
                                    pdfFormFields.SetField("Prev2CanContactYes", "On");
                                }
                                else
                                {
                                    pdfFormFields.SetField("Prev2CanContactNo", "On");
                                }
                            }
                            //pdfFormFields.SetField("Prev2CanContactYes", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("Prev2CanContactNo", item["ApplicantName"].ToString().Trim());
                        }
                        else if ((counter == 2 && countWS == 0) || (counter == 1 && countWS == 1) || (counter == 0 && countWS == 2))
                        {
                            pdfFormFields.SetField("Prev3Company", item["CompanyName"].ToString().Trim());


                            if (!string.IsNullOrEmpty(item["CompanyPhone"].ToString()))
                            {
                                string phone = item["CompanyPhone"].ToString();

                                if (phone.Length > 3)
                                {
                                    pdfFormFields.SetField("Prev3PhonePt1", phone.Substring(0, 3));
                                    pdfFormFields.SetField("Prev3PhonePt2", phone.Substring(3));
                                }
                                else
                                {

                                    pdfFormFields.SetField("Prev3PhonePt1", phone);
                                }
                            }

                            //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("", item["ApplicantName"].ToString().Trim());
                            if (!string.IsNullOrEmpty(item["CompanyAddress"].ToString()))
                            {
                                pdfFormFields.SetField("Prev3CompanyAdd", item["CompanyAddress"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["Supervisor"].ToString()))
                            {
                                pdfFormFields.SetField("Prev3Super", item["Supervisor"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["JobTItle"].ToString()))
                            {
                                pdfFormFields.SetField("Prev3JobTitle", item["JobTItle"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["StartingSalary"].ToString()))
                            {
                                pdfFormFields.SetField("Prev3StartSal", item["StartingSalary"].ToString().Trim());
                            }
                            if (!string.IsNullOrEmpty(item["EndingSalary"].ToString()))
                            {
                                pdfFormFields.SetField("Prev3EndingSalary", item["EndingSalary"].ToString().Trim());
                            }
                            pdfFormFields.SetField("Prev3Responsible", item["Responisiblities"].ToString().Trim());

                            if (!string.IsNullOrEmpty(item["FromDate"].ToString()))
                            {
                                var signatureDate = Convert.ToDateTime(item["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                                pdfFormFields.SetField("Prev3StartDate", signatureDate);
                            }
                            if (!string.IsNullOrEmpty(item["ToDate"].ToString()))
                            {
                                var signatureDate = Convert.ToDateTime(item["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                                pdfFormFields.SetField("Prev3EndDate", signatureDate);
                            }
                            ///pdfFormFields.SetField("Prev3StartDate", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("Prev3EndDate", item["ApplicantName"].ToString().Trim());
                            if (!string.IsNullOrEmpty(item["LeaveReason"].ToString()))
                            {
                                pdfFormFields.SetField("Prev3LeaveReason", item["LeaveReason"].ToString().Trim());
                            }

                            if (item["CanContactThisEmployer"] != null && item["CanContactThisEmployer"] != DBNull.Value)
                            {
                                bool isAuthorised = Convert.ToBoolean(item["CanContactThisEmployer"].ToString());

                                if (isAuthorised)
                                {
                                    pdfFormFields.SetField("Prev3CanContactYes", "On");
                                }
                                else
                                {
                                    pdfFormFields.SetField("Prev3CanContactNo", "On");
                                }
                            }
                            //pdfFormFields.SetField("Prev3CanContactYes", item["ApplicantName"].ToString().Trim());
                            //pdfFormFields.SetField("Prev3CanContactNo", item["ApplicantName"].ToString().Trim());
                        }

                        counter++;
                    }
                }
            }
        }
        [NonAction]
        private void FillPdfFormFieldsEAMilitery(int applicantId, AcroFields pdfFormFields)
        {
            DataTable dt = UserMilitaryManager.GetUserMilitaryByUserID(applicantId);
            if (dt != null && dt.Rows.Count > 0)
            {
                pdfFormFields.SetField("MilBranch", dt.Rows[0]["Branch"].ToString().Trim());
                if (!string.IsNullOrEmpty(dt.Rows[0]["FromDate"].ToString()))
                {
                    var signatureDate = Convert.ToDateTime(dt.Rows[0]["FromDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                    pdfFormFields.SetField("MilStartDate", signatureDate);
                }
                if (!string.IsNullOrEmpty(dt.Rows[0]["ToDate"].ToString()))
                {
                    var signatureDate = Convert.ToDateTime(dt.Rows[0]["ToDate"].ToString().Trim()).ToString("MM/dd/yyyy");
                    pdfFormFields.SetField("MilEndDate", signatureDate);
                }
                //pdfFormFields.SetField("", dt.Rows[0]["ApplicantName"].ToString().Trim());
                //pdfFormFields.SetField("", dt.Rows[0]["ApplicantName"].ToString().Trim());
                pdfFormFields.SetField("MilLastRank", dt.Rows[0]["RankAtDischarge"].ToString().Trim());
                if (!string.IsNullOrEmpty(dt.Rows[0]["TypeOfDischarge"].ToString()))
                {
                    bool isHonorable = Convert.ToBoolean(dt.Rows[0]["TypeOfDischarge"].ToString());
                    string disChargeType = isHonorable ? "Honorable" : "Dishonorable";
                    pdfFormFields.SetField("MilDisType", disChargeType);
                }
                pdfFormFields.SetField("MilDisHonorEx", dt.Rows[0]["DisonourComment"].ToString().Trim());
            }
        }



        [Route("position/{position}")]
        [HttpGet]
        public IActionResult GetPosition(string position)
        {
            try
            {
                IEnumerable<Position> positionList;
                if (position == "all")
                {
                    positionList = PositionManager.GetPositions("");
                }
                else
                {
                    positionList = PositionManager.GetPositions(position);
                }
                return Ok(new ResponseModels<IEnumerable<Position>>(positionList));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}