import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class TermsConditionsService {

    private zipcodeCityStateURI: string = `${resourceServerUrl}/api/applicant-info/zipcode-city-state/`;
    private getTermsConditionsByApplicantIdURI: string = `${resourceServerUrl}/api/terms-conditions/get-terms-conditions`;
    private getTermsConditionsFileByApplicantIdURI: string = `${resourceServerUrl}/api/terms-conditions/get-terms-conditions-file`;
    private saveTermsConditionsURI: string = `${resourceServerUrl}/api/terms-conditions/save-terms-conditions`;

    constructor(private httpClient: HttpClient) {

    }

    getZipCodeCityStateByZipCode(zipCode: string = ""): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/applicant-info/zipcode-city-state?zipCode=${zipCode}`;
        return this.httpClient.get(URI, { observe: 'response' });
    }

    getTermsConditionsByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
        return this.httpClient.get(`${this.getTermsConditionsByApplicantIdURI}/${applicantId}`, { observe: 'response' });
    }

    getTermsConditionsFileByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
        return this.httpClient.get(`${this.getTermsConditionsFileByApplicantIdURI}/${applicantId}`, { observe: 'response', responseType: 'blob' });
    }

    save(termsConditionsForm: any): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.saveTermsConditionsURI, termsConditionsForm, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

}
