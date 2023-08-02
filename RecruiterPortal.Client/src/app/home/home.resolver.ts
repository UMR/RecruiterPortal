import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AgencyProfileService } from '../agency-profile/agency-profile.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { HomeComponent } from './home.component';


@Injectable()
export class HomeResolver implements Resolve<HomeComponent>
{
  constructor(private userProfileService: UserProfileService, private agencyProfileService: AgencyProfileService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return Observable.forkJoin(this.userProfileService.getCurrentUser(),
      this.agencyProfileService.isAgencyOwner()
    );
  }
}
