import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../status/status.enum';
import { LazyLoadEvent } from 'primeng/api';
import { PhoneScreenedService } from './phone-screened.service';

@Component({
    selector: 'app-phone-screened',
    templateUrl: './phone-screened.component.html',
    styleUrls: ['./phone-screened.component.css']
})
export class PhoneScreenedComponent implements OnInit {
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

    constructor(private phoneScreenedService: PhoneScreenedService) { }

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
        this.phoneScreenedService.getApplicantStatus(StatusEnum.PhoneScreened).subscribe(response => {
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
