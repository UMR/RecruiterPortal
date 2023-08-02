import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LicenseService } from './license.service';

@Component({
    selector: 'app-license',
    templateUrl: './license.component.html',
    styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

    public isLoading: boolean = false;
    public userLicenses: any = [];

    constructor(private licenseService: LicenseService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.getAllUserLicense();
    }

    getAllUserLicense() {
        this.isLoading = true;
        this.licenseService.getAllUserLicense()
            .subscribe(data => {
                if (data.status === 200) {
                    this.userLicenses = data.body;                    
                }
                else {
                    this.userLicenses = [];
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user license', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onDelete(licenseId: any) {
        if (licenseId) {
            this.confirmationService.confirm({
                message: "Are you sure that you want to delete this license?",
                header: "Delete Confirmation",
                accept: () => {
                    this.isLoading = true;
                    this.licenseService.delete(+licenseId).subscribe(
                        data => {
                            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: ' User license has been deleted successfully', detail: '' });

                            const index = this.userLicenses.findIndex(
                                x => x.licenseID === licenseId
                            );
                            this.userLicenses.splice(index, 1);
                        },
                        error => {
                            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete user license', detail: '' });
                        },
                        () => {
                            this.isLoading = false;
                        }
                    );
                }
            });
        }
    }

}
