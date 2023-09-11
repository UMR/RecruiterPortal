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
    public isLoading: boolean = false;
    public positionResults: string[];
    public institutionResults: any[];
    public jobs: any[] = [];
    public totalJobs: number;
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
        this.jobService.getJobsByAgencyId(this.take, this.skip)
            .subscribe(response => {
                if (response.status === 200) {
                    this.jobs = response.body.jobs;
                    this.totalJobs = response.body.totalJobs;
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

    getJobsById() {
        this.isLoading = true;
        this.jobService.getJobById(this.selectedJobId)
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
            position: job.Position,
            positionId: job.PositionId,
            institution: job.Institution,
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
        this.addEditTitle = "Add";
        this.submitted = false;
        this.jobDialog = true;
    }

    onEdit(job) {
        this.selectedJobId = job.JobId;
        this.getJobsById();
        this.jobDialog = true;
        console.log(this.selectedJob);
    }

    save() {
        const model = {

        }
    }

    onDelete(job) {
    }

    hideDialog() {
        this.jobDialog = false;
        this.submitted = false;
    }
}
