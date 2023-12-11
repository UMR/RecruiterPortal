import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AgreementFormInfoService } from './agreement-form-info.service';
import { StorageService } from '../../common/services/storage.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-agreement-form-info',
  templateUrl: './agreement-form-info.component.html',
  styleUrls: ['./agreement-form-info.component.css']
})
export class AgreementFormInfoComponent implements OnInit {
  public isLoading: boolean = false;
  public contractorName: string;
  public streetAdress: string;
  public zipCode: string;
  public state: string;
  public cityTown: string;
  public notary: string;
  public date: string;

  constructor(private messageService: MessageService, private fb: FormBuilder, private agreementService: AgreementFormInfoService, private service: StorageService) { }

  ngOnInit() {
    this.agreementService.getAgreementInfo(this.service.getApplicantId)
      .subscribe(data => {
        if (data.status === 200 && data.body !== null) {
          this.contractorName = data.body.ContractorName;
          this.streetAdress = data.body.StreetAddress;
          this.zipCode = data.body.ZipCode;
          this.state = data.body.StateName;
          this.cityTown = data.body.City;
          this.notary = data.body.Notary;
          this.date = data.body.Date
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get agreement info', detail: '' });
        },
        () => { this.isLoading = false; });
  }
  onDownloadClick() {
    this.isLoading = true;
    this.agreementService.getAgreementFileByApplicantId(this.service.getApplicantId)
      .subscribe((response: HttpResponse<Blob>) => {
        //console.log(response);
        if (response.status === 200) {
            const filename = "Agreement Info.pdf";
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
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get agreement info', detail: '' });
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
}
