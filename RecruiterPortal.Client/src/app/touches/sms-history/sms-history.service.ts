import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class SmsHistoryService {

    constructor(private client: HttpClient) { }

    getSmsHistory(): Observable<HttpResponse<any>> {
        return this.client.get(`${resourceServerUrl}/api/sms/get`, { observe: 'response' });
    }
}
