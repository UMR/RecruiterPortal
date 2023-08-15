import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class SecondaryService {
  private emrSecondaryInfoURI: string = `${resourceServerUrl}/api/emergency-info/secondary`;
  private getSecondaryInfoURI: string = `${resourceServerUrl}/api/emergency-info/get-emergency-info`;


  constructor(private httpClient: HttpClient) {

  }
  insertEmrInfo(emrInfo: EmergencyInfoModel): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.emrSecondaryInfoURI, emrInfo, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
  emrInfo(applicantId: number) {
    return this.httpClient.get(`${this.getSecondaryInfoURI}/${applicantId}`);
  }
}
