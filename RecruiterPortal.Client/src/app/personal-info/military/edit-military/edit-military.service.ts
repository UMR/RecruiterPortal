import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../../common/constants/auth-keys';


@Injectable({
  providedIn: 'root'
})
export class EditMilitaryService {

  private getUserMilitaryURI: string = `${resourceServerUrl}/api/user-military/get/`;
  private saveUserMilitaryURI: string = `${resourceServerUrl}/api/user-military/save`;
  private updateUserMilitaryURI: string = `${resourceServerUrl}/api/user-military/update/`;

  constructor(private http: HttpClient) {
  }

  getUserMilitary(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.getUserMilitaryURI + applicantId, { observe: 'response' });
  }

  save(userMilitary: any): Observable<HttpResponse<any>> {
    return this.http.post(this.saveUserMilitaryURI, userMilitary, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
  update(userMilitary): Observable<HttpResponse<any>> {
    return this.http.put(this.updateUserMilitaryURI, userMilitary, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
}
