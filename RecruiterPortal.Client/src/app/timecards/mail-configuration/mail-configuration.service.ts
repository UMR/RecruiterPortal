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

    saveToken(model: any): Observable<HttpResponse<any>> {
        return this.client.post(`${resourceServerUrl}/api/mailconfiguration/save-token`, model, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    } 

    getGmailService(email: string): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/mailconfiguration/get-gmail-service/${email}`, { observe: "response" });            
    }  
    
    getMailConfigsByRecruiterId(): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/mailconfiguration/get-mail-config-by-recruiterid`, { observe: "response" });            
    }      

    deleteMailConfig(id: number): Observable<HttpResponse<any>> {
        return this.client.delete(`${resourceServerUrl}/api/mailconfiguration/delete-mail-config/${id}`, { observe: 'response' });
    }    
}
