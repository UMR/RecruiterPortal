import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../constants/auth-keys';
import { ApplicantStatusRequestModel } from '../../model/applicantStatusRequestModel';


@Injectable({
    providedIn: 'root'
})
export class SentMailService {

    constructor(private client: HttpClient) { }

    getStatus(): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/applicantstatus/get-status`), { observe: 'response' });
    }

    getPositionByPositionName(posotion: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/position?text=${posotion}`), { observe: 'response' });
    }

    getInsituteByInsituteName(institute: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/institute?text=${institute}`), { observe: 'response' });
    }

    addApplicantStatus(applicantStatusModel: ApplicantStatusRequestModel) {
        return this.client.post(encodeURI(`${resourceServerUrl}/api/applicantstatus/save`), applicantStatusModel);
    }
}
