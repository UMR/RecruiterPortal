import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../../common/constants/auth-keys';
import { StorageService } from '../../../common/services/storage.service';


@Injectable({
    providedIn: 'root'
})
export class EditUSCISService {

    private userUSCISURI: string = `${resourceServerUrl}/api/user-uscis`;
    private getUserUSCISURI: string = `${resourceServerUrl}/api/user-uscis/get`;
    private saveUserUSCISURI: string = `${resourceServerUrl}/api/user-uscis/save`;    

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    getUserUSCIS(): Observable<HttpResponse<any>> {
        return this.http.get(this.getUserUSCISURI + '/' + this.storageService.getApplicantId, { observe: 'response' });
    }

    getZipCodeCityStateByZipCode(zipCode: string = ""): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/applicant-info/zipcode-city-state?zipCode=${zipCode}`;
        return this.http.get(URI, { observe: 'response' });
    }

    save(userUSCIS: any): Observable<HttpResponse<any>> {        
        return this.http.post(this.saveUserUSCISURI, userUSCIS, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    deleteUSCISInfo(id: any) {
        return this.http.delete(this.userUSCISURI + "/delete/" + id);
    }
}
