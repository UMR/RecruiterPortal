import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/auth-keys';

@Injectable({
    providedIn: 'root'
})
export class MailTemplateService {

    private mailTemplateTypesSubject = new BehaviorSubject<any>([]);
    public mailTemplateTypes$ = this.mailTemplateTypesSubject.asObservable();

    constructor(private client: HttpClient) { }

    getMailTemplateTypesByRecruiterId(): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/mailtemplate/get-mail-template-types-by-recruiterid`, { observe: 'response' });
    }

    getMailTemplateTypeById(id: number): Observable<any> {
        return this.client.get(`${resourceServerUrl}/api/mailtemplate/get-mail-template-type-by-id/${id}`, { observe: 'response' });
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

    setMailTemplateTypes(mailTemplateType: any) {
        this.mailTemplateTypesSubject.next(mailTemplateType);
    }
}
