import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StorageService } from '../common/services/storage.service';
import { InfluenzaVaccinationService } from './influenza-vaccination.service';

@Component({
  selector: 'app-influenza-vaccination',
  templateUrl: './influenza-vaccination.component.html',
  styleUrls: ['./influenza-vaccination.component.css']
})
export class InfluenzaVaccinationComponent implements OnInit {

  public isLoading: boolean = false;
  public influenzaVaccination: any = {};

  constructor(private influenzaVaccinationService: InfluenzaVaccinationService, private messageService: MessageService, private storageService: StorageService) { }

  ngOnInit() {
    this.getInfluenzaVaccinationByApplicantId();
  }

  getInfluenzaVaccinationByApplicantId() {
    this.isLoading = true;
    this.influenzaVaccinationService.getInfluenzaVaccinationByApplicantId(this.storageService.getApplicantId)
      .subscribe(data => {
        if (data.status === 200) {
          this.influenzaVaccination = data.body;          
        }        
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get influenza vaccination', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  onDownloadClick() {    
    this.isLoading = true;
    this.influenzaVaccinationService.getInfluenzaVaccinationFileByApplicantId(this.storageService.getApplicantId)
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
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get influenza vaccination file', detail: '' });
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
