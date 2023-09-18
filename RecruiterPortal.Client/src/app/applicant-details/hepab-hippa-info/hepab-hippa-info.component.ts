import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HepabHippaInfoService } from './hepab-hippa-info.service';
import { StorageService } from '../../common/services/storage.service';

@Component({
    selector: 'app-hepab-hippa-info',
    templateUrl: './hepab-hippa-info.component.html',
    styleUrls: ['./hepab-hippa-info.component.css']
})
export class HepabHippaInfoComponent implements OnInit {
    public isLoading: boolean = false;
    public userHepabHippa: any;

    constructor(private messageService: MessageService, private hepabHippaInfoService: HepabHippaInfoService, private storageService: StorageService) { }

    ngOnInit() {
        this.getUserHepabHippa();
    }

    getUserHepabHippa() {
        this.isLoading = true;
        this.hepabHippaInfoService.getHepaBHIPPAInfo()
            .subscribe(data => {
                if (data.status === 200 && data.body) {
                    this.userHepabHippa = data.body;
                    console.log(data.body);
                }
                else {
                    this.userHepabHippa = {};
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({
                        key: 'toastKey1', severity: 'error',
                        summary: 'Failed to get user Hepatitis B and HIPPA information',
                        detail: ''
                    });
                },
                () => {
                    this.isLoading = false;
                });
    }

    getClientFormattedDate(value): string {
        if (value) {
            let dateObj = new Date(value);
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();
            let year = dateObj.getFullYear();

            return month + "-" + day + "-" + year;
        }
        return '';
    }

    onDownloadClick() {
        this.isLoading = true;
        this.hepabHippaInfoService.getHepaBHIPPAFile(this.storageService.getApplicantId)
            .subscribe((response: HttpResponse<Blob>) => {                
                if (response.status === 200) {
                    const filename = "HepaB and Hippa.pdf";
                    let binaryData = [];
                    binaryData.push(response.body);
                    let downloadLink = document.createElement('a');
                    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
                    downloadLink.setAttribute('download', filename.trim().replace('"', '').replace('"', ''));                    
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get Employment Application file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    getFileName(response: HttpResponse<Blob>) {
        let filename: string;
        try {
            const contentDisposition = response.headers.get('content-disposition');
            filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        }
        catch (e) {
            filename = 'myfile.pdf'
        }
        return filename
    }

}
