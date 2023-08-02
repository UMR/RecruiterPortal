import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../common/constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class LicenseService {

    private getAllUserLicenseURI: string = `${resourceServerUrl}/api/user-license/get-all`;
    private getUserLicenseByIdURI: string = `${resourceServerUrl}/api/user-license/get`;
    private saveUserLicenseURI: string = `${resourceServerUrl}/api/user-license/save`;
    private updateUserLicenseURI: string = `${resourceServerUrl}/api/user-license/update`;
    private deleteUserLicenseURI: string = `${resourceServerUrl}/api/user-license/delete/`;

    constructor(private http: HttpClient) {
    }

    getAllUserLicense(): Observable<HttpResponse<any>> {
        return this.http.get(this.getAllUserLicenseURI, { observe: 'response' });
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

    update(userLicense:any): Observable<HttpResponse<any>> {
        return this.http.put(this.updateUserLicenseURI, userLicense, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    delete(userLicenseId: number) {
        return this.http.delete(this.deleteUserLicenseURI + userLicenseId);
    }
}
