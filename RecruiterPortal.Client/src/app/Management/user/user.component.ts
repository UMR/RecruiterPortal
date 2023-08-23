import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    public users: any;
    constructor(private userService: UserService) {
        this.getUsers();
    }

    ngOnInit() {

    }
    getUsers() {
        this.userService.getUser().subscribe(response => {
            console.log(response);
            if (response.status === 200) {
                this.users = response.body;
            }
        },
            err => {
                //this.isLoading = false;
                //this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get agency', detail: '' });
            },
            () => {
                //this.isLoading = false;
            });
    }
}