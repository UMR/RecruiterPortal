import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { StorageService } from '../../common/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddEditHepabHippaInfoService {
  private userHepaBHIPPAURI: string = `${resourceServerUrl}/api/hepab-hippa`;
  private getUserHepaBHIPPAURI: string = `${resourceServerUrl}/api/hepab-hippa/get`;
  private saveUserHepaBHIPPAURI: string = `${resourceServerUrl}/api/hepab-hippa/save`;

  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  getUserHepaBHIPPA(): Observable<HttpResponse<any>> {
    return this.http.get(this.getUserHepaBHIPPAURI + '/' + this.storageService.getApplicantId, { observe: 'response' });
  }

  save(userHepaBHIPPA: any): Observable<HttpResponse<any>> {
    //console.log(userUSCIS);
    return this.http.post(this.saveUserHepaBHIPPAURI, userHepaBHIPPA, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }


  deleteHepaBHIPPAInfo(id: any) {
    return this.http.delete(this.userHepaBHIPPAURI + "/delete/" + id);
  }
}
