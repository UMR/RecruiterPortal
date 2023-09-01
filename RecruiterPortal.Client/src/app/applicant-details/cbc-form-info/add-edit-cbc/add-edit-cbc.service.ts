import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { AddEditCBCModel } from './add-edit-cbc.model';
import { resourceServerUrl } from '../../../common/constants/auth-keys';

@Injectable()
export class AddEditCBCService {
    
    private cbcInfoURI: string = `${resourceServerUrl}/api/user-cbc/get/`;
    private insertUpdateCBCInfoURI: string = `${resourceServerUrl}/api/user-cbc/save`;

    constructor(private http: HttpClient) { }

    getZipCodeCityStateByZipCode(zipCode: string = ""): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/applicant-info/zipcode-city-state?zipCode=${zipCode}`;
        return this.http.get(URI, { observe: 'response' });
    }

    getCBCInfo(applicantId: number): Observable<HttpResponse<any>> {
        return this.http.get(this.cbcInfoURI + applicantId, { observe: 'response' });
    }

    saveCBCInfo(cbcInfoModel: AddEditCBCModel): Observable<HttpResponse<any>> {
        return this.http.post(this.insertUpdateCBCInfoURI, cbcInfoModel, { observe: 'response', responseType: 'text' });
    }
}
