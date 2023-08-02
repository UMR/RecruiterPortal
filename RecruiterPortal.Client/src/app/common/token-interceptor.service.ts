import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/mergeMap";
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);
        let accessToken = authService.accessToken;
        if (this.isInvalidToken(accessToken)) {
            this.logout(authService, "You are not logged in");
            return Observable.throw({ error: "Access token not found" });
        }
        return next.handle(this.customRequest(request, accessToken)).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event;
                }
            })
            .catch((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 || error.status === 403) {
                        let refreshToken = authService.refreshToken;
                        if (this.isInvalidToken(refreshToken)) {
                            this.logout(authService, "You are not logged in");
                            return Observable.throw({ error: "Refresh token not found" });
                        }
                        return authService.renewToken(refreshToken)
                            .mergeMap(_ => {
                                let accessToken = authService.accessToken;
                                if (this.isInvalidToken(accessToken)) {
                                    this.logout(authService, "You are not logged in");
                                    return Observable.throw({ error: "Access token not found" });
                                }
                                return next.handle(this.customRequest(request, accessToken)).do((evn: HttpEvent<any>) => {
                                    if (evn instanceof HttpResponse) {
                                        return evn;
                                    }
                                }).catch((er: any) => {
                                    er.loggedIn = true;
                                    return Observable.throw(er);
                                });
                            }).catch((err: any) => {
                                if (err.loggedIn !== true) {
                                    this.logout(authService, "Your session has expired. Please login again");
                                }
                                return Observable.throw(err);
                            });
                    }
                }
                return Observable.throw(error);
            });
    }

    isInvalidToken(token: string) {
        return (typeof token === 'undefined' || token === null || token.toString().length === 0);
    }

    customRequest(request: HttpRequest<any>, accessToken: string) {
        let req = request.clone({
            setHeaders: {
                Authorization: 'Bearer {0}'.replace('{0}', accessToken)
            }
        });
        return req;
    }

    logout(authService: AuthService, logoutMessage: string) {
        const router = this.injector.get(Router);
        authService.redirectUrl = router.url;
        authService.logoutMessage = logoutMessage;
        authService.logout();
    }
}

