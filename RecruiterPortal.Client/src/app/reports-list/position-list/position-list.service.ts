import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class PositionListService {

    constructor(private http: HttpClient) {
    }

    getPositions(page: number, pageSize: number): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/position/get-all?page=${page}&pageSize=${pageSize}`, { observe: 'response' });
    }

    getPositionById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/position/get-by-id/${id}`, { observe: 'response' });
    }

    isExistPositionName(name: string, id: number): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/api/position/is-exist-position-name?name=${name}&id=${id}`, { observe: 'response' });
    }

    savePosition(position: any): Observable<HttpResponse<any>> {
        return this.http.post(`${resourceServerUrl}/api/position/save`, position, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    updatePosition(position: any): Observable<HttpResponse<any>> {
        return this.http.put(`${resourceServerUrl}/api/position/update`, position, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    deletePosition(id): Observable<HttpResponse<any>> {
        return this.http.delete(`${resourceServerUrl}/api/position/delete/${id}`, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

}
