import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddEditService } from './add-edit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompareValidator } from '../../../common/directives/compare-validator.directive';
import { StorageService } from '../../../common/services/storage.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public isLoading: boolean = false;
  public empForm: FormGroup;
  public submitted: boolean = false;
  public employmentModal: EmploymentModel[] = [];
  public positionResults: string[];
  public institutionResults: string[];
  private userCompanyId;

  constructor(private messageService: MessageService, private fb: FormBuilder, private addEditService: AddEditService, private router: Router, private activeRoute: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.userCompanyId = params.get('id');
      if (this.userCompanyId != null) {
        this.getUserCompany(this.userCompanyId);
      }
    });

    this.empForm = this.fb.group({
      companyName: ["", Validators.compose([Validators.required, Validators.maxLength(30)])],
      //companyAddress: ["", Validators.compose([Validators.maxLength(500)])],
      supervisor: ["", Validators.compose([Validators.maxLength(250)])],
      companyPhone: ["", Validators.compose([Validators.maxLength(50)])],
      jobTItle: ["", Validators.compose([Validators.required, Validators.maxLength(100)])],
      startingSalary: ["", Validators.compose([Validators.maxLength(30)])],
      //endingSalary: ["", Validators.compose([Validators.maxLength(30)])],
      fromDate: [null, [new CompareValidator('toDate', '<', 'true')]],
      toDate: [null, [new CompareValidator('fromDate', '>', 'true')]],
      leaveReason: [""],
      responisiblities: ["", Validators.compose([Validators.maxLength(500)])],
      canContactThisEmployer: ["", Validators.required],
      positionId: [''],
      instituteId: [''],
      institutePhoneId: [''],
    });
  }

  get f() { return this.empForm.controls; }

  getUserCompany(userId: string) {
    this.addEditService.getEmpInfo(userId)
      .subscribe(data => {
        console.log(data);
        this.empForm.patchValue({
          companyName: {
            Text: data.body.CompanyName
          },
          //companyAddress: data.body.CompanyAddress,
          supervisor: data.body.Supervisor,
          companyPhone: data.body.CompanyPhone,
          jobTItle: {
            Text: data.body.JobTItle
          },
          startingSalary: data.body.StartingSalary,
          //endingSalary: data.body.EndingSalary,
          fromDate: data.body.FromDate ? new Date(data.body.FromDate) : null,
          toDate: data.body.ToDate ? new Date(data.body.ToDate) : null,
          leaveReason: data.body.LeaveReason,
          responisiblities: data.body.Responisiblities,
          canContactThisEmployer: data.body.CanContactThisEmployer == true ? "YES" : "NO",
          positionId: data.body.PositionID,
          instituteId: data.body.InstituteID,
          institutePhoneId: data.body.InstitutePhoneID,
        });



      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load', detail: '' });
        },
        () => {
          this.isLoading = false;
        });

  }
  onSubmit() {
    this.submitted = true;
    this.employmentModal = [];
    if (!this.empForm.invalid) {
      this.isLoading = true;
      if (this.userCompanyId != null) {
        this.employmentModal.push({
          ID: this.userCompanyId,
          InstituteID: this.empForm.get('instituteId').value,
          InstitutePhoneID: this.empForm.get('institutePhoneId').value,
          PositionID: this.empForm.get('positionId').value,
          ApplicantID: this.storageService.getApplicantId,
          CompanyPhone: this.empForm.get('companyPhone').value,
          CompanyAddress: "",
          Supervisor: this.empForm.get('supervisor').value,
          CompanyName: this.empForm.get('companyName').value.Text,
          JobTItle: this.empForm.get('jobTItle').value.Text,
          StartingSalary: this.empForm.get('startingSalary').value,
          EndingSalary: "",
          FromDate: this.empForm.get('fromDate').value ? new Date(this.empForm.get('fromDate').value).toLocaleString() : '',
          ToDate: this.empForm.get('toDate').value ? new Date(this.empForm.get('toDate').value).toLocaleString() : '',
          LeaveReason: this.empForm.get('leaveReason').value,
          CanContactThisEmployer: this.empForm.get('canContactThisEmployer').value == "YES" ? true : false,
          Responisiblities: this.empForm.get('responisiblities').value
        })
        this.addEditService.updaeteEmpInfo(this.employmentModal[0])
          .subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully Update', detail: '' });
              this.router.navigate(['/personal-info/employment']);
            }
          },
            err => {
              this.isLoading = false;
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to Saved', detail: '' });
            },
            () => {
              this.isLoading = false;
            });
      }
      else {
        this.employmentModal.push({
          ID: "",
          InstituteID: this.empForm.get('instituteId').value,
          InstitutePhoneID: this.empForm.get('institutePhoneId').value,
          PositionID: this.empForm.get('positionId').value,
          ApplicantID: this.storageService.getApplicantId,
          CompanyPhone: this.empForm.get('companyPhone').value,
          CompanyAddress: "",
          Supervisor: this.empForm.get('supervisor').value,
          CompanyName: this.empForm.get('companyName').value.Text,
          JobTItle: this.empForm.get('jobTItle').value.Text,
          StartingSalary: this.empForm.get('startingSalary').value,
          EndingSalary: "",
          FromDate: this.empForm.get('fromDate').value ? new Date(this.empForm.get('fromDate').value).toLocaleString() : '',
          ToDate: this.empForm.get('toDate').value ? new Date(this.empForm.get('toDate').value).toLocaleString() : '',
          LeaveReason: this.empForm.get('leaveReason').value,
          CanContactThisEmployer: this.empForm.get('canContactThisEmployer').value == "YES" ? true : false,
          Responisiblities: this.empForm.get('responisiblities').value
        })
        console.log(this.employmentModal[0]);
        this.addEditService.insertEmp(this.employmentModal[0])
          .subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully Saved', detail: '' });
              this.router.navigate(['/personal-info/employment']);
            }
          },
            err => {
              this.isLoading = false;
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to Saved', detail: '' });
            },
            () => {
              this.isLoading = false;
            });
      }
    }
  }
  onClear() {
    this.empForm.reset()
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

  onPositionSearch($event) {
    this.addEditService.getPositionByPositionName($event.query).subscribe(data => {
      //console.log(data.body.Data);
      this.positionResults = data.body.Data;
    },
      err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get position', detail: '' }); },
      () => { });
  }
  onPositionSelect($event) {
    //console.log($event.Value);
    this.empForm.patchValue({
      positionId: $event.Value
    });
  }

  onInstitutiionSearch($event) {
    this.addEditService.getInsituteByInsituteName($event.query).subscribe(data => {
      //console.log(data.body.Data);
      this.institutionResults = data.body.Data;
    },
      err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get institute', detail: '' }); },
      () => { });
  }
  onInstitutiionSelect($event) {
    //console.log($event.Value);
    this.empForm.patchValue({
      instituteId: $event.Value,
      companyPhone: $event.Phone,
      institutePhoneId: $event.PhoneID
    });
  }

}
