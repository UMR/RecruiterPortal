import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { EnumFileType } from '../upload-file/upload-file.model';
import { StorageService } from '../../common/services/storage.service';

@Injectable()
export class IdentificationInfoService {
    
    private getUserLicenseByIdURI: string = `${resourceServerUrl}/api/user-license/get`;
    private saveUserLicenseURI: string = `${resourceServerUrl}/api/user-license/save`;
    private updateUserLicenseURI: string = `${resourceServerUrl}/api/user-license/update`;
    private deleteUserLicenseURI: string = `${resourceServerUrl}/api/user-license/delete/`;    

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    getAllUserLicense(): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/user-license/get-all?applicantId=${this.storageService.getApplicantId}`, { observe: 'response' });
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
        return this.http.get(encodeURI(`${resourceServerUrl}/api/applicant-info/issuing-authority?text=${text}`), { observe: 'response' });
    }
}
