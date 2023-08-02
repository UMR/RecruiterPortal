import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './common/auth.service';
import { currentUserVerificationStatus } from './common/constants/auth-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    //let isCurrentUserVerified = localStorage.getItem(currentUserVerificationStatus);
    //if (this.authService.isLoggedIn && isCurrentUserVerified != undefined) {
    //    if (isCurrentUserVerified == "false") {
    //        this.router.navigate(['verify']);
    //        return false;
    //    }
    //    return true;
    //}      
    if (this.authService.isLoggedIn) {
      return true;
    }
    if (state.url !== '' && state.url !== '/') {
      this.authService.redirectUrl = state.url;
      this.authService.logoutMessage = "You are not logged in";
    }
    this.authService.logout();
    return false;
  }

}
