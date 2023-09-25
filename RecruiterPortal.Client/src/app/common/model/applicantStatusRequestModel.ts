export class ApplicantStatusRequestModel {
    Id: number;
    ApplicantId: number;
    PositionId: string;
    InstitutionId: string;
    Status: number;
    Date: Date;
    TotalFee: number;
    NetFee: number;
    RefFee: number;
    CurrentSalary: number;
    ExpectedSalary: number;
    ProfileStatus: number;
    Shift: string;
    IsActive: boolean;
}
