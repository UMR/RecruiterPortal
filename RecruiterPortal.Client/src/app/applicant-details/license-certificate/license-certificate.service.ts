import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { EnumFileType } from '../upload-file/upload-file.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseCertificateService {
  private getAllUserLicenseURI: string = `${resourceServerUrl}/api/user-license/get-all`;
  private getUserLicenseByIdURI: string = `${resourceServerUrl}/api/user-license/get`;
  private saveUserLicenseURI: string = `${resourceServerUrl}/api/user-license/save`;
  private updateUserLicenseURI: string = `${resourceServerUrl}/api/user-license/update`;
  private deleteUserLicenseURI: string = `${resourceServerUrl}/api/user-license/delete/`;
  private issueingAuthorityURI: string = `${resourceServerUrl}/api/applicant-info/issuing-authority/`;

  constructor(private http: HttpClient) {
  }

  getAllUserLicense(): Observable<HttpResponse<any>> {
    return this.http.get(this.getAllUserLicenseURI + "/" + EnumFileType.CertificateLicense, { observe: 'response' });
  }

  getUserLicenseById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(this.getUserLicenseByIdURI + "/" + id, { observe: 'response' });
  }

  save(userLicense: any): Observable<HttpResponse<any>> {
    return this.http.post(this.saveUserLicenseURI, userLicense, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  update(userLicense: any): Observable<HttpResponse<any>> {
    return this.http.put(this.updateUserLicenseURI, userLicense, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  delete(userLicenseId: number) {
    return this.http.delete(this.deleteUserLicenseURI + userLicenseId);
  }

  getIssueingAuthorityByText(text: string): Observable<HttpResponse<any>> {
    return this.http.get(encodeURI(this.issueingAuthorityURI + text), { observe: 'response' });
  }

}
