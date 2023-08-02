import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../common/services/storage.service';
import { InfluenzaVaccinationService } from '../influenza-vaccination.service';

@Component({
  selector: 'app-add-edit-influenza-vaccination',
  templateUrl: './add-edit-influenza-vaccination.component.html',
  styleUrls: ['./add-edit-influenza-vaccination.component.css']
})
export class AddEditInfluenzaVaccinationComponent implements OnInit {

  public isLoading: boolean;
  public submitted: boolean;
  public addEditInfluenzaVaccinationFormGroup: FormGroup;
  public influenzaVaccination: any = {};
  public influenzaVaccinationId: number = null;

  constructor(private fb: FormBuilder,
    private influenzaVaccinationService: InfluenzaVaccinationService,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createInfluenzaVaccinationFormGroup();    
    this.getInfluenzaVaccinationByApplicantId();
  }

  createInfluenzaVaccinationFormGroup() {
    this.addEditInfluenzaVaccinationFormGroup = this.fb.group({
      facilityName: ['', Validators.compose([Validators.maxLength(500)])],
      reasonDeclination: ['', Validators.compose([Validators.maxLength(500)])],
      signature: ['', Validators.compose([Validators.maxLength(500)])],
      entryDate: '',
      name: ['', Validators.compose([Validators.maxLength(500)])],
      department: ['', Validators.compose([Validators.maxLength(500)])]
    });
  }

  getInfluenzaVaccinationByApplicantId() {
    this.isLoading = true;
    this.influenzaVaccinationService.getInfluenzaVaccinationByApplicantId(this.storageService.getApplicantId)
      .subscribe(data => {
        if (data.status === 200 && data.body) {
          this.influenzaVaccination = data.body;
          this.influenzaVaccinationId = this.influenzaVaccination.InfluenzaVaccinationID ? +this.influenzaVaccination.InfluenzaVaccinationID : null;
          this.fillUpInfluenzaVaccination();
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

  checkNullOrUndefined(value) {
    if (value) {
      return value;
    }
    return '';
  }

  isEmptyField(): boolean {
    let isEmpty: boolean = true;
    //if (this.addEditInfluenzaVaccinationFormGroup.controls.facilityName.value) {
    //  isEmpty = false;
    //}
    //if (this.addEditInfluenzaVaccinationFormGroup.controls.reasonDeclination.value) {
    //  isEmpty = false;
    //}
    //if (this.addEditInfluenzaVaccinationFormGroup.controls.signature.value) {
    //  isEmpty = false;
    //}
    //if (this.addEditInfluenzaVaccinationFormGroup.controls.entryDate.value) {
    //  isEmpty = false;
    //}
    //if (this.addEditInfluenzaVaccinationFormGroup.controls.name.value) {
    //  isEmpty = false;
    //}
    //if (this.addEditInfluenzaVaccinationFormGroup.controls.department.value) {
    //  isEmpty = false;
    //}

    Object.keys(this.addEditInfluenzaVaccinationFormGroup.controls).forEach(key => {
      if ((this.addEditInfluenzaVaccinationFormGroup.get(key) as FormGroup).value) {
        isEmpty = false;
      }
    });
    return isEmpty;
  }

  onSubmit() {
    if (this.isEmptyField()) {
      this.messageService.add({ key: 'toastKey1', severity: 'warn', summary: 'Please fill at least one field', detail: '' });
      return;
    }
    else {
      const influenzaVaccination = {
        applicantId: this.storageService.getApplicantId,
        influenzaVaccinationId: this.influenzaVaccinationId,
        facilityName: this.addEditInfluenzaVaccinationFormGroup.controls.facilityName.value,
        reasonDeclination: this.addEditInfluenzaVaccinationFormGroup.controls.reasonDeclination.value,
        signature: this.addEditInfluenzaVaccinationFormGroup.controls.signature.value,
        entryDate: this.addEditInfluenzaVaccinationFormGroup.controls.entryDate.value ? new Date(this.addEditInfluenzaVaccinationFormGroup.controls.entryDate.value).toLocaleString() : '',
        name: this.addEditInfluenzaVaccinationFormGroup.controls.name.value,
        department: this.addEditInfluenzaVaccinationFormGroup.controls.department.value,
      }
      this.isLoading = true;
      this.influenzaVaccinationService.save(influenzaVaccination)
        .subscribe(result => {
          if (result.status === 200) {
            this.router.navigate(['/influenza-vaccination']);
          }
          else {
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update influenza vaccination', detail: '' });
          }
        },
          err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update influenza vaccination', detail: '' }); },
          () => { this.isLoading = false; })
    }
  }

  onClear() {
    //this.addEditInfluenzaVaccinationFormGroup.setValue({
    //  facilityName: '',
    //  reasonDeclination: '',
    //  signature: '',
    //  entryDate: '',
    //  name: '',
    //  department: ''
    //});
    this.addEditInfluenzaVaccinationFormGroup.reset();
  }

  fillUpInfluenzaVaccination() {
    this.addEditInfluenzaVaccinationFormGroup.setValue({
      facilityName: this.checkNullOrUndefined(this.influenzaVaccination.FacilityName),
      reasonDeclination: this.checkNullOrUndefined(this.influenzaVaccination.ReasonDeclination),
      signature: this.checkNullOrUndefined(this.influenzaVaccination.Signature),
      entryDate: this.influenzaVaccination.EntryDate ? new Date(this.influenzaVaccination.EntryDate) : null,
      name: this.checkNullOrUndefined(this.influenzaVaccination.Name),
      department: this.checkNullOrUndefined(this.influenzaVaccination.Department)
    });
  }
}
