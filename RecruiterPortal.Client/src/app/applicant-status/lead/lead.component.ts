import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

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

    constructor() { }

    ngOnInit() {

    }
    onLazyLoad(event: LazyLoadEvent) {
        
    }
    onAgencySubmit() {
        this.saveAgency();
    }
    saveAgency() {

    }
    openNewAgency() {
    }
}
