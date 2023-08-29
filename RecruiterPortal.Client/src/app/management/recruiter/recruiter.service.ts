import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecruiterModel } from './recruiter.model';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
    private getRecruiterURI: string = `${resourceServerUrl}/api/recruiter/get`;
    private addRecruiterURI: string = `${resourceServerUrl}/api/recruiter/save`;

    constructor(private httpClient: HttpClient) { }

    getRecruiter() {
        return this.httpClient.get(this.getRecruiterURI, { observe: 'response' });
    }

    addRecruiter(recruiter: RecruiterModel): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.addRecruiterURI, recruiter, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

}
