import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class FormListService {

    constructor(private http: HttpClient) {
    }

    getOfficialFilesByAgencyId(page: number, pageSize: number): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/officialfile/get-by-agencyid?page=${page}&pageSize=${pageSize}`, { observe: 'response' });
    }

    getOfficialFileById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/officialfile/get-by-id/${id}`, { observe: 'response' });
    }

    saveOfficialFile(officialFile: any): Observable<HttpResponse<any>> {
        return this.http.post(`${resourceServerUrl}/api/officialfile/save`, officialFile, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    updateOfficialFile(officialFile: any): Observable<HttpResponse<any>> {
        return this.http.put(`${resourceServerUrl}/api/officialfile/update`, officialFile, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    deleteOfficialFile(id): Observable<HttpResponse<any>> {
        return this.http.delete(`${resourceServerUrl}/api/officialfile/delete/${id}`, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    getOfficialFileDataById(id: number): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/officialfile/download/${id}`, { observe: 'response', responseType: 'blob' });
    }
}
