import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { FormListService } from '../../reports-list/form-list/form-list.service';

@Component({
  selector: 'app-mail-configuration',
  templateUrl: './mail-configuration.component.html',
  styleUrls: ['./mail-configuration.component.css']
})
export class MailConfigurationComponent implements OnInit {
    public isLoading: boolean = true;
    public mailconfigs: any[] = [];
    public totalMailConfigs: number;    
    public cols: any[];
    public rows: number = 10;
    private pageNumber: number;
    private pageSize: number;

    public showDialog: boolean = false;
    public addEditTitle: string;
    public addEditButtonTitle: string;
    public formGroup: FormGroup;    
    public selectedMailConfigId: number;
    public selectedMailConfig: any;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private formService: FormListService) {
        this.addEditTitle = "Add";
        this.addEditButtonTitle = "Save";
        this.selectedMailConfigId = 0;
    }

    ngOnInit() {
        this.createFormGroup();
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            profileName: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
            emailAddress: ['', Validators.compose([Validators.required, Validators.maxLength(200), Validators.pattern(this.emailRegEx)])]
        });
    }

    onLazyLoadMailConfigs(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.pageSize = event.rows;
        this.getMailConfigsByAgencyId();
    }

    getMailConfigsByAgencyId() {
        this.isLoading = true;
        this.formService.getOfficialFilesByAgencyId(this.pageNumber, this.pageSize)
            .subscribe(response => {
                if (response.status === 200) {
                    this.mailconfigs = response.body.Records;
                    this.totalMailConfigs = response.body.TotalRecords;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get official file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    setDefaultFields(isLoading: boolean, showDialog: boolean, selectedId: number, selectedMailConfig: any, addEditTitle: string, addEditButtonTitle: string) {
        this.isLoading = isLoading;
        this.showDialog = showDialog;
        this.selectedMailConfigId = selectedId;
        this.selectedMailConfig = selectedMailConfig;        
        this.addEditTitle = addEditTitle;
        this.addEditButtonTitle = addEditButtonTitle;
        this.formGroup.reset();
    }

    getMailConfigById(id) {
        this.isLoading = true;
        this.formService.getOfficialFileById(id)
            .subscribe(response => {
                if (response.status === 200) {
                    this.selectedMailConfig = response.body;
                    this.fillupMailConfig(this.selectedMailConfig);
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get official file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    fillupMailConfig(officialForm: any) {
        this.formGroup.patchValue({
            title: officialForm.Title            
        });
    }   

    onNew() {
        this.setDefaultFields(false, true, 0, null, "Add", "Save");
    }

    onEdit(form) {
        this.setDefaultFields(false, true, form.Id, form, "Edit", "Update");
        this.fillupMailConfig(form);
    }

    onClear() {
        this.formGroup.reset();
    }

    onHide() {
        this.showDialog = false;
    }

    onSave() {
        const model: any = {
            id: this.selectedMailConfigId,
            profileName: this.formGroup.controls.profileName.value,
            emailAddress: this.formGroup.controls.emailAddress.value           
        };
        this.isLoading = true;
        if (this.selectedMailConfigId == 0) {
            this.formService.saveOfficialFile(model)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.setDefaultFields(false, false, 0, null, "Add", "Save");
                        this.getMailConfigsByAgencyId();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Official file saved successfully', life: 3000 });
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save official file', detail: '' });
                    });
        } else {
            this.formService.updateOfficialFile(model)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.setDefaultFields(false, false, 0, null, "Add", "Save");
                        this.getMailConfigsByAgencyId();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Official file updated successfully', life: 3000 });
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update official file', detail: '' });
                    });
        }
    }    

    onDelete(form) {
        this.isLoading = true;
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${form.FileName} official file?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.formService.deleteOfficialFile(form.Id).subscribe(res => {
                    if (res.status === 200) {
                        this.setDefaultFields(false, false, 0, null, "Add", "Save");
                        this.getMailConfigsByAgencyId();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Official file deleted successfully', life: 3000 });
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', detail: 'Failed to delete official file', life: 3000 });
                    }
                );
            }
        });
    }
}
