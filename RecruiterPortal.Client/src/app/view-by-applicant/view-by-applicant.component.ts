import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { StorageService } from '../common/services/storage.service';
import { ViewByApplicantService } from './view-by-applicant.service';


@Component({
    selector: 'app-view-by-applicant',
    templateUrl: './view-by-applicant.component.html',
    styleUrls: ['./view-by-applicant.component.css']
})
export class ViewByApplicantComponent implements OnInit {

    public isLoading: boolean = false;
    public isSubmitted: boolean = false;
    public viewByApplicantFormGroup: FormGroup;
    public applicanFullnameResults: string[];
    public applicantEmailResults: string[];
    public applicants: any[] = [];
    public totalApplicants: number;
    public selectedApplicantId: number;
    public selectedApplicantStatus: string = "1";
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private takeDefaultValue: number = 15;
    private skipDefaultValue: number = 0;
    private pageNumber: number;
    public selectedApplicant: any;
    public showDialog: boolean = false;
    @ViewChild('applicantTable', { static: false }) applicantTable: Table;

    constructor(private fb: FormBuilder,
        private viewByApplicantService: ViewByApplicantService,
        private messageService: MessageService,
        private router: Router, private storageService: StorageService) {
        this.createViewByApplicantFormGroup();
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.cols = [
            { field: 'LastName', header: 'Applicant Last Name' },
            { field: 'FirstName', header: 'Applicant First Name' },
            { field: 'Email', header: 'Applicant Email' },
            { field: this.getApplicantStatus(20167), header: 'Applicant Status' }
        ];
        this.selectedApplicantStatus = "1";
    }

    createViewByApplicantFormGroup() {
        this.viewByApplicantFormGroup = this.fb.group({
            applicantFirstName: [''],
            applicantLastName: [''],
            applicantEmail: [''],
            applicantStatus: this.selectedApplicantStatus
        });
    }

    onApplicantFullnameSearch($event) {
        this.viewByApplicantService.getApplicantFullName($event.query).subscribe(response => {
            if (response.status === 200) {
                this.applicanFullnameResults = response.body;
            }
            else {
                this.applicanFullnameResults = [];
            }
        },
            err => {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant fullname', detail: '' });
            },
            () => { });
    }
    onApplicantFirstNameSearch($event) {
        this.viewByApplicantService.getApplicantFirstName($event.query).subscribe(response => {
            if (response.status === 200) {
                this.applicanFullnameResults = response.body;
            }
            else {
                this.applicanFullnameResults = [];
            }
        },
            err => {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant fullname', detail: '' });
            },
            () => { });
    }
    onApplicantLasrNameSearch($event) {
        this.viewByApplicantService.getApplicantLasrName($event.query).subscribe(response => {
            if (response.status === 200) {
                this.applicanFullnameResults = response.body;
            }
            else {
                this.applicanFullnameResults = [];
            }
        },
            err => {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant fullname', detail: '' });
            },
            () => { });
    }

    onApplicantEmailSearch($event) {
        this.viewByApplicantService.getApplicantEmail($event.query).subscribe(response => {
            if (response.status === 200) {
                this.applicantEmailResults = response.body;
            }
            else {
                this.applicantEmailResults = [];
            }
        },
            err => {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant email', detail: '' });
            },
            () => { });
    }

    onApplicantStatusChange(event) {
        this.applicantTable.reset();
        this.selectedApplicantStatus = event.target.value;
        this.getApplicants();
    }

    getApplicants() {
        this.isLoading = true;
        this.isSubmitted = true;

        const applicantFirstName = this.viewByApplicantFormGroup.controls.applicantFirstName.value ? this.viewByApplicantFormGroup.controls.applicantFirstName.value : '';
        const applicantLastName = this.viewByApplicantFormGroup.controls.applicantLastName.value ? this.viewByApplicantFormGroup.controls.applicantLastName.value : '';
        const applicantEmail = this.viewByApplicantFormGroup.controls.applicantEmail.value ? this.viewByApplicantFormGroup.controls.applicantEmail.value : '';
        //const applicantStatus = this.viewByApplicantFormGroup.controls.applicantStatus.value ? this.viewByApplicantFormGroup.controls.applicantStatus.value : '';

        const model = {
            firstName: applicantFirstName,
            lastName: applicantLastName,
            email: applicantEmail,
            CurrentUserId: 1,
            isVerified: this.selectedApplicantStatus == "1" ? true : false,
            take: this.take,
            skip: this.skip,
        }

        this.viewByApplicantService.getViewByApplicantSearch(model)
            .subscribe(response => {
                if (response.status === 200) {
                    this.applicants = (response.body as any).applicants;
                    this.totalApplicants = (response.body as any).totalApplicants;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    loadApplicantsLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getApplicants();
    }

    onSubmit() {
        this.take = this.takeDefaultValue;
        this.skip = this.skipDefaultValue;
        this.getApplicants();
    }

    onEdit(applicantId) {
        this.storageService.setApplicantId(applicantId);
        this.router.navigate(["personal-info"]);
    }

    onImportSync(applicantPortalUserId) {
        this.isLoading = true;
        this.viewByApplicantService.getImportSyncApplicant(applicantPortalUserId)
            .subscribe(response => {
                if (response.status === 200) {
                    this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Applicant import or sync successful', detail: '' });
                    this.applicantTable.reset();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to import or sync applicant info', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    getApplicantStatus(applicantId) {
        this.viewByApplicantService.getApplicantActiveStatus(applicantId)
            .subscribe(response => {
                console.log(response);
                if (response.status === 200) {
                }
            },
                err => {
                },
                () => {
                    this.isLoading = false;
                });
    }

    onSendToClick(applicant) {
        this.selectedApplicant = applicant.UserId;
        this.showDialog = true;
    }

    handleHideEvent(show) {
        this.showDialog = show;
    }

    onClear() {
        this.viewByApplicantFormGroup.reset();
        this.viewByApplicantFormGroup.controls.applicantStatus.setValue(this.selectedApplicantStatus);
        this.selectedApplicantStatus = this.selectedApplicantStatus;
        this.applicantTable.reset();
        this.getApplicants();
    }

}
