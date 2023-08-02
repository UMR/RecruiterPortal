import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class AgencyProfileService {

  private getAgencyByUserIdURI: string = `${resourceServerUrl}/api/agency/get-agency-by-userid`;
  private isAgencyOwnerURI: string = `${resourceServerUrl}/api/agency/is-agency-owner`;
  private updateAgencyProfileURI: string = `${resourceServerUrl}/api/agency/update-agency`;

  constructor(private httpClient: HttpClient) {

  }

  getAgencyByUserId(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getAgencyByUserIdURI}`, { observe: 'response' });
  }

  isAgencyOwner(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.isAgencyOwnerURI}`, { observe: 'response' });
  }

  updateAgency(agencyModel: any): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.updateAgencyProfileURI, agencyModel, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

}
