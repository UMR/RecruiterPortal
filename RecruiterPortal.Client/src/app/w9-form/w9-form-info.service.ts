import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class W9FormInfoService {
  private w9InfoURI: string = `${resourceServerUrl}/api/user-w9/get/`;
  private getW9FileByApplicantIdURI: string = `${resourceServerUrl}/api/user-w9/file`;

  constructor(private http: HttpClient) { }

  getW9Info(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.w9InfoURI + applicantId, { observe: 'response' });
  }
  getW9FileByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.getW9FileByApplicantIdURI}/${applicantId}`, { observe: 'response', responseType: 'blob' });
  }
}
