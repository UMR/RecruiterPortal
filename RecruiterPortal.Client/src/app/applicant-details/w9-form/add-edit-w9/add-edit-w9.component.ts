import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddEditW9Service } from './add-edit-w9.service';
import { AddEditW9Model } from './add-edit-w9.model';
import { CompareValidator } from '../../../common/directives/compare-validator.directive';
import { forkJoin } from 'rxjs';
import { SelectItem } from 'primeng/primeng';
import { StorageService } from '../../../common/services/storage.service';

@Component({
  selector: 'app-add-edit-w9',
  templateUrl: './add-edit-w9.component.html',
  styleUrls: ['./add-edit-w9.component.css'],
  providers: [MessageService]
})
export class AddEditW9Component implements OnInit {
  public addEditW9FormGroup: FormGroup;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public zipCodeResults: string[];
  private wId: string = "";
  public isDisable = null;

  constructor(private addEditW9Service: AddEditW9Service, private fb: FormBuilder, private router: Router,
    private messageService: MessageService, private activeRoute: ActivatedRoute, private service: StorageService) {
    this.addEditW9FormGroup = this.fb.group({
      name: [''],
      businessName: [''],
      companyLiability: false,
      taxClassification: [''],
      FATCACode: [''],
      stAddress: [''],
      aptNo: [''],
      zipCode: [''],
      state: [''],
      city: [''],
      accountNo: [''],
      requesterName: [''],
      ssn: [''],
      empIdNo: [''],
      payeeCode: [''],
      date: ['']
    });
  }

  ngOnInit() {
    this.addEditW9Service.getW9Info(this.service.getApplicantId)
      .subscribe(data => {
        if (data.status === 200 && data.body !== null) {
          this.wId = data.body.WID;
          this.addEditW9FormGroup.setValue({
            name: data.body.Name,
            businessName: data.body.BusinessName,
            companyLiability: data.body.CompanyLiability,
            taxClassification: "",
            FATCACode: data.body.ReportingCode,
            stAddress: data.body.StreetAddress,
            aptNo: data.body.AptNo,
            zipCode: { ZipCode: data.body.ZipCode },
            state: data.body.StateName,
            city: data.body.City,
            accountNo: data.body.AccountNumber,
            requesterName: data.body.RequesterNameAddress,
            ssn: data.body.SSN,
            empIdNo: data.body.EmployerIdNo,
            payeeCode: data.body.PayeeCode,
            date: data.body.Date ? new Date(data.body.Date) : null,
          });
          
          if (data.body.CompanyLiability) {
            this.isDisable = true;
            //this.addEditW9FormGroup.patchValue({ companyLiability: true })
          }
          else {
            this.isDisable = null;
            //this.addEditW9FormGroup.patchValue({ companyLiability: "NO" })
          }
          if (data.body.CCorporation == true) {
            this.addEditW9FormGroup.patchValue({ taxClassification: "cCor" })
          }
          if (data.body.IndividualProprietor == true) {
            this.addEditW9FormGroup.patchValue({ taxClassification: "proprietor" })
          }
          if (data.body.SCorporation == true) {
            this.addEditW9FormGroup.patchValue({ taxClassification: "sCor" })
          }
          if (data.body.Partnership == true) {
            this.addEditW9FormGroup.patchValue({ taxClassification: "partnarship" })
          }
          if (data.body.Trust == true) {
            this.addEditW9FormGroup.patchValue({ taxClassification: "trust" })
          }
          if (data.body.Other == true) {
            this.addEditW9FormGroup.patchValue({ taxClassification: "other" })
          }
          if (data.body.CCorporation == false && data.body.SCorporation == false && data.body.Partnership == false && data.body.IndividualProprietor == false
            && data.body.trust == false && data.body.other == false) {
            this.addEditW9FormGroup.patchValue({ taxClassification: "" })
          }
        }
        else if (data.status === 200 && data.body == null) {
          this.addEditW9Service.getApplicantInfo(this.service.getApplicantId).subscribe(data => {
            if (data.status === 200 && data.body !== null) {
              if (data.body.Data.MiddleName !== null || data.body.Data.MiddleName !== "") {
                this.addEditW9FormGroup.patchValue({
                  name: data.body.Data.FirstName + " " + data.body.Data.MiddleName + " " + data.body.Data.LastName
                });
              }
              else {
                this.addEditW9FormGroup.patchValue({
                  name: data.body.Data.FirstName + " " + data.body.Data.LastName
                });
              }
            }
          },
            err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant info', detail: '' }); },
            () => { this.isLoading = false; });
        }
      },
        err => {
          console.log(err);
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get W9 info', detail: '' });
        },
        () => { this.isLoading = false; });
  }



  onSubmit() {
    if (this.wId == "" && this.isEmpty()) {
      this.messageService.add({ key: 'toastKey1', severity: 'warn', summary: 'Please fill at least one field', detail: '' });
      return;
    }
    else {
      const w9Model = new AddEditW9Model();
      if (this.wId != "") {
        w9Model.WID = this.wId;
      }
      w9Model.ApplicantId = this.service.getApplicantId.toString();
      w9Model.Name = this.addEditW9FormGroup.get('name').value;
      w9Model.BusinessName = this.addEditW9FormGroup.get('businessName').value;
      w9Model.CompanyLiability = this.addEditW9FormGroup.get('companyLiability').value == true ? true : false;
      w9Model.IndividualProprietor = this.addEditW9FormGroup.get('taxClassification').value == "proprietor" ? true : false;
      w9Model.CCorporation = this.addEditW9FormGroup.get('taxClassification').value == "cCor" ? true : false;
      w9Model.SCorporation = this.addEditW9FormGroup.get('taxClassification').value == "sCor" ? true : false;
      w9Model.Partnership = this.addEditW9FormGroup.get('taxClassification').value == "partnarship" ? true : false;
      w9Model.Trust = this.addEditW9FormGroup.get('taxClassification').value == "trust" ? true : false;
      w9Model.Other = this.addEditW9FormGroup.get('taxClassification').value == "other" ? true : false;
      w9Model.PayeeCode = this.addEditW9FormGroup.get('payeeCode').value;
      w9Model.ReportingCode = this.addEditW9FormGroup.get('FATCACode').value;
      w9Model.StreetAddress = this.addEditW9FormGroup.get('stAddress').value;
      w9Model.AptNo = this.addEditW9FormGroup.get('aptNo').value;
      if (this.addEditW9FormGroup.get('zipCode').value != "") {
        w9Model.ZipCode = this.addEditW9FormGroup.get('zipCode').value.ZipCode;
      }
      w9Model.City = this.addEditW9FormGroup.get('city').value;
      w9Model.StateName = this.addEditW9FormGroup.get('state').value;
      w9Model.AccountNumber = this.addEditW9FormGroup.get('accountNo').value;
      w9Model.RequesterNameAddress = this.addEditW9FormGroup.get('requesterName').value;
      w9Model.SSN = this.addEditW9FormGroup.get('ssn').value;
      w9Model.EmployerIdNo = this.addEditW9FormGroup.get('empIdNo').value;
      w9Model.Date = this.addEditW9FormGroup.get('date').value ? this.getUTCFormatedDate(this.addEditW9FormGroup.get('date').value) : Date;
      this.isLoading = true;
      this.addEditW9Service.saveW9Info(w9Model)
        .subscribe(result => {
          if (result.status === 200) {
            this.router.navigate(['/w9-form-info/'/*, { updateSuccessful: 1 }*/]);
          }
          else {
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update w9 form info', detail: '' });
          }
        },
          err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update w9 form info', detail: '' }); },
          () => { this.isLoading = false; })
    }
  }

  getClientFormattedDate(value): Date {
    if (value) {
      var dateParts = value.split("-");
      var dateObject = new Date(+dateParts[2], dateParts[0] - 1, +dateParts[1]);

      return dateObject;
    }
    return null;
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

  onClear() {
    this.addEditW9FormGroup.setValue({
      name: '',
      businessName: '',
      companyLiability: false,
      taxClassification: '',
      FATCACode: '',
      stAddress: '',
      aptNo: '',
      zipCode: '',
      state: '',
      city: '',
      accountNo: '',
      requesterName: '',
      ssn: '',
      empIdNo: '',
      payeeCode: '',
      date: ''
    });
  }
  onZipCodeSearch($event) {
    this.addEditW9Service.getZipCodeCityStateByZipCode($event.query).subscribe(data => {
      this.zipCodeResults = data.body.Data;
    },
      err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get zip code', detail: '' }); },
      () => { });
  }
  onZipCodeSelect($event) {
    this.addEditW9FormGroup.patchValue({
      city: $event.City,
      state: $event.StateName
    });
  }
  onCompanyLiabilityChange() {
    var liabilty = this.addEditW9FormGroup.get('companyLiability').value;
    if (liabilty) {
      this.isDisable = true;
      this.addEditW9FormGroup.patchValue({ taxClassification: '' });
    }
    else {
      this.isDisable = null;
      this.addEditW9FormGroup.patchValue({ taxClassification: '' });
    }

    //var liabilty = this.addEditW9FormGroup.get('companyLiability').value;
    //if (liabilty==="YES") {
    //  this.isDisable = true;
    //  this.addEditW9FormGroup.patchValue({ taxClassification: '' });
    //}
    //else {
    //  this.isDisable = null;
    //  this.addEditW9FormGroup.patchValue({ taxClassification: '' });
    //}

  }

  isEmpty(): boolean {
    let isEmpty: boolean = true;
    if (this.addEditW9FormGroup.get('name').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('businessName').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('companyLiability').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('taxClassification').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('FATCACode').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('stAddress').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('aptNo').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('zipCode').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('city').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('state').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('accountNo').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('requesterName').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('ssn').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('empIdNo').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('payeeCode').value) {
      isEmpty = false;
    }
    if (this.addEditW9FormGroup.get('date').value) {
      isEmpty = false;
    }
    return isEmpty;
  }
}
