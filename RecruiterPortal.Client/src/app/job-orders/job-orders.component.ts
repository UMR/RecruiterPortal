import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { JobService } from './job-orders.service';
import { Table } from 'primeng/components/table/table';

@Component({
    selector: 'app-job-orders',
    templateUrl: './job-orders.component.html',
    styleUrls: ['./job-orders.component.css']
})
export class JobOrdersComponent implements OnInit {
    @ViewChild('jobTable', { static: false }) applicantTable: Table;
    public isLoading: boolean = false;
    public jobs: any[] = [];
    public totalJobs: number;
    public selectedJobId: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedJob: any;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private jobService: JobService) { }

    ngOnInit() {
    }

    loadJobLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getJobs();
    }

    getJobs() {
        this.isLoading = true;
        this.jobService.getJobs(this.take, this.skip)
            .subscribe(response => {
                console.log(response);
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

    onEdit(job) {

    }

    onDelete(job) {
    }
}
