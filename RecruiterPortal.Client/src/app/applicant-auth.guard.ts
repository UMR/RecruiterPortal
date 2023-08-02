import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './common/auth.service';
import { StorageService } from './common/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const applicantId = this.storageService.getApplicantId;    
    if (this.authService.isLoggedIn && applicantId) {      
      return true;
    }
    if (this.authService.isLoggedIn && !applicantId) {      
      this.router.navigate(['view-by-applicant']);
      return false;
    }
    if (state.url !== '' && state.url !== '/') {
      this.authService.redirectUrl = state.url;
      this.authService.logoutMessage = "You are not logged in";
    }
    this.authService.logout();
    return false;
  }

}
