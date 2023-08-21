import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { AgencyService } from './agency.service';
import { AgencyModel } from './agency.model';

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
    submitted: boolean = false;
    isActive: any = [];
    addEditTxt: string = "Add";
    agency: any;
    agencyDialog: boolean = false;

    constructor(private agencyService: AgencyService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
                    this.totalAgency = (response.body as any).agencyCount;
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

    onEdit(agency: AgencyModel) {
        this.addEditTxt = "Edit";
        this.agency = { ...agency };
        this.agencyDialog = true;
    }

    onDelete(agency: AgencyModel) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + agency.AgencyName + ' agency ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //this.agencyService.deleteAgency(agency.agencyId).subscribe(res => {
                //    console.log(res);
                //    if (res && res.body) {
                //        this.agencies = this.agencies.filter((val) => val.agencyId !== agency.agencyId);
                //        this.agency = {};
                //        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Deleted', life: 3000 });
                //    }
                //}, err => { })

            }
        });
    }
    saveAgency() {
        this.submitted = true;

        if (this.agency.agencyName.trim()) {
            if (this.agency.agencyId) {
                //this.agencys[this.findIndexById(this.agency.agencyId)] = this.agency;
                //this.agencyService.updateAgency(this.agency.agencyId, this.agency).subscribe(res => {
                //    console.log(res);
                //    this.getAgencies();
                //    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Updated', life: 3000 });
                //},
                //    error => {
                //        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Agency Updated Faild', life: 3000 });
                //    },
                //    () => { })

            } else {
                //this.agency.agencyId = this.createId();
                //this.agencyService.addAgency(this.agency).subscribe(res => {
                //    this.getAgencies();
                //    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Created', life: 3000 });
                //},
                //    err => {
                //        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Agency Created Faild', life: 3000 });
                //    },
                //    () => { })

            }

            this.agencies = [...this.agencies];
            this.agencyDialog = false;
            this.agency = {};
        }
    }

    hideDialog() {
        this.agencyDialog = false;
        this.submitted = false;
    }

    changeStatus(id: any, value: boolean) {
        let updateAgency = {
            agencyId: id,
            isActive: !value
        }
        //this.agencyService.updateAgencyStatus(id, updateAgency)
        //    .subscribe(res => {
        //        console.log(res);
        //        if ((res.body as any).success) {
        //            this.getAllAgency();
        //            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Updated', life: 3000 });
        //        }
        //        else {
        //            this.messageService.add({ severity: 'error', summary: 'Error', detail: (res.body as any).errors[0], life: 3000 });
        //        }
        //    },
        //        err => { },
        //        () => { });
        //console.log(id, value);
    }

    openNewAgency() {
        this.addEditTxt = "Add";
        this.agency = {};
        this.submitted = false;
        this.agencyDialog = true;
    }
}
