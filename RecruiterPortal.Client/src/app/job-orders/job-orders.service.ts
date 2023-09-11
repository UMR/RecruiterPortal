import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private client: HttpClient) { }

    getJobsByAgencyId(page: number, pageSize: number): Observable<HttpResponse<any>> {
        return this.client.get(`${resourceServerUrl}/api/jobs/get_jobs-by-agency-id?page=${page}&pageSize=${pageSize}`, { observe: 'response' });
    }

    getJobById(id: number): Observable<HttpResponse<any>> {
        return this.client.get(`${resourceServerUrl}/api/jobs/get-job-by-id/${id}`, { observe: 'response' });
    }    

    getPositionByPositionName(posotion: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/position?text=${posotion}`), { observe: 'response' });
    }

    getInsituteByInsituteName(institute: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/institute?text=${institute}`), { observe: 'response' });
    }
}
