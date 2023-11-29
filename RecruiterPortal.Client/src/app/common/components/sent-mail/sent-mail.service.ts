import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../constants/auth-keys';
import { ApplicantStatusRequestModel } from '../../model/applicantStatusRequestModel';


@Injectable({
    providedIn: 'root'
})
export class SentMailService {

    constructor(private client: HttpClient) { }
   

    sendMail(model: any) {
        return this.client.post(encodeURI(`${resourceServerUrl}/api/MailConfiguration/send-mail`), model);
    }
}
