import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EditUSCISService } from './add-edit-uscis.service';
import { StorageService } from '../../../common/services/storage.service';

@Component({
  selector: 'app-add-edit-uscis',
  templateUrl: './add-edit-uscis.component.html',
  styleUrls: ['./add-edit-uscis.component.css']
})
export class AddEditUscisComponent implements OnInit {
  public zipCodeResults: string[];
  public isLoading: boolean;
  public submitted: boolean;
  public addEditUSCISGroup: FormGroup;
  public userUSCIS: any = {};
  public userUSCISId: number;

  constructor(private fb: FormBuilder,
    private editUSCISService: EditUSCISService,
    private router: Router,
    private messageService: MessageService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createUSCISFormGroup();
    this.getUSCISByUserId();
  }

  createUSCISFormGroup() {
    this.addEditUSCISGroup = this.fb.group({
      uSCISNumber: '',
      workAuthExpiryDate: '',
      i94AdmissionNumber: '',
      foreignPassort: '',
      additionalInformation: '',
      translatorFirstName: '',
      translatorLastName: '',
      streetAddress: '',
      apt: '',
      zipCode: '',
      city: '',
      stateName: '',
      employmentDate: '',
      documentTitle: '',
      documentNumber: '',
      expirationDate: '',
      isNonCitizen: '',
      isLawFullPermanent: ''
    });
    //console.log(this.addEditUSCISGroup);
  }

  getUSCISByUserId() {
    this.isLoading = true;
    this.editUSCISService.getUserUSCIS()
      .subscribe(data => {
        if (data.status === 200 && data.body != null) {
          this.userUSCIS = data.body;
          this.userUSCISId = this.userUSCIS || this.userUSCIS.USCISID ? +this.userUSCIS.USCISID : 0;
          this.fillUpUSCISInfo();
        }
        console.log(this.userUSCIS);
        //console.log(this.userUSCISId);
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get nurse form', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  fillUpUSCISInfo() {
    this.addEditUSCISGroup.setValue({
      uSCISNumber: this.checkNullOrUndefined(this.userUSCIS.USCISNumber),
      workAuthExpiryDate: this.userUSCIS.WorkAuthExpiryDate ? new Date(this.userUSCIS.WorkAuthExpiryDate) : null,
      i94AdmissionNumber: this.checkNullOrUndefined(this.userUSCIS.I94AdmissionNumber),
      foreignPassort: this.checkNullOrUndefined(this.userUSCIS.ForeignPassort),
      additionalInformation: this.checkNullOrUndefined(this.userUSCIS.AdditionalInformation),
      translatorFirstName: this.checkNullOrUndefined(this.userUSCIS.TranslatorFirstName),
      translatorLastName: this.checkNullOrUndefined(this.userUSCIS.TranslatorLastName),
      streetAddress: this.checkNullOrUndefined(this.userUSCIS.StreetAddress),
      apt: this.checkNullOrUndefined(this.userUSCIS.Apt),
      zipCode: { ZipCode: this.checkNullOrUndefined(this.userUSCIS.ZipCode) },//{ zipCode: this.checkNullOrUndefined(this.userUSCIS.zipCode) }
      city: this.checkNullOrUndefined(this.userUSCIS.City),
      stateName: this.checkNullOrUndefined(this.userUSCIS.StateName),
      employmentDate: this.userUSCIS.EmploymentDate ? new Date(this.userUSCIS.EmploymentDate) : null,
      documentTitle: this.checkNullOrUndefined(this.userUSCIS.DocumentTitle),
      documentNumber: this.checkNullOrUndefined(this.userUSCIS.DocumentNumber),
      expirationDate: this.userUSCIS.ExpirationDate ? new Date(this.userUSCIS.ExpirationDate) : null,
      isNonCitizen: this.setRadioButtonData(this.userUSCIS.IsNonCitizen),
      isLawFullPermanent: this.setRadioButtonData(this.userUSCIS.IsLawFullPermanent)
    });

  }

  onClear() {
    console.log('Helo');
    this.addEditUSCISGroup.setValue({
      uSCISNumber: '',
      workAuthExpiryDate: '',
      i94AdmissionNumber: '',
      foreignPassort: '',
      additionalInformation: '',
      translatorFirstName: '',
      translatorLastName: '',
      streetAddress: '',
      apt: '',
      zipCode: '',
      city: '',
      stateName: '',
      employmentDate: '',
      documentTitle: '',
      documentNumber: '',
      expirationDate: '',
      isNonCitizen: '',
      isLawFullPermanent: ''
    });
  }

  onSubmit() {
    if (!this.userUSCISId && this.isEmpty()) {
      this.messageService.add({ key: 'toastKey1', severity: 'warn', summary: 'Please fill at least one field', detail: '' });
      return;
    }
    else {
      const model: any = {
        uSCISID: this.userUSCISId ? +this.userUSCISId : 0,
        uSCISNumber: this.addEditUSCISGroup.controls.uSCISNumber.value,
        workAuthExpiryDate: this.addEditUSCISGroup.controls.workAuthExpiryDate.value ? new Date(Date.UTC(
          new Date(this.addEditUSCISGroup.controls.workAuthExpiryDate.value).getFullYear(),
          new Date(this.addEditUSCISGroup.controls.workAuthExpiryDate.value).getMonth(),
          new Date(this.addEditUSCISGroup.controls.workAuthExpiryDate.value).getDate())) : Date,
        i94AdmissionNumber: this.addEditUSCISGroup.controls.i94AdmissionNumber.value,
        foreignPassort: this.addEditUSCISGroup.controls.foreignPassort.value,
        translatorFirstName: this.addEditUSCISGroup.controls.translatorFirstName.value,
        translatorLastName: this.addEditUSCISGroup.controls.translatorLastName.value,
        streetAddress: this.addEditUSCISGroup.controls.streetAddress.value,
        apt: this.addEditUSCISGroup.controls.apt.value,
        zipCode: this.addEditUSCISGroup.get('zipCode').value ? this.addEditUSCISGroup.get('zipCode').value.ZipCode : "", //this.editApplicantInfoFormGroup.get('zipCode').value ? this.editApplicantInfoFormGroup.get('zipCode').value.zipCode : ""
        city: this.addEditUSCISGroup.controls.city.value,
        stateName: this.addEditUSCISGroup.controls.stateName.value,
        additionalInformation: this.addEditUSCISGroup.controls.additionalInformation.value,
        employmentDate: this.addEditUSCISGroup.controls.employmentDate.value ? new Date(Date.UTC(
          new Date(this.addEditUSCISGroup.controls.employmentDate.value).getFullYear(),
          new Date(this.addEditUSCISGroup.controls.employmentDate.value).getMonth(),
          new Date(this.addEditUSCISGroup.controls.employmentDate.value).getDate())) : Date,
        documentTitle: this.addEditUSCISGroup.controls.documentTitle.value,
        documentNumber: this.addEditUSCISGroup.controls.documentNumber.value,
        expirationDate: this.addEditUSCISGroup.controls.expirationDate.value ? new Date(Date.UTC(
          new Date(this.addEditUSCISGroup.controls.expirationDate.value).getFullYear(),
          new Date(this.addEditUSCISGroup.controls.expirationDate.value).getMonth(),
          new Date(this.addEditUSCISGroup.controls.expirationDate.value).getDate())) : Date,
        isNonCitizen: this.getBooleanValue(this.addEditUSCISGroup.get('isNonCitizen').value.trim()),
        isLawFullPermanent: this.getBooleanValue(this.addEditUSCISGroup.get('isLawFullPermanent').value.trim()),
        applicantID: this.storageService.getApplicantId
      };
      //console.log(new Date(this.addEditUSCISGroup.controls.expirationDate.value).getDate());
      //console.log(model);

      this.isLoading = true;
      if (this.userUSCISId && this.isEmpty()) {
        this.editUSCISService.deleteUSCISInfo(+this.userUSCISId)
          .subscribe(data => {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully delete', detail: '' });
          },
            err => {
              this.isLoading = false;
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load', detail: '' });
            },
            () => {
              this.isLoading = false;
              this.router.navigate(['/uscis-info/']);
            });
      }
      else {
        this.editUSCISService.save(model).subscribe(() => {
          this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'USCIS information has been added successfully', detail: '' });
        }, error => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save USCIS information', detail: '' });
        },
          () => {
            this.isLoading = false;
            this.router.navigate(['/uscis-info/']);
          });
      }
    }
  }

  checkNullOrUndefined(value) {
    if (value) {
      return value;
    }
    return '';
  }

  isEmpty(): boolean {
    let isEmpty: boolean = true;
    if (this.addEditUSCISGroup.controls.uSCISNumber.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.workAuthExpiryDate.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.i94AdmissionNumber.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.foreignPassort.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.translatorFirstName.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.translatorLastName.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.streetAddress.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.apt.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.zipCode.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.city.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.stateName.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.additionalInformation.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.employmentDate.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.documentTitle.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.documentNumber.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.expirationDate.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.isNonCitizen.value) {
      isEmpty = false;
    }
    if (this.addEditUSCISGroup.controls.isLawFullPermanent.value) {
      isEmpty = false;
    }
    return isEmpty;
  }

  setRadioButtonData(value) {
    if (value == undefined || value == null) {
      return ''
    }
    return value.toString() == 'true' ? "YES" : "NO";
  }

  getBooleanValue(value: string): boolean {
    return value.toLowerCase() === "yes" ? true : false;
  }

  onZipCodeSearch($event) {
    this.editUSCISService.getZipCodeCityStateByZipCode($event.query).subscribe(data => {
      console.log(); this.zipCodeResults = data.body.Data;
    },
      err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get zip code', detail: '' }); },
      () => { });
  }

  onZipCodeSelect($event) {
    console.log($event);
    this.addEditUSCISGroup.patchValue({
      city: $event.City,
      stateName: $event.StateName
    });
  }
}
