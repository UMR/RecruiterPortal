import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumFileType } from '../upload-file.model';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-employment-eligibility',
  templateUrl: './employment-eligibility.component.html',
  styleUrls: ['./employment-eligibility.component.css']
})
export class EmploymentEligibilityComponent implements OnInit {

    public userFiles: Array<any> = [];

    constructor(private uploadFileService: UploadFileService, private router: Router) { }

    ngOnInit() {
        this.getUserFileByFileType();
    }

    getUserFileByFileType() {
        this.uploadFileService.getUserFileByFileType(EnumFileType.EmploymentEligibility)
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
        this.router.navigate(['upload-requirements/employment-application']);
    }

    nextPage() {
        if (this.userFiles && this.userFiles.length > 0) {
            this.router.navigate(['upload-requirements/hepatitis-b']);
            return;
        }
    }

}
