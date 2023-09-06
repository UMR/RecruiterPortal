import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyProfileService } from '../../../agency-profile/agency-profile.service';
import { UserProfileService } from '../../../user-profile/user-profile.service';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'applicant-portal-header',
    templateUrl: './header.component.html',
    styleUrls: ["./header.component.css"],
    providers: [AgencyProfileService]
})
export class HeaderComponent {
    public isAgencyOwner: boolean = false;
    public user: any = {};
    public username: string = '';
    @Input() isVisibleToggleButton: number;
    @Output() onToggleButtonClicked = new EventEmitter<any>();

    public isRecruiter: boolean = false;
    public isSupervisor: boolean = false;
    public isManager: boolean = false;
    public isAdministrator: boolean = false;
    public isAdmin: boolean = false;

    constructor(private authService: AuthService, private route: ActivatedRoute, private userProfileService: UserProfileService,
        public agencyProfileService: AgencyProfileService) { }

    ngOnInit() {
        this.getUserRole();
        //this.agencyProfileService.isAgencyOwner()
        //  .subscribe(response => {
        //    if (response.status === 200) {
        //      this.isAgencyOwner = response.body;
        //    }
        //  });



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

    getUserRole() {
        this.userProfileService.getUserRoles()
            .subscribe(response => {
                console.log(response);
                if (response.status === 200 && response.body != null) {
                    for (var i = 0; i < response.body.length; i++) {
                        if (response.body[i].RoleKey == 'recruiter') {
                            this.isRecruiter = true;
                        }
                        if (response.body[i].RoleKey == 'supervisor') {
                            this.isSupervisor = true;
                        }
                        if (response.body[i].RoleKey == 'manager') {
                            this.isManager = true;
                        }
                        if (response.body[i].RoleKey == 'administrator') {
                            this.isAdministrator = true;
                        }
                        if (response.body[i].RoleKey == 'admin') {
                            this.isAdmin = true;
                        }
                    }
                }
            });
    }

    logout() {
        this.authService.logout();
    }

    menuToggle(e) {
        e.preventDefault();
        this.onToggleButtonClicked.emit();
    }
}
