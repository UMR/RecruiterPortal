import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class ViewByApplicantService {
  private getViewByApplicantSearchURI: string = `${resourceServerUrl}/api/view-by-applicant/get-view-by-applicant-search`;
  private getApplicantFullnameURI: string = `${resourceServerUrl}/api/view-by-applicant/get-applicant-fullname`;
  private getApplicantEmailURI: string = `${resourceServerUrl}/api/view-by-applicant/get-applicant-email`;
  private getImportSyncApplicantURI: string = `${resourceServerUrl}/api/applicant-info/importsync/`;

  constructor(private httpClient: HttpClient) {

  }

  //getViewByApplicantSearch(fullname: string, applicantEmail: string, applicantPhone, take: number, skip: number) {
  //  return this.httpClient.get(this.getViewByApplicantSearchURI,
  //    {
  //      params: new HttpParams()
  //        .set('fullname', fullname)
  //        .set('applicantEmail', applicantEmail)
  //        .set('applicantPhone', applicantPhone)
  //        .set('take', take.toString())
  //        .set('skip', skip.toString())
  //      , observe: 'response'
  //    });
  //}

  getViewByApplicantSearch(model: any) {
    return this.httpClient.post(this.getViewByApplicantSearchURI, model, { observe: 'response' });
  }

  getApplicantFullName(name: string): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.getApplicantFullnameURI,
      {
        params: new HttpParams()
          .set('name', name)
        , observe: 'response'
      });
  }

  getApplicantEmail(email: string): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.getApplicantEmailURI,
      {
        params: new HttpParams()
          .set('email', email)          
        , observe: 'response'
      });
  }

  getImportSyncApplicant(applicantPortalUserId: string): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.getImportSyncApplicantURI + applicantPortalUserId, { observe: 'response' });
  }
}
