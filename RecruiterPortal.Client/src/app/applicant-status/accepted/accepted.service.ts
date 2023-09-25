import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcceptedService {

    constructor(private client: HttpClient) { }

    getApplicantStatus(statusId: any): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/applicantstatus/get-applicant-by-status/` + statusId), { observe: 'response' });
    }
}
