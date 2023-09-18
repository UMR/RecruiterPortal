import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { JobService } from './job-orders.service';
import { Table } from 'primeng/components/table/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-job-orders',
    templateUrl: './job-orders.component.html',
    styleUrls: ['./job-orders.component.css']
})
export class JobOrdersComponent implements OnInit {
    @ViewChild('jobTable', { static: false }) applicantTable: Table;
    public isLoading: boolean = true;
    public positionResults: string[];
    public institutionResults: any[];
    public jobs: any[] = [];
    public totalJobs: number = 0;
    public selectedJobId: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedJob: any;
    public submitted: boolean = false;
    public jobDialog: boolean = false;
    public addEditTitle: string;
    public jobFormGroup: FormGroup;
    public status: string = "";

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private jobService: JobService) {
        this.addEditTitle = "Add";
    }

    ngOnInit() {
        this.createJobFormGroup();
    }

    loadJobLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getJobsByAgencyId();
    }

    createJobFormGroup() {
        this.jobFormGroup = this.fb.group({
            jobTitile: ['', Validators.compose([Validators.maxLength(500)])],
            status: ['1', Validators.compose([Validators.required])],
            position: ['', Validators.compose([Validators.required])],
            positionId: [''],
            institution: ['', Validators.compose([Validators.required])],
            instituteId: [''],
            jobDescription: ['', Validators.compose([Validators.required])]
        });
    }
    get f() { return this.jobFormGroup.controls; }

    getJobsByAgencyId() {
        this.isLoading = true;
        this.jobService.getJobsByAgencyId(this.skip, this.take, this.status)
            .subscribe(response => {                
                if (response.status === 200) {
                    this.jobs = response.body.Records;
                    this.totalJobs = response.body.TotalRecords;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get jobs', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onStatusChange(status) {        
        if (status) {
            this.status = status == "1" ? "true" : "false";
        } else {
            this.status = "";
        }
        this.getJobsByAgencyId();
    }

    getJobsById(selectedJobId) {
        this.isLoading = true;
        this.jobService.getJobById(selectedJobId)
            .subscribe(response => {
                if (response.status === 200) {
                    this.selectedJob = response.body;
                    this.fillupJob(this.selectedJob);
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get job', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    fillupJob(job: any) {
        this.jobFormGroup.patchValue({
            jobTitile: job.JobTitle,
            status: job.Status === true ? '1' : '0',
            position: job.Position,
            positionId: job.PositionId,
            institution: job.Institute,
            instituteId: job.InstituteId,
            jobDescription: job.JobDescription
        });
    }

    onPositionSearch($event) {
        this.jobService.getPositionByPositionName($event.query).subscribe(response => {
            this.positionResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }

    onPositionSelect($event) {
        this.jobFormGroup.patchValue({
            position: $event.PositionName,
            positionId: $event.Id
        });
    }

    onInstitutiionSearch($event) {
        this.jobService.getInsituteByInsituteName($event.query).subscribe(response => {
            if (response.status === 200) {
                this.institutionResults = response.body;
            }
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get institutes', detail: '' }); },
            () => { });
    }

    onInstitutiionSelect($event) {
        this.jobFormGroup.patchValue({
            instituteId: $event.Id,
            institution: $event.InstituteName
        });
    }

    openNewJob() {
        this.selectedJobId = 0;
        this.selectedJob = null;
        this.addEditTitle = "Add";
        this.jobDialog = true;
        this.setDefaultFields();
    }

    onEdit(job) {
        this.selectedJobId = job.JobId;
        this.getJobsById(this.selectedJobId);
        this.jobDialog = true;
    }

    save() {
        const jobModel = {
            JobId: this.selectedJobId,
            Status: this.jobFormGroup.controls.status.value == '1' ? true : false,
            JobTitle: this.jobFormGroup.controls.jobTitile.value,
            JobDescription: this.jobFormGroup.controls.jobDescription.value,
            PositionId: this.jobFormGroup.controls.positionId.value,
            InstituteId: this.jobFormGroup.controls.instituteId.value,
        }
        if (this.jobFormGroup.valid) {
            this.jobService.save(jobModel).subscribe(res => {
                if (res.status === 200) {
                    this.setDefaultFields();                    
                    this.getJobsByAgencyId();                    
                    this.selectedJobId = null;
                    this.jobDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Saved', life: 3000 });
                }
            },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Job Save Failed', life: 3000 });
                });
        }
    }

    setDefaultFields() {
        this.jobFormGroup.reset();
        this.jobFormGroup.controls.status.setValue('');
    }

    onDelete(job) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${job.JobTitle} job?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.jobService.delete(job.JobId).subscribe(res => {
                    if (res.status === 200) {
                        this.getJobsByAgencyId();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Deleted', life: 3000 });
                    }
                },
                    err => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Job Delete Failed', life: 3000 });
                    }
                );
            }
        });
    }

    clear() {
        this.setDefaultFields();
    }

    hide() {
        this.jobDialog = false;
    }
}
