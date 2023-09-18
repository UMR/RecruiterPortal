import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';
import { Observable, forkJoin, from, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { UmrCookieService } from '../common/services/umr-cookie.service';
import { AuthInfo } from './authInfo';
import { getToken, getTokenFromRefreshToken, revokeToken } from './helpers/http-client.helper';
import { authCookieKey } from './constants/auth-keys';
import { resourceServerUrl, currentUserVerificationStatus } from './constants/auth-keys';
import { StorageService } from './services/storage.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
    private isUserVerifiedUrl: string = `${resourceServerUrl}/api/base/is-user-verified`;
    public redirectUrl: string;
    public logoutMessage: string;
    public http: HttpClient;

    constructor(private httpBackend: HttpBackend, private httpClient: HttpClient, private umrCookieService: UmrCookieService, private router: Router,
        private storageService: StorageService) {
        this.http = new HttpClient(httpBackend);
    }

    get isLoggedIn(): boolean {
        let tokenInfo = this.getTokenInfo();
        return (typeof tokenInfo !== 'undefined' && tokenInfo !== null && typeof tokenInfo.access_token !== 'undefined');
    }

    private getTokenInfo() {
        return <AuthInfo>this.umrCookieService.getDeserializedObject(authCookieKey);
    }

    public get accessToken() {
        const accessTokenInfo = <AuthInfo>this.umrCookieService.getDeserializedObject(authCookieKey);
        return accessTokenInfo && accessTokenInfo.access_token;
    }

    public get refreshToken() {
        const accessTokenInfo = <AuthInfo>this.umrCookieService.getDeserializedObject(authCookieKey);
        return accessTokenInfo && accessTokenInfo.refresh_token;
    }

    isUserVerified(): Observable<boolean> {
        return of(true);
    }

    // oldQueryParam will be removed for static connection string
    login(userID: string, password: string, oldQueryParam: string): Observable<any> {
        return getToken(this.http, userID, password, oldQueryParam)
            .map((value, index) => {
                this.saveAuthInfo(value, true);
                forkJoin(
                    this.isUserVerified()
                ).subscribe(data => {
                    localStorage.setItem(currentUserVerificationStatus, data.toString());
                },
                    err => { },
                    () => {
                        if (this.redirectUrl) {
                            this.router.navigateByUrl(this.redirectUrl);
                            this.redirectUrl = null;
                        }
                        else {
                            this.router.navigate(['dashboard']);
                        }
                        //else {
                        //    this.router.navigate(['view-by-applicant']);
                        //}
                    });
            });
    }

    renewToken(refreshToken): Observable<any> {
        return getTokenFromRefreshToken(this.http, refreshToken)
            .map((value, index) => {
                this.saveAuthInfo(value);
            });
    }

    logout() {
        //localStorage.removeItem(currentUserVerificationStatus);
        //this.storageService.removeApplicantId();
        localStorage.clear();
        sessionStorage.clear();
        const tokenInfo = this.getTokenInfo();
        if (tokenInfo && tokenInfo.refresh_token) {
            const refreshToken = tokenInfo.refresh_token;
            this.umrCookieService.removeCookie(authCookieKey);
            revokeToken(this.http, refreshToken).subscribe(_ => this.logoutNavigate(), err => this.logoutNavigate());
        }
        else {
            this.umrCookieService.removeCookie(authCookieKey);
            this.logoutNavigate();
        }
    }

    logoutNavigate() {
        this.router.navigate(['/login']).then(isNavigated => {
            if (isNavigated) {

            }
        });
    }

    private saveAuthInfo(value, isAccessToken: boolean = false) {        
        if (value.access_token) {
            const decodedToken = jwt_decode(value.access_token);
            const userInfo = JSON.parse(decodedToken["RecruiterClaim"]);
            console.log(userInfo);
            this.storageService.storeDataToSession(userInfo,"CurrentUserInfo");
            const roleArray = JSON.parse(decodedToken["RecruiterClaim"]).Roles;            
            if (roleArray && roleArray.length > 0) {
                if (roleArray.includes('recruiter')) {
                    this.storageService.setIsRecruiter(true);                    
                }
                if (roleArray.includes('supervisor')) {
                    this.storageService.setIsSupervisor(true);
                }
                if (roleArray.includes('manager')) {
                    this.storageService.setIsManager(true);
                }
                if (roleArray.includes('administrator')) {
                    this.storageService.setIsAdministrator(true);
                }
                if (roleArray.includes('admin')) {
                    this.storageService.setIsAdmin(true);
                }
            }
        }
        this.umrCookieService.setSerializedObject(authCookieKey, value);
        if (!this.isLoggedIn) {
            this.logoutMessage = 'Your browser does not accept cookies. cookies are required to use this site';
            this.logout();
        }
    }
}
