import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../../common/constants/auth-keys';


@Injectable({
  providedIn: 'root'
})
export class EditPhysicalInfoService {

  private getPhysicalInfoURI: string = `${resourceServerUrl}/api/user-physical/get/`;
  private savePhysicalInfoURI: string = `${resourceServerUrl}/api/user-physical/save`;
  private updatePhysicalInfoURI: string = `${resourceServerUrl}/api/user-physical/update/`;
  private raceURI: string = `${resourceServerUrl}/api/applicant-info/race/`;
  private eyeColorURI: string = `${resourceServerUrl}/api/applicant-info/eye-color/`;
  private HairColorURI: string = `${resourceServerUrl}/api/applicant-info/hair-color/`;

  constructor(private http: HttpClient) {
  }

  getPhysicalInfo(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.getPhysicalInfoURI + applicantId, { observe: 'response' });
  }

  save(userPhysical: any): Observable<HttpResponse<any>> {
    return this.http.post(this.savePhysicalInfoURI, userPhysical, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  update(userPhysical): Observable<HttpResponse<any>> {
    return this.http.put(this.updatePhysicalInfoURI, userPhysical, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  getAllRaces(): Observable<HttpResponse<any>> {
    return this.http.get(encodeURI(this.raceURI), { observe: 'response' });
  }

  getAllEyeColor(): Observable<HttpResponse<any>> {
    return this.http.get(encodeURI(this.eyeColorURI), { observe: 'response' });
  }

  getAllHairColor(): Observable<HttpResponse<any>> {
    return this.http.get(encodeURI(this.HairColorURI), { observe: 'response' });
  }
}
