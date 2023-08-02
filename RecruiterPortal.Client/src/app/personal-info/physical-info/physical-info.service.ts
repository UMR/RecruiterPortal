import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../common/constants/auth-keys';


@Injectable({
  providedIn: 'root'
})
export class PhysicalInfoService {

  private getPhysicalInfoURI: string = `${resourceServerUrl}/api/user-physical/get/`;

  constructor(private http: HttpClient) {
  }

  getPhysicalInfo(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.getPhysicalInfoURI + applicantId, { observe: 'response' });
  }
}
