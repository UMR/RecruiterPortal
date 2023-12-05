import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MailTemplateService } from '../../../timecards/mail-template-type/mail-template-type.service';
import { MailSettingsService } from '../../../timecards/mail-settings/mail-settings.service';
import { MailService } from '../../services/mail.service';


@Component({
    selector: 'sent-bulk-mail',
    templateUrl: './sent-bulk-mail.component.html',
    styleUrls: ['./sent-bulk-mail.component.css']
})
export class SentBulkMailComponent implements OnInit {

    @Input() selectedFilteredParams: any;
    @Output() hideEvent = new EventEmitter<boolean>();
    public formGroup: FormGroup;
    public recruiterMailConfigs: any[] = [];
    public mailTemplateTypes: any[] = [];
    private selectedFromMail: number;
    private selectedTemplateType: number;

    constructor(private fb: FormBuilder, private messageService: MessageService, private mailService: MailService,
        private mailTemplateTypeService: MailTemplateService, private mailSettingsService: MailSettingsService) {
        this.mailTemplateTypeService.mailTemplateTypes$.subscribe(data => { this.mailTemplateTypes = data; });
    }

    ngOnInit() {
        this.createFormGroup();
        this.getMailConfigurationByRecruiterId();
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            fromMail: ['', Validators.compose([Validators.required])],
            mailTemplateType: [''],
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

    clear() {
        this.formGroup.reset();
        this.formGroup.controls.mailTemplateType.setValue("");
        this.getMailConfigurationByRecruiterId();
    }

    hide() {
        this.formGroup.reset();
        this.hideEvent.emit(false);
        this.getMailConfigurationByRecruiterId();
    }

    sendBulkMail() {
        const filteredFromAddress = this.recruiterMailConfigs.filter(m => m.Id == this.selectedFromMail);
        if (filteredFromAddress.length > 0) {
            const fromAddress = filteredFromAddress[0].Email;
            const subject = this.formGroup.controls.subject.value;
            const body = this.formGroup.controls.body.value;

            const model: { firstName: string; lastName: string; email: string; isVerified: boolean; fromAddress: string; subject: string; body: string } = {
                firstName: this.selectedFilteredParams.firstName,
                lastName: this.selectedFilteredParams.lastName,
                email: this.selectedFilteredParams.email,
                isVerified: this.selectedFilteredParams.isVerified,
                fromAddress: fromAddress,
                subject: subject,
                body: body
            }

            this.mailService.sendBulkMail(model).subscribe(res => {
                if (res) {
                    if (res.status === 200) {
                        this.formGroup.reset();
                        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Mail send successfully', detail: '' });
                        this.hideEvent.emit(false);
                    }
                }
            },
                err => {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Mail send failed', detail: '' });
                });
        }
    }
}
