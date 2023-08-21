import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../../common/constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class ReferenceService {
    constructor(private http: HttpClient) {
    }

    getAllUserReferenceByUserId(applicantId: number): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/user-reference/applicant-reference/${applicantId}`;
        return this.http.get(URI, { observe: 'response' });
    }

    getUserReferenceById(id: any): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/user-reference/user-reference-by-id/${id}`;
        return this.http.get(URI, { observe: 'response' });
    }

    save(userReference: any): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/user-reference/save`;
        return this.http.post(URI, userReference, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
    update(userReference): Observable<HttpResponse<any>> {
        const URI = `${resourceServerUrl}/api/user-reference/update`;
        return this.http.put(URI, userReference, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    delete(userReferenceId: number) {
        const URI: string = `${resourceServerUrl}/api/user-reference/delete/${userReferenceId}`;
        return this.http.delete(URI);
    }
}
