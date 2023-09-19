import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InstitutionListService {
    private getUserURI: string = `${resourceServerUrl}/api/institution/get-all-by-filter`;

    constructor(private http: HttpClient) { }

    getAllInstitute(instituteModel: any): Observable<HttpResponse<any>> {
        return this.http.post(this.getUserURI, instituteModel, { observe: 'response' });
    }

}
