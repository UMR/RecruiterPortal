import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecruiterModel } from './recruiter.model';
import { RecruiterSearchModel } from './recruiter-search.model';

@Injectable({
    providedIn: 'root'
})
export class RecruiterService {
    private getRecruiterURI: string = `${resourceServerUrl}/api/recruiter/get`;
    private getRecruiterFilterURI: string = `${resourceServerUrl}/api/recruiter/get-recruiter-by-filter`;
    private addRecruiterURI: string = `${resourceServerUrl}/api/recruiter/save`;
    private updateStatusRecruiterURI: string = `${resourceServerUrl}/api/recruiter/update-status`;
    private updateRecruiterURI: string = `${resourceServerUrl}/api/recruiter/update`;

    constructor(private httpClient: HttpClient) { }

    getRecruiter() {
        return this.httpClient.get(this.getRecruiterURI, { observe: 'response' });
    }

    getRecruiterByFilter(searchParam: RecruiterSearchModel) {
        return this.httpClient.post(this.getRecruiterFilterURI, searchParam, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response'
        });
    }

    addRecruiter(recruiter: RecruiterModel): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.addRecruiterURI, recruiter, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    updateRecruiter(recruiter: RecruiterModel): Observable<HttpResponse<any>> {
        return this.httpClient.put(this.updateRecruiterURI, recruiter, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    updateRecruiterStatus(recruiter: number, status: boolean): Observable<HttpResponse<any>> {
        return this.httpClient.put(this.updateStatusRecruiterURI + "?recruiterId=" + recruiter + "&status=" + status, null, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

}
