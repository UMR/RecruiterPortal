
export interface IUploadFile {
  UserFileID: number;
  FIleData: string;
  FileName: string;
  CreatedDate: string;
  UserID: number;
  FileType: number;
}

export enum EnumFileType {
  UmrHealthForm = 1,
  PassportSsnTin = 2,
  Resume = 3,
  CertificateLicense = 4,
  Cpr = 5,
  PhysicalExam = 6,
  AgencyHired = 7,
  DeclinationInfluenza = 8,
  EmergencyContact = 9,
  EmploymentEligibility = 10,
  HepatitisB = 11,
  HippaForm = 12,
  NysChrc = 13,
  Payroll = 14,
  W9 = 15,
  ReferenceLetters = 16,
  EmploymentApplication = 17,
  VoidedCheque = 18,
  AdministrativeFeeAgreement = 19,
  IndependentContractorAgreement = 20,
  EmploymentContract = 21,
  W9CoverSheet = 22,
  TermsAndConditionsIndependentContractor = 23,
  NurseForm = 24
}

export enum EnumFileNameByType {
  UmrHealthForm = "Umr Health Form",
  PassportSsnTin = "Passport SSN TIN",
  Resume = "Resume",
  CertificateLicense = "Certificate License",
  Cpr = "CPR(ALS/BLS) Form",
  PhysicalExam = "Physical Exam Form",
  AgencyHired = "Agency Hired Form",
  DeclinationInfluenza = "Declination Influenza Form",
  EmergencyContact = "Emergency Contact Form",
  EmploymentEligibility = "Employment Eligibility Form",
  HepatitisB = "Hepatitis B Form",
  HippaForm = "HIPPA Form",
  NysChrc = "Nys Chrc Form",
  Payroll = "Payroll Form",
  W9 = "W9 Form",
  ReferenceLetters = "Reference Letters Form",
  EmploymentApplication = "Employment Application Form",
  VoidedCheque = "Voided Cheque Form",
  AdministrativeFeeAgreement = "Administrative Fee Agreement Form",
  IndependentContractorAgreement = "Independent Contractor Agreement Form",
  EmploymentContract = "Employment Contract Form",
  W9CoverSheet = "W9 Cover Sheet Form",
  TermsAndConditionsIndependentContractor = "Terms And Conditions Independent Contractor Form",
  NurseForm = "Nurse Form"
}
