import { Component, OnInit } from '@angular/core';
import { RecruiterService } from './recruiter.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { AgencyModel } from '../agency/agency.model';
import { RecruiterModel } from './recruiter.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

    public isLoading: boolean = false;
    public recruiters: any[] = [];
    public totalRecruiter: number;
    public selectedRecruiterId: number;
    public cols: any[];
    public rows: number = 15;
    private recruiterId: number = 0;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedRecruiter: any;
    public submitted: boolean = false;
    public addEditTxt: string = "Add";
    public recruiterArr: any;
    public recruiterDialog: boolean = false;

    public isRecruiter: boolean = false;
    public isSupervisor: boolean = false;
    public isManager: boolean = false;
    public isAdministrator: boolean = false;
    public regForm: FormGroup;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    public isEditMode: boolean = false;


    constructor(private recruiterService: RecruiterService, private messageService: MessageService, private fb: FormBuilder,
        private confirmationService: ConfirmationService) {
        this.getRecruiters();
    }

    ngOnInit() {
        this.regForm = this.fb.group({
            loginId: ["", Validators.required],
            telephone: ["", Validators.required],
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            isActive: [false, Validators.required],
            isRecruiter: [false],
            isSupervisor: [false],
            isManager: [false],
            isAdministrator: [false],
            email: ["", [Validators.pattern(this.emailRegEx)]],
            password: ["", [Validators.required, Validators.minLength(4)]],
            confirmPassword: ["", Validators.required],
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    get f() { return this.regForm.controls; }

    loadAgencyLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getRecruiters();
    }
    getRecruiters() {
        this.isLoading = true;
        this.recruiterService.getRecruiter()
            .subscribe(response => {
                if (response.status === 200) {
                    this.recruiters = (response.body as any).recruiters;
                    this.totalRecruiter = (response.body as any).count;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get recruiter', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onEdit(recruiter: any) {
        this.regForm.controls['loginId'].disable();
        this.regForm.controls['password'].disable();
        this.regForm.controls['confirmPassword'].disable();
        this.addEditTxt = "Edit";
        this.isEditMode = true;
        this.regForm.controls.loginId.setValue(recruiter.LoginId);
        this.regForm.controls.firstName.setValue(recruiter.FirstName);
        this.regForm.controls.lastName.setValue(recruiter.LastName);
        this.regForm.controls.telephone.setValue(recruiter.Telephone);
        this.regForm.controls.isActive.setValue(recruiter.IsActive);
        this.regForm.controls.email.setValue(recruiter.Email);
        this.recruiterId = recruiter.RecruiterId;

        if (recruiter.RecruiterRole.includes('recruiter')) {
            this.regForm.controls.isRecruiter.setValue(true);
        }
        if (recruiter.RecruiterRole.includes('supervisor')) {
            this.regForm.controls.isSupervisor.setValue(true);

        }
        if (recruiter.RecruiterRole.includes('manager')) {
            this.regForm.controls.isManager.setValue(true);
        }
        if (recruiter.RecruiterRole.includes('administrator')) {
            this.regForm.controls.isAdministrator.setValue(true);
        }
        this.recruiterDialog = true;
    }

    onDelete(recruiter: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to change ' + recruiter.FirstName + ' ' + recruiter.LastName + ' status?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //this.agencyService.deleteAgency(agency.agencyId).subscribe(res => {
                //    console.log(res);
                //    if (res && res.body) {
                //        this.agencies = this.agencies.filter((val) => val.agencyId !== agency.agencyId);
                //        this.agency = {};
                //        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Deleted', life: 3000 });
                //    }
                //}, err => { })

            }
        });
    }

    saveAgency() {
        this.submitted = true;

        let recruiterRole: string = "";
        if (recruiterRole == "" && this.regForm.get('isRecruiter').value) {
            recruiterRole = "recruiter";
        }
        else if (recruiterRole != "" && this.regForm.get('isRecruiter').value) {
            recruiterRole = recruiterRole + "," + "recruiter";
        }
        if (recruiterRole == "" && this.regForm.get('isSupervisor').value) {
            recruiterRole = recruiterRole + "," + "supervisor";
        }
        else if (recruiterRole != "" && this.regForm.get('isSupervisor').value) {
            recruiterRole = recruiterRole + "," + "supervisor";
        }
        if (recruiterRole == "" && this.regForm.get('isManager').value) {
            recruiterRole = "manager";
        }
        else if (recruiterRole != "" && this.regForm.get('isManager').value) {
            recruiterRole = recruiterRole + "," + "manager";
        }
        if (recruiterRole == "" && this.regForm.get('isAdministrator').value) {
            recruiterRole = "administrator";
        }
        else if (recruiterRole != "" && this.isAdministrator) {
            recruiterRole = recruiterRole + "," + "administrator";
        }

        const recruiterFormModel = new RecruiterModel();
        recruiterFormModel.LoginId = this.regForm.get('loginId').value;
        recruiterFormModel.FirstName = this.regForm.get('firstName').value;
        recruiterFormModel.LastName = this.regForm.get('lastName').value;
        recruiterFormModel.Password = this.regForm.get('password').value;
        recruiterFormModel.Email = this.regForm.get('email').value;
        recruiterFormModel.Telephone = this.regForm.get('telephone').value;
        recruiterFormModel.IsActive = this.regForm.get('isActive').value;
        recruiterFormModel.AgencyId = 0;
        recruiterFormModel.RecruiterRole = recruiterRole;


        if (!this.isEditMode) {
            this.recruiterService.addRecruiter(recruiterFormModel).subscribe(res => {
                console.log(res);
                this.getRecruiters();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Recruiter add successfully', life: 3000 });
            },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Recruiter Add Faild', life: 3000 });
                },
                () => { })
        }
        else {
            recruiterFormModel.RecruiterId = this.recruiterId;
            this.recruiterService.updateRecruiter(recruiterFormModel).subscribe(res => {
                console.log(res);
                this.getRecruiters();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Recruiter update successfully', life: 3000 });
            },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Recruiter update Faild', life: 3000 });
                },
                () => { })
        }
        this.recruiters = [...this.recruiters];
        this.recruiterDialog = false;
        this.recruiterArr = {};

    }

    onRecruiterSubmit() {
        this.saveAgency();
    }

    onClickClear() {
        this.regForm.reset();
    }

    hideDialog() {
        this.isEditMode = false;
        this.recruiterDialog = false;
        this.submitted = false;
        this.regForm.reset();
    }

    openNewRecruiter() {
        this.regForm.reset();
        this.recruiterId = 0;
        this.regForm.controls['loginId'].enable();
        this.regForm.controls['password'].enable();
        this.regForm.controls['confirmPassword'].enable();
        this.isEditMode = false;
        this.addEditTxt = "Add";
        this.recruiterArr = {};
        this.submitted = false;
        this.recruiterDialog = true;
    }
}