import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AgencyProfileService } from './agency-profile.service';


@Component({
  selector: 'app-agency-profile',
  templateUrl: './agency-profile.component.html',
  styleUrls: ['./agency-profile.component.css']
})
export class AgencyProfileComponent implements OnInit {

  public isLoading: boolean = false;
  public isSubmitted: boolean = false;
  public agencyFormGroup: FormGroup;
  public agency: any = {};
  private agencyId: number;

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private agencyProfileService: AgencyProfileService,
    private router: Router) {
    this.createAgencyFormGroup();
  }

  ngOnInit() {
    this.getAgencyByUserId();
  }

  createAgencyFormGroup() {
    this.agencyFormGroup = this.fb.group({
      agencyName: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(500)]],
      agencyUrl: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(256)]],
      agencyEmail: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(256)]],
      agencyPhone: ['', [Validators.required, Validators.maxLength(15)]],
      agencyAddress: ['', [Validators.required, Validators.maxLength(512)]],
      agencyContactPerson: [''],
      agencyContactPersonPhone: ['']
    });
  }

  getAgencyByUserId() {
    this.isLoading = true;
    this.agencyProfileService.getAgencyByUserId()
      .subscribe(response => {        
        if (response.status === 200) {
          this.agency = response.body;
          this.agencyId = this.agency.AgencyID;          
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to get agency' });
        },
        () => {
          this.fillUpAgency();
          this.isLoading = false;
        });
  }

  fillUpAgency() {
    this.agencyFormGroup.controls.agencyName.setValue(this.agency.AgencyName);
    this.agencyFormGroup.controls.agencyUrl.setValue(this.agency.AgencyUrlPrefix);
    this.agencyFormGroup.controls.agencyEmail.setValue(this.agency.AgencyEmail);
    this.agencyFormGroup.controls.agencyPhone.setValue(this.agency.AgencyPhone);
    this.agencyFormGroup.controls.agencyAddress.setValue(this.agency.AgencyAddress);
    this.agencyFormGroup.controls.agencyContactPerson.setValue(this.agency.ContactPersonName);
    this.agencyFormGroup.controls.agencyContactPersonPhone.setValue(this.agency.ContactPersonPhone);
  }

  onSubmit() {
    this.isLoading = true;
    const agencyMmodel = {
      AgencyID: this.agencyId,
      AgencyName: this.agencyFormGroup.controls.agencyName.value,
      AgencyUrlPrefix: this.agencyFormGroup.controls.agencyUrl.value,
      AgencyEmail: this.agencyFormGroup.controls.agencyEmail.value,
      AgencyPhone: this.agencyFormGroup.controls.agencyPhone.value,
      AgencyAddress: this.agencyFormGroup.controls.agencyAddress.value,
      ContactPersonName: this.agencyFormGroup.controls.agencyContactPerson.value,
      ContactPersonPhone: this.agencyFormGroup.controls.agencyContactPersonPhone.value
    };

    this.agencyProfileService.updateAgency(agencyMmodel)
      .subscribe(response => {        
        if (response.status === 200) {
          this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: 'Agency Updated' });
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to update agency profile' });
        },
        () => {
          this.isLoading = false;
        });
  }

  onClear() {
    this.agencyFormGroup.controls.agencyPhone.setValue('');
    this.agencyFormGroup.controls.agencyAddress.setValue('');
    this.agencyFormGroup.controls.agencyContactPerson.setValue('');
    this.agencyFormGroup.controls.agencyContactPersonPhone.setValue('');
  }

  onBack() {
    this.router.navigate(['view-by-applicant']);
  }

}
