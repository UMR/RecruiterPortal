import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file.service';
import { EnumFileType } from '../upload-file.model';

@Component({
  selector: 'app-employment-application',
  templateUrl: './employment-application.component.html',
  styleUrls: ['./employment-application.component.css']
})
export class EmploymentApplicationComponent implements OnInit {

    public userFiles: Array<any> = [];

    constructor(private uploadFileService: UploadFileService, private router: Router) { }

    ngOnInit() {
        this.getUserFileByFileType();
    }

    getUserFileByFileType() {
        this.uploadFileService.getUserFileByFileType(EnumFileType.EmploymentApplication)
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
        this.router.navigate(['upload-requirements/emergency-contact']);
    }

    nextPage() {
        if (this.userFiles && this.userFiles.length > 0) {
            this.router.navigate(['upload-requirements/employment-eligibility']);
            return;
        }
    }

}
