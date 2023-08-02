import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserProfileService {

  //public username: string = '';
  private username$ = new BehaviorSubject<any>(undefined);
  public selectedUsername$ = this.username$.asObservable();
  private getCurrentUserURI: string = `${resourceServerUrl}/api/user/get-current-user`;
  private getUserByUserIdURI: string = `${resourceServerUrl}/api/user/get-user-by-userid`;
  private updateUserProfileURI: string = `${resourceServerUrl}/api/user/edit-user-profile`;
  private userEmailExistURI: string = `${resourceServerUrl}/api/user/email_exist`;

  constructor(private httpClient: HttpClient) {
    
  }  

  setUsername(username: any){
    this.username$.next(username);
    //this.username = username;
  }  

  getCurrentUser(): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.getCurrentUserURI, { observe: 'response' });
  }

  getUserByUserId(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getUserByUserIdURI}`, { observe: 'response' });
  }

  updateUserProfile(userModel: any): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.updateUserProfileURI, userModel, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  isEmailExist(email: string): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.userEmailExistURI,
      {
        params: new HttpParams()
          .set('email', email)
        , observe: 'response'
      });
  }

}
