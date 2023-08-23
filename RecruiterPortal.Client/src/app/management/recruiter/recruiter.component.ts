import { Component, OnInit } from '@angular/core';
import { RecruiterService } from './recruiter.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { AgencyModel } from '../agency/agency.model';

@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

    public isLoading: boolean = false;
    public recruiters: any[] = [];
    public totalRecruiter: number;
    public selectedRecruiterId: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedRecruiter: any;
    public submitted: boolean = false;
    public addEditTxt: string = "Add";
    public recruiter: any;
    public recruiterDialog: boolean = false;

    public loginId: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public telephone: string = "";
    public isActive: boolean = true;
    

    constructor(private recruiterService: RecruiterService, private messageService: MessageService, private confirmationService: ConfirmationService) {
        this.getRecruiters();
    }

    ngOnInit() {

    }
    loadAgencyLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getRecruiters();
    }
    getRecruiters() {
        this.isLoading = true;
        this.recruiterService.getRecruiter()
            .subscribe(response => {
                console.log(response);
                if (response.status === 200) {
                    this.recruiters = (response.body as any).recruiters;
                    this.totalRecruiter = (response.body as any).count;
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
        this.recruiter = { ...agency };
        this.recruiterDialog = true;
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

        if (this.recruiter.agencyName.trim()) {
            if (this.recruiter.agencyId) {
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

            this.recruiters = [...this.recruiters];
            this.recruiterDialog = false;
            this.recruiter = {};
        }
    }

    hideDialog() {
        this.recruiterDialog = false;
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

    openNewRecruiter() {
        this.addEditTxt = "Add";
        this.recruiter = {};
        this.submitted = false;
        this.recruiterDialog = true;
    }
}