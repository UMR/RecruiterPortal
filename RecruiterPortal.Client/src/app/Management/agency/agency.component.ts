import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { AgencyService } from './agency.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
    public isLoading: boolean = false;
    public agencies: any[] = [];
    public totalAgency: number;
    public selectedAgencyId: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedAgency: any;

    constructor(private agencyService: AgencyService, private messageService: MessageService) { }

  ngOnInit() {
  }
    loadAgencyLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getAgencies();
    }
    getAgencies() {
        this.isLoading = true;
        this.agencyService.getAgency()
            .subscribe(response => {
                console.log(response);
                if (response.status === 200) {
                    this.agencies = (response.body as any).agencies;
                    this.totalAgency = (response.body as any).totalAgency;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get agency', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }
}
