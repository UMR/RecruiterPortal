import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { HttpClient } from '@angular/common/http';
import { SearchModel } from './searchModel';

@Injectable({
    providedIn: 'root'
})
export class RecruiterHistoryService {

    constructor(private client: HttpClient) { }

    getRecruiterEntryExit(searchModel: SearchModel): Observable<any> {
        return this.client.post(`${resourceServerUrl}/api/recruiter/entry-exit`, searchModel, { observe: 'response' });
    }
}
