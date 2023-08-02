import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { StorageService } from '../common/services/storage.service';

@Injectable()
export class HepabHippaInfoService {
  private getHepaBHIPPAInfoURI: string = `${resourceServerUrl}/api/hepab-hippa/get`;
  private getepaBHIPPAByApplicantIdURI: string = `${resourceServerUrl}/api/hepab-hippa/hippa-hepa-file/`;

  constructor(private http: HttpClient, private storageService: StorageService) {

  }

  getHepaBHIPPAInfo(): Observable<HttpResponse<any>> {
    return this.http.get(this.getHepaBHIPPAInfoURI + '/' + this.storageService.getApplicantId, { observe: 'response' });
  }

  getHepaBHIPPAFile(applicantId: number): Observable<HttpResponse<any>> {
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    })
    return this.http.get(this.getepaBHIPPAByApplicantIdURI + this.storageService.getApplicantId, { headers: headerOptions, responseType: 'blob' as 'blob', observe: 'response' });
    //return this.http.get(this.getEmploymentApplicantionByApplicantIdURI + this.storageService.getApplicantId, { observe: 'response' });
  }


  getFileName(response: HttpResponse<Blob>) {
    let filename: string;
    try {
      const contentDisposition = response.headers.get('content-disposition');
      filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
    }
    catch (e) {
      filename = 'myfile.pdf'
    }
    return filename
  }
}
