import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../common/constants/auth-keys';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
    private getAgencyByUserIdURI: string = `${resourceServerUrl}/api/interviewschedule/get`;
    constructor(private http: HttpClient) { }

    getInterviewScheduleById(): Observable<HttpResponse<any>> {
        return this.http.get(`${this.getAgencyByUserIdURI}`, { observe: 'response' });
    }
}
