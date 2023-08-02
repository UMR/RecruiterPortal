import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddEditHepabHippaInfoService } from './add-edit-hepab-hippa-info.service';
import { StorageService } from '../../common/services/storage.service';

@Component({
  selector: 'app-add-edit-hepab-hippa-info',
  templateUrl: './add-edit-hepab-hippa-info.component.html',
  styleUrls: ['./add-edit-hepab-hippa-info.component.css']
})
export class AddEditHepabHippaInfoComponent implements OnInit {
  public isLoading: boolean;
  public submitted: boolean;
  public addEditHepabHippaGroup: FormGroup;
  public userHepabHippa: any = {};
  public userHepabHippaID: number;

  constructor(private fb: FormBuilder,
    private editHepabHippaService: AddEditHepabHippaInfoService,
    private router: Router,
    private messageService: MessageService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createHepabHippaFormGroup();
    this.getHepabHippaByUserId();
  }

  createHepabHippaFormGroup() {
    this.addEditHepabHippaGroup = this.fb.group({
      comment: '',
      complianceOfficer: '',
      hasFacilityInfo: '',
      hasHepaConcent: '',
      hasHepaSheet: '',
      hasHepaTraining: '',
      hasNoCostHepa: '',
      isExamined: '',
      signatureDate: '',
      witnessName: '',
      witnessSignatureDate: ''
    });
    //console.log(this.addEditUSCISGroup);
  }

  getHepabHippaByUserId() {
    this.isLoading = true;
    this.editHepabHippaService.getUserHepaBHIPPA()
      .subscribe(data => {
        if (data.status === 200 && data.body.Data != null && data.body.Data.HepaBHIPPAID != 0) {
          this.userHepabHippa = data.body.Data;
          this.userHepabHippaID = this.userHepabHippa.hepaBHIPPAID ? +this.userHepabHippa.hepaBHIPPAID : 0;
          this.fillUpHepaBHIPPAInfo();
        }
        //console.log(this.userUSCIS);
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

  fillUpHepaBHIPPAInfo() {
    this.addEditHepabHippaGroup.setValue({
      comment: this.checkNullOrUndefined(this.userHepabHippa.Comment),
      complianceOfficer: this.checkNullOrUndefined(this.userHepabHippa.ComplianceOfficer),
      hasFacilityInfo: this.setRadioButtonData(this.userHepabHippa.HasFacilityInfo),
      hasHepaConcent: this.setRadioButtonData(this.userHepabHippa.HasHepaConcent),
      hasHepaSheet: this.setRadioButtonData(this.userHepabHippa.HasHepaSheet),
      hasHepaTraining: this.setRadioButtonData(this.userHepabHippa.HasHepaTraining),
      hasNoCostHepa: this.setRadioButtonData(this.userHepabHippa.HasNoCostHepa),
      isExamined: this.setRadioButtonData(this.userHepabHippa.IsExamined),
      signatureDate: this.userHepabHippa.SignatureDate ? new Date(this.userHepabHippa.SignatureDate) : null,
      witnessName: this.checkNullOrUndefined(this.userHepabHippa.WitnessName),
      witnessSignatureDate: this.userHepabHippa.WitnessSignatureDate ? new Date(this.userHepabHippa.WitnessSignatureDate) : null
    });

  }

  onClear() {
    this.addEditHepabHippaGroup.setValue({
      comment: '',
      complianceOfficer: '',
      hasFacilityInfo: '',
      hasHepaConcent: '',
      hasHepaSheet: '',
      hasHepaTraining: '',
      hasNoCostHepa: '',
      isExamined: '',
      signatureDate: '',
      witnessName: '',
      witnessSignatureDate: ''
    });
  }

  onSubmit() {
    if (!this.userHepabHippaID && this.isEmpty()) {
      this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Please fill at least one field', detail: '' });
      return;
    }
    else {
      const model: any = {
        hepaBHIPPAID: this.userHepabHippaID ? +this.userHepabHippaID : 0,
        comment: this.addEditHepabHippaGroup.controls.comment.value.trim(),
        complianceOfficer: this.addEditHepabHippaGroup.controls.complianceOfficer.value.trim(),
        hasFacilityInfo: this.getBooleanValue(this.addEditHepabHippaGroup.get('hasFacilityInfo').value.trim()),
        hasHepaConcent: this.getBooleanValue(this.addEditHepabHippaGroup.get('hasHepaConcent').value.trim()),
        hasHepaSheet: this.getBooleanValue(this.addEditHepabHippaGroup.get('hasHepaSheet').value.trim()),
        hasHepaTraining: this.getBooleanValue(this.addEditHepabHippaGroup.get('hasHepaTraining').value.trim()),
        hasNoCostHepa: this.getBooleanValue(this.addEditHepabHippaGroup.get('hasNoCostHepa').value.trim()),
        isExamined: this.getBooleanValue(this.addEditHepabHippaGroup.get('isExamined').value.trim()),
        signatureDate: this.addEditHepabHippaGroup.controls.signatureDate.value ? new Date(Date.UTC(
          new Date(this.addEditHepabHippaGroup.controls.signatureDate.value).getFullYear(),
          new Date(this.addEditHepabHippaGroup.controls.signatureDate.value).getMonth(),
          new Date(this.addEditHepabHippaGroup.controls.signatureDate.value).getDate())) : Date,
        witnessName: this.addEditHepabHippaGroup.controls.witnessName.value.trim(),
        witnessSignatureDate: this.addEditHepabHippaGroup.controls.witnessSignatureDate.value ? new Date(Date.UTC(
          new Date(this.addEditHepabHippaGroup.controls.witnessSignatureDate.value).getFullYear(),
          new Date(this.addEditHepabHippaGroup.controls.witnessSignatureDate.value).getMonth(),
          new Date(this.addEditHepabHippaGroup.controls.witnessSignatureDate.value).getDate())) : Date,
        applicantID: this.storageService.getApplicantId
      };
      //console.log(model);

      this.isLoading = true;
      if (this.userHepabHippaID && this.isEmpty()) {
        this.editHepabHippaService.deleteHepaBHIPPAInfo(+this.userHepabHippaID)
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
        this.editHepabHippaService.save(model).subscribe(() => {
          this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'USCIS information has been added successfully', detail: '' });
        }, error => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save USCIS information', detail: '' });
        },
          () => {
            this.isLoading = false;
            this.router.navigate(['/hepab-hippa-info/']);
          });
      }
    }
  }

  getBooleanValue(value: string): boolean {
    return value.toLowerCase() === "yes" ? true : false;
  }

  setRadioButtonData(value) {
    if (value == undefined || value == null) {
      return ''
    }
    return value.toString() == 'true' ? "YES" : "NO";
  }

  checkNullOrUndefined(value) {
    if (value) {
      return value;
    }
    return '';
  }

  isEmpty(): boolean {
    let isEmpty: boolean = true;
    if (this.addEditHepabHippaGroup.controls.comment.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.complianceOfficer.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.hasFacilityInfo.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.hasHepaConcent.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.hasHepaSheet.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.hasHepaTraining.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.hasNoCostHepa.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.isExamined.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.signatureDate.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.witnessName.value) {
      isEmpty = false;
    }
    if (this.addEditHepabHippaGroup.controls.witnessSignatureDate.value) {
      isEmpty = false;
    }
    return isEmpty;
  }

  onHasHepaConcentChange($event) {
    //if ($event.target.value == 'YES') {
    //  this.editApplicantInfoFormGroup.controls['ssn'].enable();
    //  this.editApplicantInfoFormGroup.patchValue({ isAuthorized: 'YES' });
    //  this.editApplicantInfoFormGroup.controls['isAuthorized'].disable();
    //}
    //else if ($event.target.value == 'NO') {
    //  this.editApplicantInfoFormGroup.patchValue({ isAuthorized: '' });
    //  this.editApplicantInfoFormGroup.controls['isAuthorized'].enable();
    //  this.editApplicantInfoFormGroup.patchValue({ ssn: '' });
    //  this.editApplicantInfoFormGroup.controls['ssn'].disable();
    //}
    //else {
    //  this.editApplicantInfoFormGroup.patchValue({ isAuthorized: '' });
    //  this.editApplicantInfoFormGroup.controls['isAuthorized'].disable();
    //  this.editApplicantInfoFormGroup.patchValue({ ssn: '' });
    //  this.editApplicantInfoFormGroup.controls['ssn'].disable();
    //}
  }
}
