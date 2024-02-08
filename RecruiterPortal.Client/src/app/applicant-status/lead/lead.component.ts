import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LeadService } from './lead.service';
import { StatusEnum } from '../status/status.enum';

@Component({
    selector: 'app-lead',
    templateUrl: './lead.component.html',
    styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
    public isLoading: boolean = false;
    public leads: any[] = [];
    public totalRecords: number = 0;
    public Id: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedApplicant: any;
    public showDialog: boolean = false;

    constructor(private leadService: LeadService) { }

    ngOnInit() {
        this.getApplicantStatus();
    }

    onLazyLoad(event: LazyLoadEvent) {

    }

    getApplicantStatus() {
        this.leadService.getApplicantStatus(StatusEnum.NewLeads).subscribe(response => {
            if (response.status === 200) {
                this.leads = response.body;
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
