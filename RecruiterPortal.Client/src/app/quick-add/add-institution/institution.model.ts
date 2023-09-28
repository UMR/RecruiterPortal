export class InstitutionModel {
    Id: number;
    InstituteName: string;
    IsActive: boolean
    CreatedBy?: number;
    CreatedDate?: Date;
    UpdatedBy?: number;
    UpdatedDate?: Date;
    Address: string
    Town: string
    County: string;
    ZipCode: string;
    CountryId?: number;
    StateCode: string;
    Telephone: string;
    Website: string;
}