import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class MailService {

    constructor(private client: HttpClient) { }

    sendMail(formData: any): Observable<HttpResponse<any>> {        

        return this.client.post(`${resourceServerUrl}/api/Mail/send-email`, formData, {
             observe: 'response', responseType: 'text'
        });
    }

    sendBulkMail(model: any): Observable<HttpResponse<any>> {
        return this.client.post(`${resourceServerUrl}/api/Mail/send-bulk-email`, model, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
}
