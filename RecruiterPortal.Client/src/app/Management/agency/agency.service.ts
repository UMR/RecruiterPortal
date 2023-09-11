import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { AgencyModel } from './agency.model';

@Injectable({
    providedIn: 'root'
})
export class AgencyService {

    private getAgencyURI: string = `${resourceServerUrl}/api/agency/get`;
    private addAgencyURI: string = `${resourceServerUrl}/api/agency/save`;
    private updateAgencyURI: string = `${resourceServerUrl}/api/agency/update`;

    constructor(private httpClient: HttpClient) { }

    getAgency() {
        return this.httpClient.get(this.getAgencyURI, { observe: 'response' });
    }

    addAgency(recruiter: AgencyModel): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.addAgencyURI, recruiter, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    updateAgency(recruiter: AgencyModel): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.updateAgencyURI, recruiter, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
}
