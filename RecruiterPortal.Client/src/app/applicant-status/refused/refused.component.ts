import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { StatusEnum } from '../status/status.enum';
import { RefusedService } from './refused.service';

@Component({
  selector: 'app-refused',
  templateUrl: './refused.component.html',
  styleUrls: ['./refused.component.css']
})
export class RefusedComponent implements OnInit {
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

    constructor(private refusedService: RefusedService) { }

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
        this.refusedService.getApplicantStatus(StatusEnum.Refused).subscribe(response => {
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
