import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
  providedIn: 'root'
})
export class AddInstitutionService {

    constructor(private http: HttpClient) { }

    getZipCodeCityStateByZipCode(zipCode: string = ""): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/applicant-info/zipcode-city-state?zipCode=${zipCode}`;
        return this.http.get(URI, { observe: 'response' });
    }
}
