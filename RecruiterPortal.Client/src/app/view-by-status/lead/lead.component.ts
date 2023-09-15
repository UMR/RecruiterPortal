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
    public selectedLead: any;
    submitted: boolean = false;
    isActive: any = [];
    addEditTxt: string = "Add";
    agency: any;
    agencyDialog: boolean = false;

    constructor() { }

    ngOnInit() {

    }

    onLazyLoad(event: LazyLoadEvent) {
        this.getAgencies();
    }
    getAgencies() {

    }

    onEdit(agency: any) {


    }

    onAgencySubmit() {

        this.saveAgency();
    }
    saveAgency() {

    }

    hideDialog() {
    }
    onClickClear() {
    }

    changeStatus(id: any, value: boolean) {
        let updateAgency = {
            agencyId: id,
            isActive: !value
        }

    }

    openNewAgency() {
    }
}
