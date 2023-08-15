import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class InfluenzaVaccinationService {

  private getInfluenzaVaccinationByApplicantIdURI: string = `${resourceServerUrl}/api/influenza-vaccination/get-influenza-vaccination`;
  private getInfluenzaVaccinationFileByApplicantIdURI: string = `${resourceServerUrl}/api/influenza-vaccination/get-influenza-vaccination-file`;
  private saveInfluenzaVaccinationURI: string = `${resourceServerUrl}/api/influenza-vaccination/save-influenza-vaccination`;

  constructor(private httpClient: HttpClient) {

  }

  getInfluenzaVaccinationByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getInfluenzaVaccinationByApplicantIdURI}/${applicantId}`, { observe: 'response' });
  }

  save(influenzaVaccinationForm: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.saveInfluenzaVaccinationURI, influenzaVaccinationForm, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  getInfluenzaVaccinationFileByApplicantId(applicantId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getInfluenzaVaccinationFileByApplicantIdURI}/${applicantId}`, { observe: 'response', responseType: 'blob' });
  }

}
