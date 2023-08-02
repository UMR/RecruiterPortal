import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class NurseFormService {

  private getNurseFormByApplicantIdURI: string = `${resourceServerUrl}/api/nurse-form/get-nurse-form`;
  private getNurseFormFileByApplicantIdURI: string = `${resourceServerUrl}/api/nurse-form/get-nurse-form-file`;
  private saveNurseFormByURI: string = `${resourceServerUrl}/api/nurse-form/save-nurse-form`;

  constructor(private httpClient: HttpClient) {

  }

  getNurseFormByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getNurseFormByApplicantIdURI}/${applicantId}`, { observe: 'response' });
  }

  getNurseFormFileByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getNurseFormFileByApplicantIdURI}/${applicantId}`, { observe: 'response', responseType: 'blob' });
  }

  save(nurseForm: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.saveNurseFormByURI, nurseForm, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

}
