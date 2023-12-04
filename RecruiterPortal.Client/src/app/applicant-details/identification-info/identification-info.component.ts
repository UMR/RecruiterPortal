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
        this.licenseService.getAllUserLicense(this.storageService.getApplicantId)
            .subscribe(data => {
                if (data.status === 200) {
                    this.userIdentificationInfo = data.body;
                }
                else {
                    this.userIdentificationInfo = [];
                }
            },
                err => {
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

    onViewPdf(userLicense: any) {
        //this.licenseService.getUserLicenseById(userLicense.LicenseID).subscribe(res => {
        //    var blob = this.b64toBlob(res.body.FIleData, "application/pdf", "");
        //    const fileURL = URL.createObjectURL(blob);
        //    window.open(fileURL, '_blank');
        //});
        if (userLicense.FileName.includes(".pdf")) {
            this.licenseService.getUserLicenseById(userLicense.LicenseID).subscribe(res => {
                var blob = this.b64toBlob(res.body.FIleData, "application/pdf", "");
                const fileURL = URL.createObjectURL(blob);
                window.open(fileURL, '_blank');
            });
        }
        else if (userLicense.FileName.includes(".docx") || userLicense.FileName.includes(".doc")) {
            this.licenseService.getUserLicenseById(userLicense.LicenseID).subscribe(res => {
                var blob = this.b64toBlobDoc(res.body.FIleData, "application/octet-stream",);
                let blobUrl = URL.createObjectURL(blob);
                let doc = document.createElement("a");
                doc.href = blobUrl;
                doc.download = userLicense.FileName;
                doc.click();
            });
        }
        else {
            this.licenseService.getUserLicenseById(userLicense.LicenseID).subscribe(res => {
                var blob = this.b64toBlob(res.body.FIleData, "image/jpeg", "");
                const fileURL = URL.createObjectURL(blob);
                window.open(fileURL, '_blank');
            });
        }
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        return new File(byteArrays, "pot", { type: contentType });
    }

    b64toBlobDoc(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}
