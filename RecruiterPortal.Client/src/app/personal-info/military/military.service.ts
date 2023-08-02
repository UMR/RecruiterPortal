import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../common/constants/auth-keys';


@Injectable({
  providedIn: 'root'
})
export class MilitaryService {

  private getUserMilitaryURI: string = `${resourceServerUrl}/api/user-military/get/`;

  constructor(private http: HttpClient) {
  }

  getUserMilitary(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.getUserMilitaryURI + applicantId, { observe: 'response' });
  }
}
