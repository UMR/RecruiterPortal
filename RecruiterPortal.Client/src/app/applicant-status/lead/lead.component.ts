import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LeadService } from './lead.service';

@Component({
    selector: 'app-lead',
    templateUrl: './lead.component.html',
    styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
    public isLoading: boolean = false;
    public leads: any[] = [];
    public totalApplicant: number;
    public Id: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;

    constructor(private leadService: LeadService) { }

    ngOnInit() {
        this.getApplicantStatus();
    }
    onLazyLoad(event: LazyLoadEvent) {

    }
    getApplicantStatus() {
        this.leadService.getApplicantStatus(0).subscribe(response => {
            console.log(response);
            if (response.status === 200) {
                
            }
        },
            err => {
                
            },
            () => { });
    }
}
