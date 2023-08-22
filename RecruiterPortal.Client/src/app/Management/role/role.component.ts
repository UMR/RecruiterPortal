import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
    public roles: any;
    constructor(private roleService: RoleService) {
        this.getRoles();
    }

    ngOnInit() {
      
    }
    getRoles() {
        this.roleService.getRole().subscribe(response => {
                console.log(response);
                if (response.status === 200) {
                    this.roles = response.body;
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
