import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private client: HttpClient) { }

    getJobs(page: number, pageSize: number): Observable<HttpResponse<any>> {
        return this.client.get(`${resourceServerUrl}/api/jobs/get_jobs?page=${page}&pageSize=${pageSize}`, { observe: 'response' });
    }
}
