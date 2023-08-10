import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { StorageService } from '../common/services/storage.service';
import { ViewByApplicantService } from './view-by-applicant.service';

export enum EnumApplicantStatus {
    New = 1,
    Existing = 2
}

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
    public selectedApplicantStatus: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedApplicant: any;
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
            { field: 'lastName', header: 'Applicant Last Name' },
            { field: 'firstName', header: 'Applicant First Name' },
            { field: 'email', header: 'Applicant Email' },
            { field: 'ApplicantMobilePhone', header: 'Applicant Mobile Phone' }
        ];
        this.selectedApplicantStatus = EnumApplicantStatus.Existing;
    }

    createViewByApplicantFormGroup() {
        this.viewByApplicantFormGroup = this.fb.group({
            applicantFirstName: [''],
            applicantLastName: [''],
            applicantEmail: [''],
            applicantStatus: [EnumApplicantStatus[EnumApplicantStatus.Existing]]
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
        this.getApplicants();
        //this.selectedApplicantStatus = (<any>EnumApplicantStatus)[event.target.value];    
    }

    getApplicants() {
        this.isLoading = true;
        this.isSubmitted = true;

        const applicantFirstName = this.viewByApplicantFormGroup.controls.applicantFirstName.value ? this.viewByApplicantFormGroup.controls.applicantFirstName.value : '';
        const applicantLastName = this.viewByApplicantFormGroup.controls.applicantLastName.value ? this.viewByApplicantFormGroup.controls.applicantLastName.value : '';
        const applicantEmail = this.viewByApplicantFormGroup.controls.applicantEmail.value ? this.viewByApplicantFormGroup.controls.applicantEmail.value : '';
        const applicantStatus = this.viewByApplicantFormGroup.controls.applicantStatus.value ? this.viewByApplicantFormGroup.controls.applicantStatus.value : '';
        this.selectedApplicantStatus = (<any>EnumApplicantStatus)[applicantStatus];

        const model = {
            firstName: applicantFirstName,
            lastName: applicantLastName,
            email: applicantEmail,
           /* recruiterId: "1",*/
            isVerified: true,
            take: this.take,
            skip: this.skip,
        }
        this.viewByApplicantService.getViewByApplicantSearch(model)
            .subscribe(response => {
                console.log(response);
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
        //console.log(this.pageNumber);
        //console.log(this.take);
        //console.log(this.skip);
        this.getApplicants();
    }

    onSubmit() {
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

    onClear() {
        this.viewByApplicantFormGroup.reset();
        this.viewByApplicantFormGroup.controls.applicantStatus.setValue(EnumApplicantStatus[EnumApplicantStatus.Existing]);
        this.selectedApplicantStatus = EnumApplicantStatus.Existing;
        this.applicantTable.reset();
        this.getApplicants();
    }

}
