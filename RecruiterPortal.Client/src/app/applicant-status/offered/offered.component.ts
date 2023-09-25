import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../status/status.enum';
import { LazyLoadEvent } from 'primeng/api';
import { OfferedService } from './offered.service';

@Component({
  selector: 'app-offered',
  templateUrl: './offered.component.html',
  styleUrls: ['./offered.component.css']
})
export class OfferedComponent implements OnInit {
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

    constructor(private offeredService: OfferedService) { }

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
        this.offeredService.getApplicantStatus(StatusEnum.Offered).subscribe(response => {
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
}
