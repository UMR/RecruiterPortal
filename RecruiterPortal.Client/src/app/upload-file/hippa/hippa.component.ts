import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file.service';
import { EnumFileType } from '../upload-file.model';

@Component({
  selector: 'app-hippa',
  templateUrl: './hippa.component.html',
  styleUrls: ['./hippa.component.css']
})
export class HippaComponent implements OnInit {

    public userFiles: Array<any> = [];

    constructor(private uploadFileService: UploadFileService, private router: Router) { }

    ngOnInit() {
        this.getUserFileByFileType();
    }

    getUserFileByFileType() {
        this.uploadFileService.getUserFileByFileType(EnumFileType.HippaForm)
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
        this.router.navigate(['upload-requirements/declination-influenza']);
    }

    nextPage() {
        if (this.userFiles && this.userFiles.length > 0) {
            this.router.navigate(['upload-requirements/nurse-form']);
            return;
        }
    }

}
