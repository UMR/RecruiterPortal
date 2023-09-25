import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class MailSettingsService {
    
    constructor(private client: HttpClient) { }

    getRecruiterMailConfigsByRecruiterId(): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/recruitermailconfig/get-by-recruiterid`, { observe: 'response' });
    }    
    
}
