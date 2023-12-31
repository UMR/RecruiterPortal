import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { AgencyService } from './agency.service';
import { AgencyModel } from './agency.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-agency',
    templateUrl: './agency.component.html',
    styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
    public isLoading: boolean = true;
    public agencies: any[] = [];
    public totalAgency: number;
    public count = "";
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
    public agencyForm: FormGroup;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    private agencyId: number = 0;

    constructor(private agencyService: AgencyService, private messageService: MessageService, private fb: FormBuilder,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.agencyForm = this.fb.group({
            agencyName: ["", Validators.required],
            urlPrefix: ["", Validators.required],
            agencyEmail: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
            agencyPhone: [Validators.required],
            agencyAddress: [""],
            agencyContactPerson: [""],
            contactPersonPhone: [""],
            isActive: [false],
        });

    }
    loadAgencyLazy(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getAgencies();
    }

    checkDuplicateUrl() {
        if (this.agencyForm.controls.urlPrefix.value) {
            this.agencyService.isUrlExist(this.agencyForm.controls.urlPrefix.value.trim())
                .subscribe(respone => {
                    if (respone.body === false) {
                        this.agencyForm.controls.urlPrefix.setErrors({ 'invalid': true });;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Url is already exist' });
                    }
                },
                    err => {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to check duplicate url' });
                    },
                    () => {
                        this.isLoading = false;
                    });
        }
    }

    getAgencies() {
        this.agencyService.getAgency()
            .subscribe(response => {
                if (response.status == 200) {
                    
                    this.agencies = (response.body as any).agencies;
                    this.totalAgency = (response.body as any).agencyCount;
                    this.count = (response.body as any).agencyCount;
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

    onEdit(agency: any) {
        this.addEditTxt = "Edit";
        this.agencyDialog = true;
        this.agencyForm.controls.agencyName.setValue(agency.AgencyName);
        this.agencyForm.controls.urlPrefix.setValue(agency.UrlPrefix);
        this.agencyForm.controls.agencyEmail.setValue(agency.AgencyEmail);
        this.agencyForm.controls.agencyPhone.setValue(agency.AgencyPhone);
        this.agencyForm.controls.agencyAddress.setValue(agency.AgencyAddress);
        this.agencyForm.controls.agencyContactPerson.setValue(agency.AgencyContactPerson);
        this.agencyForm.controls.contactPersonPhone.setValue(agency.AgencyContactPersonPhone);
        this.agencyForm.controls.isActive.setValue(agency.IsActive);
        this.agencyForm.controls['urlPrefix'].disable();
        this.agencyId = agency.AgencyId;

    }

    onDelete(agency: AgencyModel) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + agency.AgencyName + ' agency ?',
            header: 'Confirm',
            icon: 'pi pi-trash',
            accept: () => {
                this.agencyService.delete(agency.AgencyId).subscribe(res => {
                    if (res && res.status == 200) {
                        this.getAgencies();
                        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successful', detail: 'Agency Deleted' });
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: "Agency can't delete. is used another process." });
                    }
                }, err => {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: "Agency can't delete. is used another process." });
                })

            }
        });
    }
    onAgencySubmit() {

        this.saveAgency();
    }
    saveAgency() {
        this.submitted = true;
        const agencyModel = new AgencyModel();
        agencyModel.AgencyName = this.agencyForm.get('agencyName').value;
        agencyModel.URLPrefix = this.agencyForm.get('urlPrefix').value;
        agencyModel.AgencyEmail = this.agencyForm.get('agencyEmail').value;
        agencyModel.AgencyPhone = this.agencyForm.get('agencyPhone').value;
        agencyModel.AgencyAddress = this.agencyForm.get('agencyAddress').value;
        agencyModel.AgencyContactPerson = this.agencyForm.get('agencyContactPerson').value;
        agencyModel.AgencyContactPersonPhone = this.agencyForm.get('contactPersonPhone').value;
        agencyModel.IsActive = this.agencyForm.get('isActive').value;;
        agencyModel.AgencyId = this.agencyId;


        this.isLoading = true;
        if (this.agencyId != 0) {
            this.agencyService.updateAgency(agencyModel).subscribe(res => {
                this.getAgencies();
                this.isLoading = false;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Updated', life: 3000 });
            },
                error => {
                    this.isLoading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Agency Updated Faild', life: 3000 });
                },
                () => {
                    this.isLoading = false;
                })
            this.agencyId = 0;

        } else {

            this.agencyService.addAgency(agencyModel).subscribe(res => {
                this.getAgencies();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agency Created', life: 3000 });
            },
                err => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Agency Created Faild', life: 3000 });
                },
                () => { })
        }
        this.agencyDialog = false;
    }

    hideDialog() {
        this.agencyDialog = false;
        this.submitted = false;
    }
    onClickClear() {
        this.agencyId = 0;
        this.agencyForm.reset();
    }

    changeStatus(id: any, value: boolean) {
        let updateAgency = {
            agencyId: id,
            isActive: !value
        }
    }

    openNewAgency() {
        this.agencyForm.reset();
        this.addEditTxt = "Add";
        this.agencyForm.controls['urlPrefix'].enable();
        this.agency = {};
        this.submitted = false;
        this.agencyDialog = true;
    }
}
