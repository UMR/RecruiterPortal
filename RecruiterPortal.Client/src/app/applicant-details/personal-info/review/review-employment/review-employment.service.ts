import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../../../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { StorageService } from '../../../../common/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewEmploymentService {

  private getEmpInfoURI: string = `${resourceServerUrl}/api/employment`;

  constructor(private httpClient: HttpClient, private storageService: StorageService) {

  }

  getEmpInfo() {
    return this.httpClient.get(this.getEmpInfoURI + "/all/" + this.storageService.getApplicantId);
  }
}
