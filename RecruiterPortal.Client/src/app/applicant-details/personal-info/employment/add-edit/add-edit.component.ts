import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddEditService } from './add-edit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompareValidator } from '../../../../common/directives/compare-validator.directive';
import { StorageService } from '../../../../common/services/storage.service';

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
    public institutionResults: any[];
    private userCompanyId;

    constructor(private messageService: MessageService, private fb: FormBuilder, private addEditService: AddEditService, private router: Router, private activeRoute: ActivatedRoute, private storageService: StorageService) { }

    ngOnInit() {
        this.activeRoute.paramMap.subscribe(params => {
            this.userCompanyId = params.get('id');
            if (this.userCompanyId != null) {
                this.getEmploymentById(this.userCompanyId);
            }
        });

        this.empForm = this.fb.group({
            companyName: ["", Validators.compose([Validators.required, Validators.maxLength(100)])],
            supervisor: ["", Validators.compose([Validators.maxLength(250)])],
            companyPhone: ["", Validators.compose([Validators.required,Validators.maxLength(25)])],
            jobTItle: ["", Validators.compose([Validators.required, Validators.maxLength(100)])],
            startingSalary: ["", Validators.compose([Validators.maxLength(30)])],
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

    getEmploymentById(employmentId: string) {
        this.addEditService.getEmploymentById(employmentId)
            .subscribe(data => {
                this.empForm.patchValue({
                    companyName: data.body.CompanyName,
                    supervisor: data.body.Supervisor,
                    companyPhone: data.body.CompanyPhone,
                    jobTItle:data.body.JobTitle,
                    startingSalary: data.body.StartingSalary,
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
        const employmentModel = {
            ID: this.userCompanyId,
            InstituteID: this.empForm.controls.instituteId.value,
            PositionID: this.empForm.controls.positionId.value,
            ApplicantID: this.storageService.getApplicantId,
            CompanyPhone: this.empForm.controls.companyPhone.value,
            Supervisor: this.empForm.controls.supervisor.value,
            CompanyName: this.empForm.controls.companyName.value,
            JobTitle: this.empForm.controls.jobTItle.value,
            StartingSalary: this.empForm.controls.startingSalary.value,
            FromDate: this.empForm.controls.fromDate.value ? new Date(this.empForm.controls.fromDate.value).toLocaleString() : '',
            ToDate: this.empForm.controls.toDate.value ? new Date(this.empForm.controls.toDate.value).toLocaleString() : '',
            LeaveReason: this.empForm.controls.leaveReason.value,
            CanContactThisEmployer: this.empForm.controls.canContactThisEmployer.value == "YES" ? true : false,
            Responisiblities: this.empForm.controls.responisiblities.value
        };

        if (!this.empForm.invalid) {
            this.isLoading = true;
            if (this.userCompanyId != null) {
                this.addEditService.updaeteEmployment(employmentModel)
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
                this.addEditService.insertEmployment(employmentModel)
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
        this.addEditService.getPositionByPositionName($event.query).subscribe(response => {
            this.positionResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }
    onPositionSelect($event) {
        this.empForm.patchValue({
            jobTItle: $event.PositionName,
            positionId: $event.Id
        });
    }

    onInstitutiionSearch($event) {
        this.addEditService.getInsituteByInsituteName($event.query).subscribe(response => {
            if (response.status === 200) {
                this.institutionResults = response.body;
            }
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get institutes', detail: '' }); },
            () => { });
    }

    onInstitutiionSelect($event) {
        this.empForm.patchValue({
            instituteId: $event.Id,
            companyName: $event.InstituteName
        });
    }

}
