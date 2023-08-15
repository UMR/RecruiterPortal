import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class AgreementFormInfoService {
  private agreementInfoURI: string = `${resourceServerUrl}/api/user-agreement/get/`;
  private getAgreementFileByApplicantIdURI: string = `${resourceServerUrl}/api/user-agreement/file`;

  constructor(private http: HttpClient) { }

  getAgreementInfo(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.agreementInfoURI + applicantId, { observe: 'response' });
  }
  getAgreementFileByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(`${this.getAgreementFileByApplicantIdURI}/${applicantId}`, { observe: 'response', responseType: 'blob' });
  }
}
