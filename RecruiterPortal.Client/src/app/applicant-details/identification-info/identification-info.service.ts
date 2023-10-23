import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { EnumFileType } from '../upload-file/upload-file.model';

@Injectable()
export class IdentificationInfoService {

    private getAllUserLicenseURI: string = `${resourceServerUrl}/api/user-license/get-all`;
    private getUserLicenseByIdURI: string = `${resourceServerUrl}/api/user-license/get`;
    private saveUserLicenseURI: string = `${resourceServerUrl}/api/user-license/save`;
    private updateUserLicenseURI: string = `${resourceServerUrl}/api/user-license/update`;
    private deleteUserLicenseURI: string = `${resourceServerUrl}/api/user-license/delete/`;
    private issueingAuthorityURI: string = `${resourceServerUrl}/api/applicant-info/issuing-authority/`;

    constructor(private http: HttpClient) {
    }

    getAllUserLicense(applicantId: any): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/user-license/get-all?applicantId=${applicantId}`, { observe: 'response' });
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

    getIssueingAuthorityByText(text: string = 'AllIssueAuthority'): Observable<HttpResponse<any>> {
        return this.http.get(encodeURI(this.issueingAuthorityURI + text), { observe: 'response' });
    }
}
