import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { EmergencyInfoService } from '../emergency-info.service';
import { StorageService } from '../../../common/services/storage.service';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.css']
})
export class SecondaryComponent implements OnInit {
  public isLoading: boolean = false;
  public secondaryInfo: EmergencyInfoModel[] = [];

  constructor(private messageService: MessageService,
    private emergencyInfoService: EmergencyInfoService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.emergencyInfoService.getEmergencyInfoByApplicantId(this.storageService.getApplicantId)
      .subscribe(response => {
        const data = (response as any).Data;        
        if (data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].EmrType && +data[i].EmrType === 2) {
              this.secondaryInfo = data[i];
            }
          }
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load secondary info', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  onDownloadClick() {
    this.isLoading = true;
    this.emergencyInfoService.getEmergencyInfoFileByApplicantId(this.storageService.getApplicantId)
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
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get emergency info file', detail: '' });
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
