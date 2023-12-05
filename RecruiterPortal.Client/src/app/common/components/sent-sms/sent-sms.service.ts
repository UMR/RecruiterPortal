import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class SentSMSService {

    constructor(private client: HttpClient) { }

    sendSMS(model: any): Observable<HttpResponse<any>> {
        return this.client.post(`${resourceServerUrl}/api/sms/send`, model, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    getApplicantPhone(applicantId: any): Observable<HttpResponse<any>> {
        return this.client.get(`${resourceServerUrl}/api/applicant-info/details/` + applicantId, { observe: 'response' });
    }
}
