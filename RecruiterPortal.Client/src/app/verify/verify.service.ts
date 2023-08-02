import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class VerifyService {
    private verifyURI: string = `${resourceServerUrl}/api/registration/verify`;
    private resendVerificationCodeURI: string = `${resourceServerUrl}/api/registration/resend-verification-code`;


    constructor(private httpClient: HttpClient) {

    }

    verify(verificationCode: string): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.verifyURI, { verificationCode }, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response'
        });
    }

    resendVerificationCode() {
        return this.httpClient.get(this.resendVerificationCodeURI);
    }
}
