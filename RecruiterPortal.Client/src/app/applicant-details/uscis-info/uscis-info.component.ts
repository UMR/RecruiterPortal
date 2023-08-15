import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { USCISInfoService } from './uscis-info.service';
import { StorageService } from '../../common/services/storage.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-USCISInfo',
  templateUrl: './uscis-info.component.html',
  styleUrls: ['./uscis-info.component.css']
})
export class UscisInfoComponent implements OnInit {

  public isLoading: boolean = false;
  public userUSCIS: any;

  constructor(private messageService: MessageService, private uSCISInfoService: USCISInfoService, private storageService: StorageService) { }

  ngOnInit() {
    this.getUserUSCIS();
    //console.log('uscis - info works!');
  }

  getUserUSCIS() {
    this.isLoading = true;
    this.uSCISInfoService.getUSCISInfo()
      .subscribe(data => {
        //console.log(data);
        if (data.status === 200) {
          this.userUSCIS = data.body;
        }
        else {
          this.userUSCIS = {};
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user USCIS information', detail: '' });
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
    this.uSCISInfoService.getUSCISFile(this.storageService.getApplicantId)
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
