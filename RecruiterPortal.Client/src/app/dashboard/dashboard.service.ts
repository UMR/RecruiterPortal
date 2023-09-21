import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private getApplicantURI: string = `${resourceServerUrl}/api/applicant-info/get-applicant-count`;
    private getJobURI: string = `${resourceServerUrl}/api/jobs/get-count`;


    constructor(private http: HttpClient) { }

    getApplicantCount(): Observable<HttpResponse<any>> {
        return this.http.get(this.getApplicantURI, { observe: 'response' });
    }
    getJobCount(): Observable<HttpResponse<any>> {
        return this.http.get(this.getJobURI, { observe: 'response' });
    }
}
