import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file.service';
import { EnumFileType } from '../upload-file.model';

@Component({
  selector: 'app-independent-contractor-agreement',
  templateUrl: './independent-contractor-agreement.component.html',
  styleUrls: ['./independent-contractor-agreement.component.css']
})
export class IndependentContractorAgreementComponent implements OnInit {

    public userFiles: Array<any> = [];

    constructor(private uploadFileService: UploadFileService, private router: Router) { }

    ngOnInit() {
        this.getUserFileByFileType();
    }

    getUserFileByFileType() {
        this.uploadFileService.getUserFileByFileType(EnumFileType.IndependentContractorAgreement)
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
        this.router.navigate(['upload-requirements/nurse-form']);
    }

    nextPage() {
        if (this.userFiles && this.userFiles.length > 0) {
            this.router.navigate(['upload-requirements/employment-contract']);
            return;
        }
    }

}
