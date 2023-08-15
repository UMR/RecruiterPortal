import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class CBCFormInfoService {
  private cbcInfoURI: string = `${resourceServerUrl}/api/user-cbc/get/`;
  private getCBCFileByApplicantIdURI: string = `${resourceServerUrl}/api/user-cbc/file`;

  constructor(private http: HttpClient) { }

  getCBCInfo(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.cbcInfoURI + applicantId, { observe: 'response' });
  }
  getCBCFileByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.getCBCFileByApplicantIdURI}/${applicantId}`, { observe: 'response', responseType: 'blob' });
  }
}
