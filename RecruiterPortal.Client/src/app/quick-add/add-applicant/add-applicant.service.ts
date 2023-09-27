import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpBackend, HttpClient } from '@angular/common/http';
import { ApplicantModel } from '../../common/model/applicant';
import { resourceServerUrl } from '../../common/constants/auth-keys';


@Injectable({
  providedIn: 'root'
})
export class AddApplicantService {

    private addApplicantURI: string = `${resourceServerUrl}/api/applicant-info/save`;
    private getUserURI: string = `${resourceServerUrl}/api/applicant-info/`;

    constructor(private http: HttpClient) {
    }

    addApplicant(applicantModel: ApplicantModel) {
        return this.http.post(this.addApplicantURI, applicantModel);
    }
     
    getApplicantByEmail(email: any): Observable<HttpResponse<any>> {
        return this.http.get(this.getUserURI + email, { observe: 'response' });
    }
}
