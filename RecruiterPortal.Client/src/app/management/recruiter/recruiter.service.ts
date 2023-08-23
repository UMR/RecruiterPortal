import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
    private getRecruiterURI: string = `${resourceServerUrl}/api/recruiter/get`;

    constructor(private httpClient: HttpClient) { }

    getRecruiter() {
        return this.httpClient.get(this.getRecruiterURI, { observe: 'response' });
    }
}
