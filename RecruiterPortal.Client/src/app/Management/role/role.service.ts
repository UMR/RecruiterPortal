import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    private getRoleURI: string = `${resourceServerUrl}/api/role/get`;

    constructor(private httpClient: HttpClient) { }

    getRole() {
        return this.httpClient.get(this.getRoleURI, { observe: 'response' });
    }
}
