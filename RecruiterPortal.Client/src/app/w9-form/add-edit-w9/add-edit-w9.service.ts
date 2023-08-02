import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { AddEditW9Model } from './add-edit-w9.model';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable()
export class AddEditW9Service {

  private applicantInfoDetailsURI: string = `${resourceServerUrl}/api/applicant-info/details/`;
  private zipcodeCityStateURI: string = `${resourceServerUrl}/api/applicant-info/zipcode-city-state/`;
  private agreementInfoURI: string = `${resourceServerUrl}/api/user-w9/get/`;
  private insertUpdateAgreeInfoURI: string = `${resourceServerUrl}/api/user-w9/save`;

  constructor(private http: HttpClient) { }

  getApplicantInfo(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.applicantInfoDetailsURI + applicantId, { observe: 'response' });
  }

  getZipCodeCityStateByZipCode(zipCode: string): Observable<HttpResponse<any>> {
    if (zipCode != "") {
      return this.http.get(encodeURI(this.zipcodeCityStateURI + zipCode), { observe: 'response' });
    }
    else {
      return this.http.get(encodeURI(this.zipcodeCityStateURI + "all"), { observe: 'response' });
    }
  }
  getW9Info(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.agreementInfoURI + applicantId, { observe: 'response' });
  }
  saveW9Info(agreeInfoModel: AddEditW9Model): Observable<HttpResponse<any>> {
    return this.http.post(this.insertUpdateAgreeInfoURI, agreeInfoModel, { observe: 'response', responseType: 'text' });
  }
}
