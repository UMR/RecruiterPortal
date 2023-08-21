import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class AgencyService {

    private getAgencyURI: string = `${resourceServerUrl}/api/agency/get`;

    constructor(private httpClient: HttpClient) { }
    getAgency() {
        return this.httpClient.get(this.getAgencyURI, { observe: 'response' });
    }
}
