import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyProfileService } from '../../../agency-profile/agency-profile.service';
import { UserProfileService } from '../../../user-profile/user-profile.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'applicant-portal-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.css"],
  providers: [ AgencyProfileService]
})
export class HeaderComponent {
  public isAgencyOwner: boolean = false;
  public user: any = {};
  public username: string = '';
  @Input() isVisibleToggleButton: number;
  @Output() onToggleButtonClicked = new EventEmitter<any>();

  constructor(private authService: AuthService, private route: ActivatedRoute, private userProfileService: UserProfileService, public agencyProfileService: AgencyProfileService) {

  }

  ngOnInit() {
    //this.agencyProfileService.isAgencyOwner()
    //  .subscribe(response => {
    //    if (response.status === 200) {
    //      this.isAgencyOwner = response.body;
    //    }
    //  });

    this.userProfileService.getUserRoles()
        .subscribe(response => {
            console.log(response);
        if (response.status === 200) {          
          this.userProfileService.setUsername(response.body.LastName + ' ' + response.body.FirstName);          
        }
      });    

    //this.userProfileService.selectedUsername$.subscribe(username => {
    //  if (username) {
    //    this.username = username;
    //  }
    //});

    //if (this.route.snapshot.data['home']) {
    //  this.userProfileService.setUser(this.route.snapshot.data['home'][0].body);
    //  this.userProfileService.selectedUser$.subscribe(user => {
    //    console.log(user);
    //    this.fullName = user.LastName + user.FirstName;
    //  });
    //  this.isAgencyOwner = true;

    //  //this.user = this.route.snapshot.data['home'][0].body;
    //  //this.isAgencyOwner = this.route.snapshot.data['home'][1].body;
    //  //this.fullName = this.user.LastName + this.user.FirstName;
    //}
  }

  logout() {
    this.authService.logout();
  }

  menuToggle(e) {
    e.preventDefault();
    this.onToggleButtonClicked.emit();
  }
}
