import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
  providedIn: 'root'
})
export class RefusedService {

    constructor(private client: HttpClient) { }

    getApplicantStatus(statusId: any): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/applicantstatus/get-applicant-by-status/` + statusId), { observe: 'response' });
    }
}
