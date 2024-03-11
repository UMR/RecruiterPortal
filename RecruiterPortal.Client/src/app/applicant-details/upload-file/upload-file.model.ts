
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
export enum Enum1099FileType {
    UmrHealthForm = 1,
    HepatitisB = 11,
    Payroll = 14,
    HippaForm = 12,
    IndependentContractorAgreement = 20,
    EmploymentApplication = 17,
    RNSupervisor3Year = 25,
    RNSupervisor4Year = 26,
    RNSupervisor5Year = 27,
    StaffNurse3Year = 28,
    StaffNurse4Year = 29,
    StaffNurse5Year = 30,
}


export enum Enum1099FileNameByType {
    UmrHealthForm = "Umr Health Form",
    HepatitisB = "Hepatitis B Form",
    Payroll = "Payroll Form",
    HippaForm = "HIPPA Form",
    IndependentContractorAgreement = "Independent Contractor Agreement Form",
    EmploymentApplication = "Employment Application Form",
    RNSupervisor3Year = "RN Supervisor Contractor 3 Year Contract",
    RNSupervisor4Year = "RN Supervisor Contractor 4 Year Contract",
    RNSupervisor5Year = "RN Supervisor Contractor 5 Year Contract",
    StaffNurse3Year = "Staff Nurse Contractor 3 Year Contract",
    StaffNurse4Year = "Staff Nurse Contractor 4 Year Contract",
    StaffNurse5Year = "Staff Nurse Contractor 5 Year Contract"
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
