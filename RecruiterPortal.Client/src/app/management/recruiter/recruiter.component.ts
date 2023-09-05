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
            isRecruiter: [false, Validators.required],
            isSupervisor: [false, Validators.required],
            isManager: [false, Validators.required],
            isAdministrator: [false, Validators.required],
            email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
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
                console.log(response);
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
        console.log(recruiter);
        this.addEditTxt = "Edit";
        this.regForm.controls.loginId.setValue(recruiter.LoginId);
        this.regForm.controls.firstName.setValue(recruiter.FirstName);
        this.regForm.controls.lastName.setValue(recruiter.LastName);
        this.regForm.controls.telephone.setValue(recruiter.Telephone);
        this.regForm.controls.isRecruiter.setValue(recruiter.Recruiter);
        this.regForm.controls.isSupervisor.setValue(recruiter.isSupervisor);
        this.regForm.controls.isManager.setValue(recruiter.isManager);
        this.regForm.controls.isAdministrator.setValue(recruiter.isAdministrator);
        this.regForm.controls.email.setValue(recruiter.Email);

        this.recruiterDialog = true;
    }

    onDelete(recruiter: any) {
        console.log(recruiter);
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
        recruiterFormModel.AgencyId = 0,
            recruiterFormModel.RecruiterRole = recruiterRole;


        this.recruiterService.addRecruiter(recruiterFormModel).subscribe(res => {
            console.log(res);
            this.getRecruiters();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Recruiter add successfully', life: 3000 });
        },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Recruiter Add Faild', life: 3000 });
            },
            () => { })
        this.recruiters = [...this.recruiters];
        this.recruiterDialog = false;
        this.recruiterArr = {};

    }
    onRecruiterSubmit() {

    }
    hideDialog() {
        this.recruiterDialog = false;
        this.submitted = false;
    }

    changeStatus(id: any, value: boolean) {
        let updateAgency = {
            agencyId: id,
            isActive: !value
        }
        //this.agencyService.updateAgencyStatus(id, updateAgency)
        //    .subscribe(res => {
        //        console.log(res);
        //        if ((res.body as any).success) {
        //            this.getAllAgency();
        //            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Updated', life: 3000 });
        //        }
        //        else {
        //            this.messageService.add({ severity: 'error', summary: 'Error', detail: (res.body as any).errors[0], life: 3000 });
        //        }
        //    },
        //        err => { },
        //        () => { });
        //console.log(id, value);
    }

    openNewRecruiter() {
        this.addEditTxt = "Add";
        this.recruiterArr = {};
        this.submitted = false;
        this.recruiterDialog = true;
    }
}