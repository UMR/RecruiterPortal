import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IdentificationInfoService } from './identification-info.service';
import { StorageService } from '../../common/services/storage.service';

@Component({
  selector: 'app-identification-info',
  templateUrl: './identification-info.component.html',
  styleUrls: ['./identification-info.component.css']
})
export class IdentificationInfoComponent implements OnInit {
    public isLoading: boolean = false;
    public userIdentificationInfo: any = [];
  constructor(private licenseService: IdentificationInfoService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private storageService: StorageService) { }

    ngOnInit() {
        this.getAllUserLicense();
  }
    getAllUserLicense() {
        this.isLoading = true;
        this.licenseService.getAllUserLicense()
          .subscribe(data => {
            console.log(data);
                if (data.status === 200) {
                    this.userIdentificationInfo = data.body;
                }
                else {
                    this.userIdentificationInfo = [];
                }
                //console.log(this.userIdentificationInfo);
            },
                err => {
                    //console.log(err);
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user Identification', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onDelete(licenseId: any) {
        if (licenseId) {
            this.confirmationService.confirm({
                message: "Are you sure that you want to delete this Identification?",
                header: "Delete Confirmation",
                accept: () => {
                    this.isLoading = true;
                    this.licenseService.delete(+licenseId).subscribe(
                        data => {
                            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: ' User Identification has been deleted successfully', detail: '' });

                            const index = this.userIdentificationInfo.findIndex(
                              x => x.LicenseID === licenseId
                            );
                            this.userIdentificationInfo.splice(index, 1);
                        },
                        error => {
                            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete user Identification', detail: '' });
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
