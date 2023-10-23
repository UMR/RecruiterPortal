import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { StatusEnum } from '../status/status.enum';
import { FinalInterviewService } from './final-interview.service';

@Component({
    selector: 'app-final-interview',
    templateUrl: './final-interview.component.html',
    styleUrls: ['./final-interview.component.css']
})
export class FinalInterviewComponent implements OnInit {
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

    constructor(private finalInterviewService: FinalInterviewService) { }

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
        this.finalInterviewService.getApplicantStatus(StatusEnum.FinalInterview).subscribe(response => {
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
        this.showDialog = show;
    }
}
