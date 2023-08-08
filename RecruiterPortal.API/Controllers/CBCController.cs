using Microsoft.AspNetCore.Mvc;
using System.Data;
using iTextSharp.text.pdf;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortal.API.Controllers;
using RecruiterPortalDAL.Managers;
using RecruiterPortalDAL.Models;
using static RecruiterPortal.DAL.Utility.Utility;

namespace ApplicantPortalAPI.ResourceServer.Controllers
{
    [Route("api/user-cbc")]
    [ApiController]
    public class CBCController : CustomControllerBase
    {
        public CBCController(ILogger<CBCController> logger) : base(logger)
        {
        }

        [Route("get/{applicantId}")]
        [HttpGet]
        public IActionResult GetUserCBCByUserId(int applicantId)
        {
            try
            {
                Cbcform cbcForm = CBCManager.GetByUserID(applicantId);
                CBCModel cbcModel = null;

                if (cbcForm != null)
                {
                    cbcModel = new CBCModel();
                    cbcModel.CBCID = cbcForm.Cbcid;
                    cbcModel.UserID = cbcForm.UserId;
                    cbcModel.Alias_AKA = cbcForm.AliasAka;
                    cbcModel.HomePhone = cbcForm.HomePhone;
                    cbcModel.AgencyIdentification = cbcForm.AgencyIdentification;
                    cbcModel.LTHHP_PFI = cbcForm.LthhpPfi;
                    cbcModel.LHCSA_License = cbcForm.LhcsaLicense;
                    cbcModel.AgencyName = cbcForm.AgencyName;
                    cbcModel.ATelephoneNo = cbcForm.AtelephoneNo;
                    cbcModel.APLastName = cbcForm.AplastName;
                    cbcModel.APFirstName = cbcForm.ApfirstName;
                    cbcModel.AStreetNo = cbcForm.AstreetNo;
                    cbcModel.AStreetName = cbcForm.AstreetName;
                    cbcModel.AApt = cbcForm.Aapt;
                    cbcModel.ACity = cbcForm.Acity;
                    cbcModel.AState = cbcForm.Astate;
                    cbcModel.AZipCode = cbcForm.AzipCode;
                    cbcModel.AEmail = cbcForm.Aemail;
                    cbcModel.ADate = cbcForm.Adate;
                    cbcModel.FingerprintingMethod = cbcForm.FingerprintingMethod;
                    cbcModel.FingerprintServicesName = cbcForm.FingerprintServicesName;
                    cbcModel.FStAddress = cbcForm.FstAddress;
                    cbcModel.FCity = cbcForm.Fcity;
                    cbcModel.FState = cbcForm.Fstate;
                    cbcModel.FZip = cbcForm.Fzip;
                    cbcModel.FIdentificationVerified = cbcForm.FidentificationVerified;
                    cbcModel.FFirstName = cbcForm.FfirstName;
                    cbcModel.FLastName = cbcForm.FlastName;
                    cbcModel.FTitle = cbcForm.Ftitle;
                    cbcModel.Signature = cbcForm.Signature;
                    cbcModel.DateFingerPrinted = cbcForm.DateFingerPrinted;
                    cbcModel.MotherMaidenName = cbcForm.MotherMaidenName;
                    cbcModel.ParentorLegalGuardian = cbcForm.ParentorLegalGuardian;
                    cbcModel.Title = cbcForm.Title;
                    cbcModel.CreatedBy = cbcForm.CreatedBy;
                    cbcModel.CreatedDate = cbcForm.CreatedDate;
                    cbcModel.UpdatedBy = cbcForm.UpdatedBy;
                    cbcModel.UpdatedDate = cbcForm.UpdatedDate;
                }

                return Ok(cbcModel);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);                
            }            
        }

        [Route("save")]
        [HttpPost]
        public IActionResult Save(CBCModel cbcModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Cbcform cbc = new Cbcform();
                    cbc.UserId = cbcModel.UserID;
                    //cbc.UserID = cbcModel.UserID;
                    cbc.AliasAka = cbcModel.Alias_AKA;
                    cbc.HomePhone = cbcModel.HomePhone;
                    cbc.AgencyIdentification = cbcModel.AgencyIdentification;
                    cbc.LthhpPfi = cbcModel.LTHHP_PFI;
                    cbc.LhcsaLicense = cbcModel.LHCSA_License;
                    cbc.AgencyName = cbcModel.AgencyName;
                    cbc.AtelephoneNo = cbcModel.ATelephoneNo;
                    cbc.AplastName = cbcModel.APLastName;
                    cbc.ApfirstName = cbcModel.APFirstName;
                    cbc.AstreetNo = cbcModel.AStreetNo;
                    cbc.AstreetName = cbcModel.AStreetName;
                    cbc.Aapt = cbcModel.AApt;
                    cbc.Acity = cbcModel.ACity;
                    cbc.Astate = cbcModel.AState;
                    cbc.AzipCode = cbcModel.AZipCode;
                    cbc.Aemail = cbcModel.AEmail;
                    cbc.Adate = cbcModel.ADate;
                    cbc.FingerprintingMethod = cbcModel.FingerprintingMethod;
                    cbc.FingerprintServicesName = cbcModel.FingerprintServicesName;
                    cbc.FstAddress = cbcModel.FStAddress;
                    cbc.Fcity = cbcModel.FCity;
                    cbc.Fstate = cbcModel.FState;
                    cbc.Fzip = cbcModel.FZip;
                    cbc.FidentificationVerified = cbcModel.FIdentificationVerified;
                    cbc.FfirstName = cbcModel.FFirstName;
                    cbc.FlastName = cbcModel.FLastName;
                    cbc.Ftitle = cbcModel.FTitle;
                    cbc.Signature = cbcModel.Signature;
                    cbc.DateFingerPrinted = cbcModel.DateFingerPrinted;
                    cbc.MotherMaidenName = cbcModel.MotherMaidenName;
                    cbc.ParentorLegalGuardian = cbcModel.ParentorLegalGuardian;
                    cbc.Title = cbcModel.Title;

                    Cbcform isExist = CBCManager.GetByUserID(cbcModel.UserID);

                    if (isExist == null)
                    {
                        cbc.CreatedBy = cbcModel.CreatedBy;
                        cbc.CreatedDate = DateTime.Now;
                        CBCManager.SaveCBC(cbc);
                        UserManager.SendMailToRecruiterDBModified(cbcModel.UserID, "CBC");
                    }
                    else
                    {
                        cbc.Cbcid = cbcModel.CBCID;
                        cbc.UpdatedBy = cbcModel.UpdatedBy;
                        cbc.UpdatedDate = DateTime.Now;
                        CBCManager.UpdateCBC(cbc);
                        UserManager.SendMailToRecruiterDBModified(cbcModel.UserID, "CBC");
                    }

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);               
            }

            return BadRequest(cbcModel);
        }
        [HttpGet]
        [Route("file/{applicantId}")]
        public IActionResult GetFileForCustomer(int applicantId)
        {
            string fileName = string.Empty;
            try
            {
                var file = GenerateCBCFile(applicantId, out fileName);
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

        private byte[] GenerateCBCFile(int applicantId, out string fileName)
        {
            byte[] data;
            bool result = false;

            int fileTypeCode = (int)EnumFileType.NysChrc;
            DataTable dtPdfTemplate = PDFTemplatesManager.GetPDFTemplatesFileType(fileTypeCode.ToString());
            DataTable dtCBC = CBCManager.GetCBCDataTableByUserID(applicantId);

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

                if (dtCBC != null && dtCBC.Rows.Count > 0)
                {
                    CBCFillPdfFormFields(applicantId, pdfFormFields, dtCBC.Rows[0]);
                    pdfStamper.Close();
                    data = outputStream.ToArray();

                    DataTable dtGeneratedFile = GeneratedFilesManager.GetGeneratedFileByUserIdAndFileType(applicantId, ((int)EnumFileType.NysChrc).ToString());
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
        public void CBCFillPdfFormFields(int applicantId, AcroFields pdfFormFields, DataRow dataRow)
        {
            FillApplicantInfo(applicantId, pdfFormFields);
            FillCertInfo(applicantId, pdfFormFields);

            pdfFormFields.SetField("Alias_AKA", dataRow["Alias_AKA"].ToString().Trim());
            pdfFormFields.SetField("Alias_AKA1", dataRow["Alias_AKA"].ToString().Trim());
            pdfFormFields.SetField("AgencyIdentification", dataRow["AgencyIdentification"].ToString());
            pdfFormFields.SetField("LTHHP_PFI", dataRow["LTHHP_PFI"].ToString());
            pdfFormFields.SetField("LHCSA_License", dataRow["LHCSA_License"].ToString());

            pdfFormFields.SetField("AgencyName", dataRow["AgencyName"].ToString().Trim());

            pdfFormFields.SetField("APLastName", dataRow["APLastName"].ToString().Trim());
            pdfFormFields.SetField("APFirstName", dataRow["APFirstName"].ToString().Trim());
            pdfFormFields.SetField("AStreetNo", dataRow["AStreetNo"].ToString().Trim());
            pdfFormFields.SetField("AStreetName", dataRow["AStreetName"].ToString().Trim());
            pdfFormFields.SetField("ACity", dataRow["ACity"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["AState"].ToString().Trim()))
            {
                DataTable dataTable = ZipCodeManager.GetStateCodeByStateName(dataRow["AState"].ToString().Trim());
                if (dataTable != null && dataTable.Rows.Count > 0)
                {
                    pdfFormFields.SetField("AState", dataTable.Rows[0]["SateCode"].ToString());
                }
                else
                {
                    pdfFormFields.SetField("AState", dataRow["AState"].ToString().Trim());
                }
            }

            pdfFormFields.SetField("AZipCode", dataRow["AZipCode"].ToString().Trim());
            pdfFormFields.SetField("AEmail", dataRow["AEmail"].ToString().Trim());
            pdfFormFields.SetField("ASignature", dataRow["APFirstName"].ToString().Trim() + " " + dataRow["APLastName"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["ADate"].ToString()))
            {
                string[] dateParts = GetDateParts(dataRow["ADate"].ToString());
                pdfFormFields.SetField("ADateM", dateParts[0]);
                pdfFormFields.SetField("ADateD", dateParts[1]);
                pdfFormFields.SetField("ADateY", dateParts[2].ToString().Substring(2));
            }


            pdfFormFields.SetField("FingerprintingMethod", dataRow["FingerprintingMethod"].ToString());

            pdfFormFields.SetField("FingerprintServicesName", dataRow["FingerprintServicesName"].ToString().Trim());
            pdfFormFields.SetField("FStAddress", dataRow["FStAddress"].ToString().Trim());
            pdfFormFields.SetField("FCity", dataRow["FCity"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["FState"].ToString().Trim()))
            {
                DataTable dataTable = ZipCodeManager.GetStateCodeByStateName(dataRow["FState"].ToString().Trim());
                if (dataTable != null && dataTable.Rows.Count > 0)
                {
                    pdfFormFields.SetField("FState", dataTable.Rows[0]["SateCode"].ToString());
                }
                else
                {
                    pdfFormFields.SetField("FState", dataRow["FState"].ToString().Trim());
                }
            }
            pdfFormFields.SetField("FZip", dataRow["FZip"].ToString().Trim());

            pdfFormFields.SetField("FIdentificationVerified", dataRow["FIdentificationVerified"].ToString());

            pdfFormFields.SetField("FFirstName", dataRow["FFirstName"].ToString().Trim());
            pdfFormFields.SetField("FLastName", dataRow["FLastName"].ToString().Trim());
            pdfFormFields.SetField("FTitle", dataRow["FTitle"].ToString().Trim());
            pdfFormFields.SetField("Signature", dataRow["Signature"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["DateFingerPrinted"].ToString()))
            {
                string[] dateParts = GetDateParts(dataRow["DateFingerPrinted"].ToString());
                pdfFormFields.SetField("DateFingerPrintedM", dateParts[0]);
                pdfFormFields.SetField("DateFingerPrintedD", dateParts[1]);
                pdfFormFields.SetField("DateFingerPrinteY", dateParts[2]);
            }
            pdfFormFields.SetField("Signature", dataRow["Signature"].ToString().Trim());

            pdfFormFields.SetField("MotherMaidenName", dataRow["MotherMaidenName"].ToString().Trim());

            pdfFormFields.SetField("ParentorLegalGuardian", dataRow["ParentorLegalGuardian"].ToString().Trim());

            pdfFormFields.SetField("AgencyName1", dataRow["AgencyName"].ToString().Trim());
            pdfFormFields.SetField("PFIOperatingLicenseNumber:", dataRow["LTHHP_PFI"].ToString());
            pdfFormFields.SetField("Title2", dataRow["FTitle"].ToString().Trim());
            pdfFormFields.SetField("PrintNameofAuthorizedPerson", dataRow["APFirstName"].ToString().Trim() + " " + dataRow["APLastName"].ToString().Trim());
            pdfFormFields.SetField("SignatureAuthorizedPerson", dataRow["APFirstName"].ToString().Trim() + " " + dataRow["APLastName"].ToString().Trim());
            if (!string.IsNullOrEmpty(dataRow["CreatedDate"].ToString()))
            {
                pdfFormFields.SetField("Date4", Convert.ToDateTime(dataRow["CreatedDate"].ToString()).ToString("MM/dd/yyyy"));
                pdfFormFields.SetField("Date_2", Convert.ToDateTime(dataRow["CreatedDate"].ToString()).ToString("MM/dd/yyyy"));
                pdfFormFields.SetField("Date_3", Convert.ToDateTime(dataRow["CreatedDate"].ToString()).ToString("MM/dd/yyyy"));
            }

        }

        #region CBC

        [NonAction]
        private void FillApplicantInfo(int applicantId,AcroFields pdfFormFields)
        {
            DataTable dtApplicant = UserManager.GetUserDetailsByID(applicantId);
            DataTable dt = UserPhysicalManager.GetPhysicalDtByUserID(applicantId);

            pdfFormFields.SetField("Race", dt.Rows[0]["Race"].ToString());
            pdfFormFields.SetField("PlaceOfBirth", dtApplicant.Rows[0]["CountryOfBirth"].ToString());

            if (!string.IsNullOrEmpty(dt.Rows[0]["HairColor"].ToString()))
            {
                DataTable data = HairColorManager.GetHairColorCodeByHairColor((dt.Rows[0]["HairColor"].ToString().Trim()));
                if (data != null && data.Rows.Count > 0)
                {
                    pdfFormFields.SetField("HairColor", data.Rows[0]["HairColorCode"].ToString());
                }
            }

            if (!string.IsNullOrEmpty(dt.Rows[0]["EyeColor"].ToString()))
            {
                DataTable data = EyeColorManager.GetEyeColorCodeByEyeColor((dt.Rows[0]["EyeColor"].ToString()).Trim());
                if (data != null && data.Rows.Count > 0)
                {
                    pdfFormFields.SetField("EyeColor", data.Rows[0]["EyeColorCode"].ToString());
                }
            }

            if (dtApplicant.Rows[0]["SSN"].ToString() != "" && dtApplicant.Rows[0]["SSN"].ToString().Length > 0 && dtApplicant.Rows[0]["SSN"].ToString().Length <= 3)
            {
                pdfFormFields.SetField("SSN1", dtApplicant.Rows[0]["SSN"].ToString());
            }
            if (dtApplicant.Rows[0]["SSN"].ToString().Length > 3 && dtApplicant.Rows[0]["SSN"].ToString().Length <= 5)
            {
                pdfFormFields.SetField("SSN1", dtApplicant.Rows[0]["SSN"].ToString().Substring(0, 3));
                pdfFormFields.SetField("SSN2", dtApplicant.Rows[0]["SSN"].ToString().Substring(3));
            }
            if (dtApplicant.Rows[0]["SSN"].ToString().Length > 5)
            {
                pdfFormFields.SetField("SSN1", dtApplicant.Rows[0]["SSN"].ToString().Substring(0, 3));
                pdfFormFields.SetField("SSN2", dtApplicant.Rows[0]["SSN"].ToString().Substring(3, 2));
                pdfFormFields.SetField("SSN3", dtApplicant.Rows[0]["SSN"].ToString().Substring(5));
            }
            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["DateOfBirth"].ToString()))
            {
                string[] dateParts = GetLongDateParts(dtApplicant.Rows[0]["DateOfBirth"].ToString());
                pdfFormFields.SetField("DateofBirthM", dateParts[0]);
                pdfFormFields.SetField("DateofBirthD", dateParts[1]);
                pdfFormFields.SetField("DateofBirthY", dateParts[2]);
            }
            pdfFormFields.SetField("LastName", GetApplicantLastName());
            pdfFormFields.SetField("FirstName", GetApplicantFirstName());
            pdfFormFields.SetField("MaidenName", GetApplicantMiddleName());
            pdfFormFields.SetField("MN", GetApplicantMiddleName());
            pdfFormFields.SetField("StreetName", dtApplicant.Rows[0]["StreetAddress"].ToString());
            pdfFormFields.SetField("Apt", dtApplicant.Rows[0]["Apartment"].ToString());
            pdfFormFields.SetField("Street", dtApplicant.Rows[0]["StreetAddress"].ToString());
            pdfFormFields.SetField("City", dtApplicant.Rows[0]["City"].ToString());

            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["Phone"].ToString()))
            {
                string[] phoneParts = GetPhoneParts(dtApplicant.Rows[0]["Phone"].ToString());
                pdfFormFields.SetField("HomePhone1", phoneParts[0]);
                pdfFormFields.SetField("HomePhone2", phoneParts[1]);
                pdfFormFields.SetField("HomePhone3", phoneParts[2]);
            }
            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["Phone"].ToString()))
            {
                string[] phoneParts = GetPhoneParts(dtApplicant.Rows[0]["Phone"].ToString());
                pdfFormFields.SetField("CellPhone1", phoneParts[0]);
                pdfFormFields.SetField("CellPhone2", phoneParts[1]);
                pdfFormFields.SetField("CellPhone3", phoneParts[2]);
            }


            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["State"].ToString()))
            {
                DataTable dataTable = ZipCodeManager.GetStateCodeByStateName(dtApplicant.Rows[0]["State"].ToString());
                if (dataTable != null && dataTable.Rows.Count > 0)
                {
                    pdfFormFields.SetField("State", dataTable.Rows[0]["SateCode"].ToString());
                }
                else
                {
                    pdfFormFields.SetField("State", dtApplicant.Rows[0]["State"].ToString());
                }
            }
            pdfFormFields.SetField("Zip", dtApplicant.Rows[0]["ZipCode"].ToString());
            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["Gender"].ToString()))
            {
                pdfFormFields.SetField("Sex", dtApplicant.Rows[0]["Gender"].ToString() == "0" ? "M" : "F");
            }
            pdfFormFields.SetField("Race", dt.Rows[0]["Race"].ToString());
            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["CountryOfBirth"].ToString()))
            {
                pdfFormFields.SetField("PlaceOfBirth", dtApplicant.Rows[0]["CountryOfBirth"].ToString());
            }
            if (!string.IsNullOrEmpty(dt.Rows[0]["Height"].ToString()) && dt.Rows[0]["Height"].ToString().Length > 0)
            {
                pdfFormFields.SetField("HeightFt", dt.Rows[0]["Height"].ToString().Substring(0, 1));
            }
            if (!string.IsNullOrEmpty(dt.Rows[0]["Height"].ToString()) && dt.Rows[0]["Height"].ToString().Length > 1)
            {
                pdfFormFields.SetField("HeightInc", dt.Rows[0]["Height"].ToString().Substring(1));
            }
            pdfFormFields.SetField("Weight", dt.Rows[0]["Weight"].ToString());

            ///////////////    section 1    ///////////////////////

            pdfFormFields.SetField("LastName1", GetApplicantLastName());
            pdfFormFields.SetField("FirstName1", GetApplicantFirstName());
            pdfFormFields.SetField("MaidenName1", GetApplicantMiddleName());
            pdfFormFields.SetField("MN1", GetApplicantMiddleName());
            pdfFormFields.SetField("StreetAddress", dtApplicant.Rows[0]["StreetAddress"].ToString());
            pdfFormFields.SetField("City1", dtApplicant.Rows[0]["City"].ToString());
            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["State"].ToString()))
            {
                DataTable dataTable = ZipCodeManager.GetStateCodeByStateName(dtApplicant.Rows[0]["State"].ToString());
                if (dataTable != null && dataTable.Rows.Count > 0)
                {
                    pdfFormFields.SetField("State1", dataTable.Rows[0]["SateCode"].ToString());
                }
                else
                {
                    pdfFormFields.SetField("State1", dtApplicant.Rows[0]["State"].ToString());
                }
            }
            pdfFormFields.SetField("Zip1", dtApplicant.Rows[0]["ZipCode"].ToString());
            if (!string.IsNullOrEmpty(dtApplicant.Rows[0]["DateOfBirth"].ToString()))
            {
                pdfFormFields.SetField("DateofBirth", Convert.ToDateTime(dtApplicant.Rows[0]["DateOfBirth"].ToString()).ToString("MM/dd/YYYY"));
            }

            ///////////////    section 2    ///////////////////////

            pdfFormFields.SetField("ApplicantSignature", GetApplicantName());
        }
        [NonAction]
        private void FillCertInfo(int applicantId,AcroFields pdfFormFields)
        {
            DataTable dataTable = UserLicenseManager.GetUserLicenseDataTableByUserId(applicantId);
            if (dataTable.Rows.Count > 0)
            {
                if (dataTable.Rows[0]["LicenseNameA"].ToString().Contains("Driver"))
                {
                    pdfFormFields.SetField("Identification", "DriversLicense");
                }
                else if (dataTable.Rows[0]["LicenseNameA"].ToString().Contains("Passport"))
                {
                    pdfFormFields.SetField("Identification", "Passport");
                }
                else if (dataTable.Rows[0]["LicenseNameA"].ToString().Contains("Miltary"))
                {
                    pdfFormFields.SetField("Identification", "Miltary");
                }
                else if (dataTable.Rows[0]["LicenseNameB"].ToString().Contains("School"))
                {
                    pdfFormFields.SetField("Identification", "School");
                }
                else if (dataTable.Rows[0]["LicenseNameB"].ToString().Contains("Driver"))
                {
                    pdfFormFields.SetField("Identification", "DriversLicense");
                }
                else if (dataTable.Rows[0]["LicenseNameB"].ToString().Contains("Passport"))
                {
                    pdfFormFields.SetField("Identification", "Passport");
                }
                else if (dataTable.Rows[0]["LicenseNameB"].ToString().Contains("Miltary"))
                {
                    pdfFormFields.SetField("Identification", "Miltary");
                }
                else if (dataTable.Rows[0]["LicenseNameB"].ToString().Contains("School"))
                {
                    pdfFormFields.SetField("Identification", "School");
                }
                else
                {
                    pdfFormFields.SetField("Identification", "OtherIdentify");
                    pdfFormFields.SetField("Identify", dataTable.Rows[0]["LicenseNameA"].ToString());
                }
                pdfFormFields.SetField("IssuingState", dataTable.Rows[0]["IssueAuthority"].ToString());
                pdfFormFields.SetField("IDNumber", dataTable.Rows[0]["LicenseNo"].ToString());
                if (!string.IsNullOrEmpty(dataTable.Rows[0]["ExpiryDate"].ToString()))
                {
                    string[] dateParts = GetLongDateParts(dataTable.Rows[0]["ExpiryDate"].ToString());
                    pdfFormFields.SetField("IdExpireDateM", dateParts[0]);
                    pdfFormFields.SetField("IdExpireDateD", dateParts[1]);
                    pdfFormFields.SetField("IdExpireDateY", dateParts[2].Substring(2));
                }
            }
        }
        #endregion
    }
}
