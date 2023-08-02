export class UserModel {
  //UserId: number;
  LoginId: string;
  FirstName: string;
  LastName: string;
  Password: string;
  Email: string;
  Telephone: string;
  ODAPermission: boolean;
  IsActive: boolean;
  TimeOut: number;
  AgencyID?: number;
  ApplicantTypeID?: number;
}
