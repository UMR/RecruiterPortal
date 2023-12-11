import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LicenseCertificateService } from './license-certificate.service';

@Component({
  selector: 'app-license-certificate',
  templateUrl: './license-certificate.component.html',
    styleUrls: ['./license-certificate.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class LicenseCertificateComponent implements OnInit {
    public isLoading: boolean = false;
    public userLicenses: any = [];

    constructor(private licenseService: LicenseCertificateService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
