import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './common/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private userActivity: any;
    private userInactive: Subject<any> = new Subject();

    constructor(private authService: AuthService) {
        this.setTimeout();
        this.userInactive.subscribe(() => this.authService.logout());
    }

    setTimeout() {
        this.userActivity = setTimeout(() => this.userInactive.next(undefined), 10 * 60 * 1000);
    }

    @HostListener('window:mousemove') refreshUserState() {
        clearTimeout(this.userActivity);
        this.setTimeout();
    }
}