import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class AddEditService {
  private empInfoURI: string = `${resourceServerUrl}/api/employment`;
  private positionURI: string = `${resourceServerUrl}/api/employment/position/`;
  private institutionURI: string = `${resourceServerUrl}/api/employment/institute/`;


  constructor(private httpClient: HttpClient) {

  }

  insertEmp(empInfo: EmploymentModel): Observable<HttpResponse<any>> {
    console.log(empInfo);
    return this.httpClient.post(this.empInfoURI + "/add", empInfo, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
  getEmpInfo(id: any): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.empInfoURI + "/" + id, { observe: 'response' });
  }
  updaeteEmpInfo(empInfo: EmploymentModel): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.empInfoURI + "/update", empInfo, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
  getPositionByPositionName(posotion: string): Observable<HttpResponse<any>> {
    return this.httpClient.get(encodeURI(this.positionURI + posotion), { observe: 'response' });
  }
  getInsituteByInsituteName(institute: string): Observable<HttpResponse<any>> {
    return this.httpClient.get(encodeURI(this.institutionURI + institute), { observe: 'response' });
  }
}
