import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class SentMailService {

    constructor(private client: HttpClient) { }

    sendMail(model: any): Observable<HttpResponse<any>> {
        return this.client.post(`${resourceServerUrl}/api/MailConfiguration/send-mail`, model, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
}
