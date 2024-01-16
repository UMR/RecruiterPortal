import { Component, OnInit, ViewChild } from '@angular/core';
import { RecruiterService } from './recruiter.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { AgencyModel } from '../agency/agency.model';
import { RecruiterModel } from './recruiter.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecruiterSearchModel } from './recruiter-search.model';
import { Table } from 'primeng/components/table/table';
import { StorageService } from '../../common/services/storage.service';
import { el } from '@fullcalendar/core/internal-common';

@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

    public isLoading: boolean = false;
    public recruiters: any[] = [];
    public totalRecruiter: number;
    public count: string = "";
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
    public searchFg: FormGroup;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    public isEditMode: boolean = false;
    public activeAgency: any = [];
    @ViewChild('recruiterTable', { static: false }) recruiterTable: Table;
    public isAdmin: boolean = false;



    constructor(private recruiterService: RecruiterService, private messageService: MessageService, private fb: FormBuilder,
        private confirmationService: ConfirmationService, private storageService: StorageService) {
    }

    ngOnInit() {
        this.regForm = this.fb.group({
            loginId: ["", Validators.required],
            telephone: [""],
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            isActive: [false],
            isRecruiter: [false],
            isSupervisor: [false],
            isManager: [false],
            isAdministrator: [false],
            email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
            password: ["", [Validators.required, Validators.minLength(4)]],
            agencyId: ["", Validators.required],
            confirmPassword: ["", Validators.required],
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });

        this.searchFg = this.fb.group({
            sFirstName: [""],
            sLastName: [""],
            sEmail: [""],
            status: [""]
        });
        this.onAgencySearch();
        this.agencyDropDownManage();
        //this.getActiveAgency();
    }

    agencyDropDownManage() {
        this.isAdmin = this.storageService.getIsAdmin;
        var user = this.storageService.getDataFromSession("CurrentUserInfo");
        this.regForm.controls.agencyId.setValue(user.AgencyId);
        if (this.isAdmin) {
            this.regForm.controls['agencyId'].enable();
        }
        else {
            this.regForm.controls['agencyId'].disable();
        }
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

    onAgencySearch() {
        this.recruiterService.getActiveAgency().subscribe(response => {
            this.activeAgency = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get agency', detail: '' }); },
            () => { });
    }
    get f() { return this.regForm.controls; }

    loadAgencyLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        //this.getRecruiters();
        this.getRecruiterByFilter();
    }

    //getRecruiters() {
    //    this.isLoading = true;
    //    this.recruiterService.getRecruiter()
    //        .subscribe(response => {
    //            if (response.status === 200) {
    //                this.recruiters = (response.body as any).recruiters;
    //                this.totalRecruiter = (response.body as any).count;
    //            }
    //        },
    //            err => {
    //                this.isLoading = false;
    //                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get recruiter', detail: '' });
    //            },
    //            () => {
    //                this.isLoading = false;
    //            });
    //}

    getRecruiterByFilter() {
        const recruiterSearchModel = new RecruiterSearchModel();
        recruiterSearchModel.FirstName = this.searchFg.get('sFirstName').value;
        recruiterSearchModel.LastName = this.searchFg.get('sLastName').value;
        recruiterSearchModel.Email = this.searchFg.get('sEmail').value;
        recruiterSearchModel.Status = this.searchFg.get('status').value;


        this.recruiterService.getRecruiterByFilter(recruiterSearchModel)
            .subscribe(response => {
                if (response.status === 200) {
                    this.recruiters = (response.body as any).recruiters;
                    this.totalRecruiter = (response.body as any).count;
                    this.count = (response.body as any).count;
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
    

    onStatusChange(evt) {
        this.recruiterTable.reset();
        this.getRecruiterByFilter();
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
        this.regForm.controls.agencyId.setValue(recruiter.AgencyId);
        this.regForm.controls['agencyId'].disable();
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

    onSearchClick() {
        this.getRecruiterByFilter();
    }
    onClear() {
        this.searchFg.reset();
        this.searchFg.controls.status.setValue("");
        this.recruiterTable.reset();
        this.getRecruiterByFilter();
    }

    onDelete(recruiter: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to change ' + recruiter.FirstName + ' ' + recruiter.LastName + ' status?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.recruiterService.updateRecruiterStatus(recruiter.RecruiterId, false).subscribe(res => {
                    this.getRecruiterByFilter();
                    if (res && res.status == 200) {
                        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successful', detail: 'Recruiter status updated successfully', life: 3000 });
                    }
                }, err => { })

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
        recruiterFormModel.AgencyId = this.regForm.get('agencyId').value;
        recruiterFormModel.RecruiterRole = recruiterRole;

        //console.log(recruiterFormModel);

        if (!this.isEditMode) {
            this.recruiterService.addRecruiter(recruiterFormModel).subscribe(res => {
                this.getRecruiterByFilter();
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
                this.getRecruiterByFilter();
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
        this.agencyDropDownManage();
        this.isEditMode = false;
        this.addEditTxt = "Add";
        this.recruiterArr = {};
        this.submitted = false;
        this.recruiterDialog = true;
    }
}