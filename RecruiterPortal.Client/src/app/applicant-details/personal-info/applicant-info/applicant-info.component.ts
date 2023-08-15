import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { EditApplicantInfoService } from './edit-applicant-info/edit-applicant-info.service';
import { EditApplicantInfoModel } from './edit-applicant-info/edit-applicant-info.model';
import { StorageService } from '../../../common/services/storage.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.css'],
  providers: [MessageService]
})
export class ApplicantInfoComponent implements OnInit {
  public editApplicantInfoModel: EditApplicantInfoModel = new EditApplicantInfoModel();
  public isLoading: boolean = true;

  constructor(private editApplicantInfoService: EditApplicantInfoService, private messageService: MessageService, private storageService: StorageService) { }

  ngOnInit() {
    this.editApplicantInfoService.getApplicantInfo().subscribe(data => {
      //console.log(data);
      //console.log(data.body.Data);
      this.editApplicantInfoModel = data.body.Data as EditApplicantInfoModel;
    },
      err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant info', detail: '' }); },
      () => { this.isLoading = false; });
  }

  getClientFormattedDate(value): string {
    if (value) {
      var dateObj = new Date(value);
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      return month + "-" + day + "-" + year;
    }
    return '';
  }

  onDownloadClick() {
    this.isLoading = true;
    this.editApplicantInfoService.getEmploymentApplicantionFile(this.storageService.getApplicantId)
      .subscribe((response: HttpResponse<Blob>) => {
        //console.log(response);
        if (response.status === 200) {
          let filename: string = this.getFileName(response)
          //console.log(filename);
          let binaryData = [];
          binaryData.push(response.body);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
          downloadLink.setAttribute('download', filename.trim().replace('"', '').replace('"', ''));
          //console.log(downloadLink);
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
  ValidSSNFormat(SSNValue: string) {
    if (SSNValue && SSNValue.length == 9) {
      return SSNValue.substr(0, 3) + "-" + SSNValue.substr(3, 2) + "-" + SSNValue.substr(5);
    }
    else {
      return SSNValue;
    }
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
