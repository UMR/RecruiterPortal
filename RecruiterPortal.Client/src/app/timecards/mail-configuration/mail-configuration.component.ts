import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { MailConfigurationService } from './mail-configuration.service';
import { DOCUMENT } from '@angular/common';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-mail-configuration',
    templateUrl: './mail-configuration.component.html',
    styleUrls: ['./mail-configuration.component.css']
})
export class MailConfigurationComponent implements OnInit {
    public isLoading: boolean = false;
    public mailconfigs: any[] = [];
    public totalMailConfigs: number;
    public cols: any[];
    public rows: number = 10;

    public showAddEdit: boolean = false;
    public addEditTitle: string;
    public addEditButtonTitle: string;
    public formGroup: FormGroup;
    public selectedMailConfigId: number;
    public selectedMailConfig: any;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    private code: string;
    private email: string;
    private profileName: string;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private messageService: MessageService,
        private confirmationService: ConfirmationService, private mailConfigService: MailConfigurationService, @Inject(DOCUMENT) private document: Document) {
        this.addEditTitle = "Add";
        this.addEditButtonTitle = "Save";
        this.selectedMailConfigId = 0;
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {   
                if (params.error) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Google authentication problem', life: 3000 });
                }
                if (params.code) {
                    this.code = params.code;
                    let state = params.state.split("|");                    
                    this.profileName = state[0];
                    this.email = state[1];
                    this.selectedMailConfigId = state[2];
                    const model: any = {
                        id: this.selectedMailConfigId,
                        profileName: this.profileName,
                        emailAddress: this.email,
                        code: this.code
                    };
                    this.mailConfigService.saveToken(model).subscribe(res => {
                        if (res.status == 200) {
                            if (this.selectedMailConfigId && this.selectedMailConfigId > 0) {
                                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail configuration updated successfully', life: 3000 });
                            } else {
                                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail configuration saved successfully', life: 3000 });
                            }
                        }
                    });
                }
            });
        this.createFormGroup();
        this.getMailConfigsByAgencyId();
    }

    noWhitespaceValidator(control: AbstractControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            profileName: ['', Validators.compose([Validators.required, Validators.maxLength(200), this.noWhitespaceValidator])],
            emailAddress: ['', Validators.compose([Validators.required, Validators.maxLength(200), Validators.pattern(this.emailRegEx), this.noWhitespaceValidator])]
        });
    }

    getMailConfigsByAgencyId() {
        this.isLoading = true;
        this.mailConfigService.getMailConfigsByRecruiterId()
            .subscribe(response => {
                if (response.status === 200) {
                    this.mailconfigs = response.body;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get mail file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    setDefaultFields(isLoading: boolean, showDialog: boolean, selectedId: number, selectedMailConfig: any, addEditTitle: string, addEditButtonTitle: string) {
        this.isLoading = isLoading;
        this.showAddEdit = showDialog;
        this.selectedMailConfigId = selectedId;
        this.selectedMailConfig = selectedMailConfig;
        this.addEditTitle = addEditTitle;
        this.addEditButtonTitle = addEditButtonTitle;
        this.formGroup.reset();
    }
    
    fillupMailConfig(mailConfig: any) {
        this.formGroup.patchValue({
            profileName: mailConfig.ProfileName,
            emailAddress: mailConfig.EmailAddress,
        });
    }

    onNew() {
        this.setDefaultFields(false, true, 0, null, "Add", "Save");
    }

    onEdit(mailconfig) {
        this.setDefaultFields(false, true, mailconfig.Id, mailconfig, "Edit", "Update");
        this.fillupMailConfig(mailconfig);
    }

    onClear() {
        this.formGroup.reset();
    }

    onHide() {
        this.showAddEdit = false;
    }

    onEmail(mailConfig) {
        this.isLoading = true;
        this.mailConfigService.getGmailService(mailConfig.EmailAddress)
            .subscribe(response => {
                console.log(response);
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get mail file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onSave() {
        const model: any = {
            id: this.selectedMailConfigId,
            profileName: this.formGroup.controls.profileName.value,
            emailAddress: this.formGroup.controls.emailAddress.value
        };
        this.isLoading = true;
        this.mailConfigService.getAuthorizationUrl(model).subscribe(res => {
            this.document.location.href = res.body
        }, error => {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to redirect google site', detail: '' });
        });
    }

    onDelete(mailConfig) {        
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${mailConfig.EmailAddress} email address?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.isLoading = true;
                this.mailConfigService.deleteMailConfig(mailConfig.Id).subscribe(res => {
                    if (res.status === 200) {
                        this.setDefaultFields(false, false, 0, null, "Add", "Save");
                        this.getMailConfigsByAgencyId();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail Configuration deleted successfully', life: 3000 });
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', detail: 'Failed to delete mail configuration', life: 3000 });
                    }
                );
            }
        });
    }
}
