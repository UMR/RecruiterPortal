import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { resourceServerUrl } from '../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { UserModel } from './user-model';

@Injectable()
export class UserManagementService {
  private getUsersByAgencyIdURI: string = `${resourceServerUrl}/api/user/get-users`;
  private addUserURI: string = `${resourceServerUrl}/api/user/add-user`;
  private editUserURI: string = `${resourceServerUrl}/api/user/edit-user`;
  private deleteUserByIdURI: string = `${resourceServerUrl}/api/user/delete-user`;
  private getAgencyByUserIdURI: string = `${resourceServerUrl}/api/agency/get-agency-by-userid`;

  constructor(private httpClient: HttpClient) { }

  getAgencyByUserId(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getAgencyByUserIdURI}`, { observe: 'response' });
  }

  getUsersByAgencyId(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.getUsersByAgencyIdURI}`, { observe: 'response' });
  }

  addUser(userForm: UserModel): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.addUserURI, userForm, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }

  editUser(userForm: UserModel): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.editUserURI, userForm, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
    });
  }
  deleteUserById(loginId: string): Observable<any> {
    return this.httpClient.delete(`${this.deleteUserByIdURI}/${loginId}`, { observe: 'response' });
  }
}
