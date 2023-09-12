import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private client: HttpClient) { }

    getJobsByAgencyId(skip: number, take: number): Observable<HttpResponse<any>> {
        return this.client.get(`${resourceServerUrl}/api/jobs/get-by-agency-id/${skip}/${take}`, { observe: 'response' });
    }

    getJobById(id: number): Observable<HttpResponse<any>> {
        return this.client.get(`${resourceServerUrl}/api/jobs/get-by-id/${id}`, { observe: 'response' });
    }    

    getPositionByPositionName(posotion: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/position?text=${posotion}`), { observe: 'response' });
    }

    getInsituteByInsituteName(institute: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/institute?text=${institute}`), { observe: 'response' });
    }

    save(job: any): Observable<HttpResponse<any>> {
        return this.client.post(`${resourceServerUrl}/api/jobs/save`, job, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });        
    }
}
