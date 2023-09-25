import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class MailSettingsService {

    constructor(private client: HttpClient) { }

    getMailTemplateTypesByRecruiterId(): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/mailtemplate/get-mail-template-types-by-recruiterid`, { observe: 'response' });
    }
    
}
