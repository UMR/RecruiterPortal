import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private getRecruiterURI: string = `${resourceServerUrl}/api/role/recruiter`;

    constructor(private httpClient: HttpClient) { }

    getUser() {
        return this.httpClient.get(this.getRecruiterURI, { observe: 'response' });
    }
}
