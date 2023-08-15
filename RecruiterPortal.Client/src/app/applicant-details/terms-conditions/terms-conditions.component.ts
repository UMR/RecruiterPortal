import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../common/services/storage.service';
import { TermsConditionsService } from './terms-conditions.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {

  public isLoading: boolean = false;
  public termsConditions: any = {};

  constructor(private termsConditionsService: TermsConditionsService, private messageService: MessageService, private storageService: StorageService) { }

  ngOnInit() {
    this.getTermsConditionsByApplicantId();
  }

  getTermsConditionsByApplicantId() {
    this.isLoading = true;
    this.termsConditionsService.getTermsConditionsByApplicantId(this.storageService.getApplicantId)
      .subscribe(data => {
        if (data.status === 200) {
          this.termsConditions = data.body;          
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get terms and conditions', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  onDownloadClick() {
    this.isLoading = true;
    this.termsConditionsService.getTermsConditionsFileByApplicantId(this.storageService.getApplicantId)
      .subscribe(response => {
        if (response.status === 200) {
          const filename = this.getFileName(response)
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(response.body);
          downloadLink.setAttribute('download', filename.trim().replace('"', '').replace('"', ''));
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get terms and conditions file', detail: '' });
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
