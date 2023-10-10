import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class MailConfigurationService {    

    constructor(private client: HttpClient) { }

    getAuthorizationUrl(model: any): Observable<any> {        
        return this.client.post(`${resourceServerUrl}/api/mailconfiguration/get-authorization-url`, model, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }    

    save(job: any): Observable<HttpResponse<any>> {
        return this.client.post(`${resourceServerUrl}/api/mailtemplate/save-mail-template-type`, job, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.client.delete(`${resourceServerUrl}/api/mailtemplate/delete-mail-template-type/${id}`, { observe: 'response' });
    }
    
}
