import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class AddEditService {

    private empInfoURI: string = `${resourceServerUrl}/api/employment`;

    constructor(private httpClient: HttpClient) {

    }

    insertEmployment(employment: EmploymentModel): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.empInfoURI + "/add", employment, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    getEmploymentById(id: any): Observable<HttpResponse<any>> {
        return this.httpClient.get(this.empInfoURI + "/" + id, { observe: 'response' });
    }

    updaeteEmployment(employment: EmploymentModel): Observable<HttpResponse<any>> {
        return this.httpClient.put(this.empInfoURI + "/update", employment, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    getPositionByPositionName(posotion: string): Observable<HttpResponse<any>> {
        return this.httpClient.get(encodeURI(`${resourceServerUrl}/api/employment/position?text=${posotion}`), { observe: 'response' });
    }

    getInsituteByInsituteName(institute: string): Observable<HttpResponse<any>> {
        return this.httpClient.get(encodeURI(`${resourceServerUrl}/api/employment/institute?text=${institute}`), { observe: 'response' });
    }
}
