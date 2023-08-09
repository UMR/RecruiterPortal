import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { AuthService } from '../common/auth.service';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  private forgotPasswordURI: string = `${resourceServerUrl}/api/password/forgot-password`;
  http: HttpClient;
  constructor(private authService: AuthService, private httpClient: HttpClient, private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  get isLoggedIn() {
    if (this.authService.isLoggedIn) {
      return true;
    }
    return false;
  }

  // oldQueryParam will be removed for static connection string
  login(userID: string, password: string, oldQueryParam: string) {
    return this.authService.login(userID, password, oldQueryParam);
  }

  get logoutMessage() {
    return this.authService.logoutMessage;
  }

  set defaultLogoutMessage(message: any) {
    this.authService.logoutMessage = message;
  }

  forgotPassword(forgotPassModel: ForgotPasswordModel): Observable<HttpResponse<any>> {
    return this.http.put(this.forgotPasswordURI, forgotPassModel, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
}
