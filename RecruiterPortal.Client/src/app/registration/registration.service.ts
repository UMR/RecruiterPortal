import { Injectable } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { HttpClient, HttpBackend, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationService {
    private registrationURI: string = `${resourceServerUrl}/api/registration/register`;
    private getUserURI: string = `${resourceServerUrl}/api/registration/`;

    constructor(private authService: AuthService, private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    registration(registrationModel: RegistrationModel) {
        return this.http.post(this.registrationURI, registrationModel);
    }
    getUserByEmail(email: any): Observable<HttpResponse<any>> {
        return this.http.get(this.getUserURI + email, { observe: 'response' });
    }
}
