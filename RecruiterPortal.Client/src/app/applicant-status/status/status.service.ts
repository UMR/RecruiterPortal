import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    constructor(private client: HttpClient) { }

    getPositionByPositionName(posotion: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/position?text=${posotion}`), { observe: 'response' });
    }

    getInsituteByInsituteName(institute: string): Observable<HttpResponse<any>> {
        return this.client.get(encodeURI(`${resourceServerUrl}/api/employment/institute?text=${institute}`), { observe: 'response' });
    }
}
