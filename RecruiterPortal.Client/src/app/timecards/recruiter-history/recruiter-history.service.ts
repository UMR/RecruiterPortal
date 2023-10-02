import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RecruiterHistoryService {

    constructor(private client: HttpClient) { }

    getRecruiterEntryExit(take: any, skip: any): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/recruiter/entry-exit?take=${take}&skip=${skip}`, { observe: 'response' });
    }
}
