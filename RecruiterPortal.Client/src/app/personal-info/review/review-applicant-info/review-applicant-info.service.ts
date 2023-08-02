import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { resourceServerUrl } from '../../../common/constants/auth-keys';
import { StorageService } from '../../../common/services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ReviewApplicantInfoService {

  private applicantInfoDetailsURI: string = `${resourceServerUrl}/api/applicant-info/details/`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getApplicantInfo(): Observable<HttpResponse<any>> {
    return this.http.get(this.applicantInfoDetailsURI + this.storageService.getApplicantId, { observe: 'response' });
  }

}
