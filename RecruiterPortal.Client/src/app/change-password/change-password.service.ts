import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class ChangePasswordService {
  private changePasswordURI: string = `${resourceServerUrl}/api/recruiter/change-password`;


  constructor(private httpClient: HttpClient) {

  }

  changePassword(chngPassModel: ChangePasswordModel): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.changePasswordURI, chngPassModel, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
}
