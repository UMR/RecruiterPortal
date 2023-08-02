import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { StorageService } from '../common/services/storage.service';

@Injectable()
export class USCISInfoService {
  private getUSCISInfoURI: string = `${resourceServerUrl}/api/user-uscis/get`;
  private geteUSCISByApplicantIdURI: string = `${resourceServerUrl}/api/user-uscis/file/`;

  constructor(private httpClient: HttpClient, private storageService: StorageService, private http: HttpClient) {

  }

  getUSCISInfo() {
    return this.httpClient.get(this.getUSCISInfoURI + '/' + this.storageService.getApplicantId , { observe: 'response' });
  }

  getUSCISFile(applicantId: number): Observable<HttpResponse<any>> {
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    })
    return this.http.get(this.geteUSCISByApplicantIdURI + this.storageService.getApplicantId, { headers: headerOptions, responseType: 'blob' as 'blob', observe: 'response' });
    //return this.http.get(this.getEmploymentApplicantionByApplicantIdURI + this.storageService.getApplicantId, { observe: 'response' });
  }
}
