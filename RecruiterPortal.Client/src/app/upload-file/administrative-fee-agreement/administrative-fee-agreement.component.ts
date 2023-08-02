import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file.service';
import { EnumFileType } from '../upload-file.model';

@Component({
  selector: 'app-administrative-fee-agreement',
  templateUrl: './administrative-fee-agreement.component.html',
  styleUrls: ['./administrative-fee-agreement.component.css']
})
export class AdministrativeFeeAgreementComponent implements OnInit {

    public userFiles: Array<any> = [];

    constructor(private uploadFileService: UploadFileService, private router: Router) { }

    ngOnInit() {
        this.getUserFileByFileType();
    }

    getUserFileByFileType() {
        this.uploadFileService.getUserFileByFileType(EnumFileType.AdministrativeFeeAgreement)
            .subscribe(data => {
                if (data.status === 200) {
                    this.userFiles = data.body;
                }
            },
                err => {
                    console.log(err);
                });
    }

    getFileTypeChange(event) {
        this.userFiles = event;
    }

    prevPage() {
        this.router.navigate(['upload-requirements/voided-cheque']);
    }

    nextPage() {
        if (this.userFiles && this.userFiles.length > 0) {
            this.router.navigate(['upload-requirements/emergency-contact']);
            return;
        }
    }

}
