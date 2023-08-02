import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../common/constants/auth-keys';


@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  private getAllUserReferenceByUserIdURI: string = `${resourceServerUrl}/api/user-reference/applicant-reference/`;
  private getUserReferenceByIdURI: string = `${resourceServerUrl}/api/user-reference/`;
  private saveUserReferenceURI: string = `${resourceServerUrl}/api/user-reference/save`;
  private updateUserReferenceURI: string = `${resourceServerUrl}/api/user-reference/update`;
  private deleteUserReferenceURI: string = `${resourceServerUrl}/api/user-reference/delete/`;

  constructor(private http: HttpClient) {
  }

  getAllUserReferenceByUserId(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.getAllUserReferenceByUserIdURI + applicantId, { observe: 'response' });
  }

  getUserReferenceById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(this.getUserReferenceByIdURI + "/" + id, { observe: 'response' });
  }

  save(userReference: any): Observable<HttpResponse<any>> {
    return this.http.post(this.saveUserReferenceURI, userReference, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
  update(userReference): Observable<HttpResponse<any>> {
    return this.http.put(this.updateUserReferenceURI, userReference, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  delete(userReferenceId: number) {
    return this.http.delete(this.deleteUserReferenceURI + userReferenceId);
  }
}
