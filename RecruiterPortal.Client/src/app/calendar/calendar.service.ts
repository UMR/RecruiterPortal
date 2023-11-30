import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { InterViewScheduleModel } from './interview-schedule';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
    private getInterviewScheduleURI: string = `${resourceServerUrl}/api/interviewschedule/get`;
    private saveInterviewScheduleURI: string = `${resourceServerUrl}/api/interviewschedule/save`;
    constructor(private httpClient: HttpClient) { }

    getInterviewScheduleById(): Observable<HttpResponse<any>> {
        return this.httpClient.get(`${this.getInterviewScheduleURI}`, { observe: 'response' });
    }
    addInterviewSchedule(resuest: InterViewScheduleModel): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.saveInterviewScheduleURI, resuest, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
}
