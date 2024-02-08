import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../status/status.enum';
import { LazyLoadEvent } from 'primeng/api';
import { RejectedService } from './rejected.service';

@Component({
    selector: 'app-rejected',
    templateUrl: './rejected.component.html',
    styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {
    public isLoading: boolean = true;
    public applicants: any[] = [];
    public totalRecords: number = 0;
    public selectedApplicantId: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedApplicant: any;
    public showDialog: boolean = false;

    constructor(private rejectedService: RejectedService) { }

    ngOnInit() {
    }
    loadApplicantLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        //this.getJobsByAgencyId(this.skip, this.take);
        this.getApplicantStatus();
    }

    getApplicantStatus() {
        this.rejectedService.getApplicantStatus(StatusEnum.Rejected).subscribe(response => {
            if (response.status === 200) {
                this.applicants = response.body;
                this.totalRecords = response.body.length;
            }
        },
            err => {

            },
            () => { });
    }

    onSendToClick(applicant) {
        this.selectedApplicant = applicant.ApplicantId;
        this.showDialog = true;
    }

    handleHideEvent(show) {
        this.selectedApplicant = 0;
        this.showDialog = show;
    }
}
