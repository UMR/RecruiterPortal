import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

    constructor(private http: HttpClient) { }

    getEvents() {
        //return this.http.get('https://www.primefaces.org/primeng-v8-lts/assets/showcase/data/scheduleevents.json', { observe: 'response' })
            //.toPromise()
            //.then(res => <any[]>res.json().data)
            //.then(data => { return data; });
    }
}
