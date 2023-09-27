import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/components/table/table';
import { LazyLoadEvent } from 'primeng/api';
import { PaperScreenedService } from './paper-screened.service';
import { StatusEnum } from '../status/status.enum';

@Component({
    selector: 'app-paper-screened',
    templateUrl: './paper-screened.component.html',
    styleUrls: ['./paper-screened.component.css']
})
export class PaperScreenedComponent implements OnInit {

    @ViewChild('table', { static: false }) table: Table;
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

    constructor(private paperScreenedService: PaperScreenedService) {
        
    }

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
        this.paperScreenedService.getApplicantStatus(StatusEnum.PreScreened).subscribe(response => {
            if (response.status === 200) {
                this.applicants = response.body;
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
