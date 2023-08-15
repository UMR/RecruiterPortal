import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class EmergencyInfoService {
  private getEmergencyInfoURI: string = `${resourceServerUrl}/api/emergency-info/get-emergency-info`;
  private getPrimaryEmergencyInfoURI: string = `${resourceServerUrl}/api/emergency-info/get-primary-emergency-info`;
  private getEmergencyInfoFileByApplicantIdURI: string = `${resourceServerUrl}/api/emergency-info/get-emergency-info-file`;
  private insertPrimaryEmergencyInfoURI: string = `${resourceServerUrl}/api/emergency-info/primary`;
  private insertSecondaryEmergencyInfoURI: string = `${resourceServerUrl}/api/emergency-info/secondary`;

  constructor(private httpClient: HttpClient) {

  } 

  getEmergencyInfoByApplicantId(applicantId: number) {
    return this.httpClient.get(`${this.getEmergencyInfoURI}/${applicantId}`);
  }

  getEmergencyInfoFileByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getEmergencyInfoFileByApplicantIdURI}/${applicantId}`, { observe: 'response', responseType: 'blob' });
  }

  getPrimaryEmergencyInfoByApplicantId(applicantId: number) {
    return this.httpClient.get(`${this.getPrimaryEmergencyInfoURI}/${applicantId}`);
  }

  insertPrimaryEmergencyInfo(emergencyInfo: EmergencyInfoModel): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.insertPrimaryEmergencyInfoURI, emergencyInfo, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }  
  
  insertSecondaryEmergencyInfo(emrInfo: EmergencyInfoModel): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.insertSecondaryEmergencyInfoURI, emrInfo, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
}
