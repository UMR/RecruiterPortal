import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class MailService {

    constructor(private client: HttpClient) { }

    sendMail(model: any): Observable<HttpResponse<any>> {

        const formData = new FormData();
        formData.append('files', model.files);
        formData.append('fromAddress', model.fromAddress);
        formData.append('toAddress', model.toAddress);
        formData.append('ccAddress', model.ccAddress);
        formData.append('bccAddress', model.bccAddress);
        formData.append('subject', model.subject);
        formData.append('body', model.body);

        if (model.files.length > 0) {
            for (let i = 0; i < model.files.length; i++) {
                formData.append('files', model.files[i], model.files[i].name);
            }
        }

        console.log(formData);

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
