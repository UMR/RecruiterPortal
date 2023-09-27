import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class MailSettingsService {
    
    constructor(private client: HttpClient) { }

    getRecruiterMailConfigsByRecruiterId(): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/recruitermailconfig/get-by-recruiterid`, { observe: 'response' });
    } 

    getMailTemplate(configId: number, mailTemplateId: number): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/mailtemplate/get-mail-template/${configId}/${mailTemplateId}`, { observe: 'response' });
    }     

    save(model: any): Observable<HttpResponse<any>> {
        return this.client.post(`${resourceServerUrl}/api/mailtemplate/save-mail-template`, model, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
    
}
