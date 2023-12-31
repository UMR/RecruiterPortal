import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MailTemplateService } from '../../../timecards/mail-template-type/mail-template-type.service';
import { MailSettingsService } from '../../../timecards/mail-settings/mail-settings.service';
import { MailService } from '../../services/mail.service';


@Component({
    selector: 'sent-mail',
    templateUrl: './sent-mail.component.html',
    styleUrls: ['./sent-mail.component.css']
})
export class SentMailComponent implements OnInit, OnChanges {

    @Input() selectedApplicant: any;
    @Output() hideEvent = new EventEmitter<boolean>();
    public formGroup: FormGroup;
    public recruiterMailConfigs: any[] = [];
    public mailTemplateTypes: any[] = [];
    private selectedFromMail: number;
    private selectedTemplateType: number;
    public emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    private selectedEmail: string;
    private toEmail: string[] = [];
    public uploadedFiles: File[] = [];

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService,
        private mailService: MailService, private mailTemplateTypeService: MailTemplateService, private mailSettingsService: MailSettingsService) {
        this.mailTemplateTypeService.mailTemplateTypes$.subscribe(data => { this.mailTemplateTypes = data; });
    }

    ngOnInit() {
        this.createFormGroup();
        this.getMailConfigurationByRecruiterId();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedApplicant && changes.selectedApplicant.currentValue) {
            this.selectedEmail = (changes.selectedApplicant.currentValue as any).Email;
            this.toEmail = [];
            this.toEmail.push(this.selectedEmail);
            this.formGroup.controls.mailAddressTo.patchValue(this.toEmail);
        }
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            fromMail: ['', Validators.compose([Validators.required])],
            mailTemplateType: [''],
            mailAddressTo: ['', Validators.compose([Validators.required])],
            mailAddressCc: [''],
            mailAddressBcc: [''],
            subject: ['', Validators.compose([Validators.max(200)])],
            body: ['']
        });
    }

    getMailConfigurationByRecruiterId() {
        this.mailSettingsService
            .getRecruiterMailConfigsByRecruiterId()
            .subscribe(res => {
                this.recruiterMailConfigs = res.body;
                if (this.recruiterMailConfigs && this.recruiterMailConfigs.length > 0) {
                    this.selectedFromMail = this.recruiterMailConfigs[0].Id;
                    this.formGroup.controls.fromMail.setValue(this.recruiterMailConfigs[0].Id);
                    this.getMailTemplateTypesByRecruiterId();
                }
            });
    }

    getMailTemplateTypesByRecruiterId() {
        this.mailTemplateTypeService
            .getMailTemplateTypesByRecruiterId()
            .subscribe(res => { this.mailTemplateTypes = res.body });
    }

    getMailTemplate() {
        if (this.selectedFromMail && this.selectedTemplateType) {
            this.mailSettingsService
                .getMailTemplate(this.selectedFromMail, this.selectedTemplateType)
                .subscribe(res => {
                    if (res.body) {
                        this.formGroup.controls.body.setValue(res.body.TemplateText);
                    } else {
                        this.formGroup.controls.body.setValue('');
                    }
                });
        }
    }

    onFromMailChange(event) {
        this.selectedFromMail = event.target.value;
        if (!this.selectedFromMail) {
            this.mailTemplateTypes = [];
            this.formGroup.controls.body.setValue('');
        }
        if (this.selectedFromMail) {
            this.getMailTemplateTypesByRecruiterId();
        }
    }

    onMailTemplateTypeChange(event) {
        this.selectedTemplateType = event.target.value;
        if (!this.selectedTemplateType) {
            this.formGroup.controls.body.setValue('');
        }
        else if (this.selectedTemplateType) {
            this.getMailTemplate();
        }
    }

    validateEmail(email) {
        return email.match(this.emailRegex);
    }

    onToTokenAdd(chip) {
        if (chip.value) {
            const result = this.validateEmail(chip.value);
            if (!result) {
                const toEmailAddress: string[] = this.formGroup.controls.mailAddressTo.value;
                if (toEmailAddress && toEmailAddress.length > 0) {
                    toEmailAddress.pop();
                    this.formGroup.controls.mailAddressTo.patchValue(toEmailAddress);
                }
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid to email address', detail: '' });
            }
        }
    }

    onCcTokenAdd(chip) {
        console.log(chip);
        if (chip.value) {
            const result = this.validateEmail(chip.value);
            if (!result) {
                const ccEmailAddress: string[] = this.formGroup.controls.mailAddressCc.value;
                if (ccEmailAddress && ccEmailAddress.length > 0) {
                    ccEmailAddress.pop();
                    this.formGroup.controls.mailAddressCc.patchValue(ccEmailAddress);
                }
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid cc email address', detail: '' });
            }
        }
    }

    onBccTokenAdd(chip) {
        if (chip.value) {
            const result = this.validateEmail(chip.value);
            if (!result) {
                const bccEmailAddress: string[] = this.formGroup.controls.mailAddressBcc.value;
                if (bccEmailAddress && bccEmailAddress.length > 0) {
                    bccEmailAddress.pop();
                    this.formGroup.controls.mailAddressBcc.patchValue(bccEmailAddress);
                }
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid bcc email address', detail: '' });
            }
        }
    }

    onFileSelect(event) {
        if (event.files.length > 0) {

            for (let file of event.files) {
                if (!file.type.includes("image/") &&
                    !file.type.includes("application/pdf") &&
                    !file.type.includes("application/msword") &&
                    !file.type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file type', detail: `Invalid file type for ${file.name}` });
                } else if (event.files[0].size > 5000000) {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file size', detail: 'File size exceeds limit 5MB for ${file.name}`' });
                }
                else {
                    this.uploadedFiles.push(file as File);
                }
            }

        }

        console.log(this.uploadedFiles);
    }

    onDeleteFile(filename) {
        const filteredFiles = this.uploadedFiles.filter(f => f.name != filename);
        this.uploadedFiles = filteredFiles;
    }

    clear() {
        this.formGroup.reset();
        this.formGroup.controls.mailTemplateType.setValue("");
        this.getMailConfigurationByRecruiterId();
        this.uploadedFiles = [];
    }

    hide() {
        this.formGroup.reset();
        this.hideEvent.emit(false);
        this.getMailConfigurationByRecruiterId();
        this.uploadedFiles = [];
    }

    sendMail() {

        const filteredFromAddress = this.recruiterMailConfigs.filter(m => m.Id == this.selectedFromMail);
        if (filteredFromAddress.length > 0) {
            const fromAddress = filteredFromAddress[0].Email;
            const toAddress = this.formGroup.controls.mailAddressTo.value ? this.formGroup.controls.mailAddressTo.value : [];
            const ccAddress = this.formGroup.controls.mailAddressCc.value ? this.formGroup.controls.mailAddressCc.value : [];
            const bccAddress = this.formGroup.controls.mailAddressBcc.value ? this.formGroup.controls.mailAddressBcc.value : [];
            const subject = this.formGroup.controls.subject.value;
            const body = this.formGroup.controls.body.value;

            const formData = new FormData();
            formData.append('fromAddress', fromAddress);
            formData.append('toAddress', toAddress);
            formData.append('ccAddress', ccAddress);
            formData.append('bccAddress', bccAddress);
            formData.append('subject', subject);
            formData.append('body', body);

            if (this.uploadedFiles.length > 0) {
                for (let i = 0; i < this.uploadedFiles.length; i++) {
                    formData.append('files', this.uploadedFiles[i], this.uploadedFiles[i].name);
                }
            }

            this.mailService.sendMail(formData).subscribe(res => {
                if (res.status === 200) {
                    this.formGroup.reset();
                    this.uploadedFiles = [];
                    this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Mail send successfully', detail: '' });
                    this.hideEvent.emit(false);
                }
            },
                err => {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Mail send failed', detail: '' });
                });
        }
    }
}
