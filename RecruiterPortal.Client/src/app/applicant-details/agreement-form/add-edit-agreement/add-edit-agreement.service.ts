import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { AddEditAgreementModel } from './add-edit-Agreement.model';
import { resourceServerUrl } from '../../../common/constants/auth-keys';

@Injectable()
export class AddEditAgreementService {

  private zipcodeCityStateURI: string = `${resourceServerUrl}/api/applicant-info/zipcode-city-state/`;
  private agreementInfoURI: string = `${resourceServerUrl}/api/user-agreement/get/`;
  private insertUpdateAgreeInfoURI: string = `${resourceServerUrl}/api/user-agreement/save`;

  constructor(private http: HttpClient) { }

  getZipCodeCityStateByZipCode(zipCode: string = ""): Observable<HttpResponse<any>> {
    if (zipCode != "") {
      return this.http.get(encodeURI(this.zipcodeCityStateURI + zipCode), { observe: 'response' });
    }
    else {
      return this.http.get(encodeURI(this.zipcodeCityStateURI + "all"), { observe: 'response' });
    }
  }
  getAgreementInfo(applicantId: number): Observable<HttpResponse<any>> {
    return this.http.get(this.agreementInfoURI + applicantId, { observe: 'response' });
  }
  saveAgreementInfo(agreeInfoModel: AddEditAgreementModel): Observable<HttpResponse<any>> {
    return this.http.post(this.insertUpdateAgreeInfoURI, agreeInfoModel, { observe: 'response', responseType: 'text' });
  }
}
