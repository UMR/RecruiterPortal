import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { StatusEnum } from '../status/status.enum';
import { AcceptedService } from './accepted.service';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.css']
})
export class AcceptedComponent implements OnInit {
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

    constructor(private acceptedService: AcceptedService) { }

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
        this.acceptedService.getApplicantStatus(StatusEnum.Accepted).subscribe(response => {
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
