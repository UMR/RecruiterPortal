import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from '../common/services/storage.service';
import { NurseFormService } from './nurse-form.service';

@Component({
  selector: 'app-nurse-form',
  templateUrl: './nurse-form.component.html',
  styleUrls: ['./nurse-form.component.css']
})
export class NurseFormComponent implements OnInit {

  public isLoading: boolean = false;
  public nurseForm: any = {};

  constructor(private nurseFormService: NurseFormService, private messageService: MessageService, private storageService: StorageService) { }

  ngOnInit() {
    this.getNurseFormByApplicantId();
  }

  getNurseFormByApplicantId() {
    this.isLoading = true;
    this.nurseFormService.getNurseFormByApplicantId(this.storageService.getApplicantId)
      .subscribe(data => {
        if (data.status === 200 && data.body) {
          this.nurseForm = data.body;          
        }        
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get nurse form', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  onDownloadClick() {
    this.isLoading = true;
    this.nurseFormService.getNurseFormFileByApplicantId(this.storageService.getApplicantId)
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
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get nurse form file', detail: '' });
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

  getRadioText(value): string {
    let text = '';
    if (value) {
      if (value === 'True') {
        text = 'Yes';
      }
      else {
        text = 'No';
      }
    }
    return text;
  }

  getApplyingForJobTypeText(value): string {
    let text = '';
    if (value) {
      console.log(value);
      if (value === 'True') {
        text = 'Registered Professional Nurse';
      }
      else {
        text = 'Licensed Practical Nurse';
      }
    }
    return text;
  }

  getApplyingPositionText(value) {    
    let text = '';
    if (value) {
      if (value === '1') {
        text = 'Original Permit';
      }
      else if (value === '2') {
        text = 'Additional supervisor/site';
      }
      else if (value === '3') {
        text = 'Change of supervisor/site';
      }
    }
    return text;
  }

  getClientFormattedDate(value): string {
    if (value) {
      let dateObj = new Date(value);
      let month = dateObj.getUTCMonth() + 1;
      let day = dateObj.getUTCDate() + 1;
      let year = dateObj.getUTCFullYear();

      return month + "-" + day + "-" + year;
    }
    return '';
  }

}
