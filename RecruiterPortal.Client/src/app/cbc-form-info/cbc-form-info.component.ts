import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CBCFormInfoService } from './cbc-form-info.service';
import { StorageService } from '../common/services/storage.service';
import { HttpResponse } from '@angular/common/http';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-cbc-form-info',
  templateUrl: './cbc-form-info.component.html',
  styleUrls: ['./cbc-form-info.component.css']
})
export class CBCFormInfoComponent implements OnInit {
  public isLoading: boolean = false;
  agencyIdentification: string = "";
  pfi: string = "";
  license: string = "";
  agencyName: string = "";
  agFirstName: string = "";
  agLastName: string = "";
  streetNo: string = "";
  streetName: string = "";
  agApt: string = "";
  agZipCode: string = "";
  agCity: string = "";
  agState: string = "";
  agTelephone: string = "";
  agEmail: string = "";
  agDate: string = "";
  fpMethod: string = "";
  locationFPService: string = "";
  identification: string = "";
  fpStAddress: string = "";
  fpZipCode: string = "";
  fpCity: string = "";
  fpState: string = "";
  fpTitle: string = "";
  fpFirstName: string = "";
  fpLastName: string = "";
  fpSignature: string = "";
  fbDate: string = "";
  motherMaidenName: string = "";
  alias: string = "";
  guardianSign: string = "";
  homePhone: string = "";
  title: string = "";

  constructor(private messageService: MessageService, private fb: FormBuilder, private cbcService: CBCFormInfoService, private service: StorageService) { }

  ngOnInit() {
    this.cbcService.getCBCInfo(this.service.getApplicantId)
      .subscribe(data => {
        console.log(data);
        if (data.status === 200 && data.body !== null) {
          this.agencyIdentification = data.body.AgencyIdentification;
          this.pfi = data.body.LTHHP_PFI;
          this.license = data.body.LHCSA_License;
          this.agencyName = data.body.AgencyName;
          this.agFirstName = data.body.APFirstName;
          this.agLastName = data.body.APLastName;
          this.streetNo = data.body.AStreetNo;
          this.streetName = data.body.AStreetName;
          this.agApt = data.body.AApt;
          this.agZipCode = data.body.AZipCode;
          this.agCity = data.body.ACity;
          this.agState = data.body.AState;
          this.agTelephone = data.body.ATelephoneNo;
          this.agEmail = data.body.AEmail;
          this.agDate = data.body.ADate
          this.fpMethod = data.body.FingerprintingMethod;
          this.locationFPService = data.body.FingerprintServicesName;
          this.identification = data.body.FIdentificationVerified;
          this.fpStAddress = data.body.FStAddress;
          this.fpZipCode = data.body.FZip;
          this.fpCity = data.body.FCity;
          this.fpState = data.body.FState;
          this.fpTitle = data.body.FTitle;
          this.fpFirstName = data.body.FFirstName;
          this.fpLastName = data.body.FLastName;
          this.fpSignature = data.body.Signature;
          this.fbDate = data.body.DateFingerPrinted;
          this.motherMaidenName = data.body.MotherMaidenName;
          this.alias = data.body.Alias_AKA;
          this.guardianSign = data.body.ParentorLegalGuardian;
          this.homePhone = data.body.HomePhone;
          this.title = data.body.Title
        }
        if (this.fpMethod == "InkRoll") {
          this.fpMethod = "Ink & Roll"
        }
        if (this.fpMethod == "LiveScan") {
          this.fpMethod = "Live Scan"
        }
      },
        err => {
          console.log(err);
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get CBC info', detail: '' });
        },
        () => { this.isLoading = false; });
  }
  onDownloadClick() {
    this.isLoading = true;
    this.cbcService.getCBCFileByApplicantId(this.service.getApplicantId)
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
      console.log(contentDisposition);
      console.log(response.headers);

      filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
    }
    catch (e) {
      console.log(e);
      filename = 'myfile.pdf'
    }
    return filename
  }

  getUTCFormatedDate(value): Date {
    if (value) {
      return new Date(Date.UTC(
        new Date(value).getFullYear(),
        new Date(value).getMonth(),
        new Date(value).getDate()));
    }
    return null;
  }

  getClientFormattedDate(value): string {
    if (value) {
      let dateObj = new Date(value);
      let month = dateObj.getMonth() + 1;
      let uMonth;
      if (month.toString().length < 2) {
        uMonth = '0' + month;
      }
      else {
        uMonth = month
      }
      let day = dateObj.getDate();
      let uDay;
      if (day.toString().length < 2) {
        uDay = '0' + day;
      }
      else {
        uDay = day
      }
      let year = dateObj.getFullYear();
      return uMonth + "-" + uDay + "-" + year;
    }
    return '';
  }
}
