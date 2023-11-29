import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SentMailService } from './sent-mail.service';
import { MailTemplateService } from '../../../timecards/mail-template-type/mail-template-type.service';
import { MailSettingsService } from '../../../timecards/mail-settings/mail-settings.service';


@Component({
    selector: 'sent-mail',
    templateUrl: './sent-mail.component.html',
    styleUrls: ['./sent-mail.component.css']
})
export class SentMailComponent implements OnInit {

    @Output() hideEvent = new EventEmitter<boolean>();
    public formGroup: FormGroup;
    public recruiterMailConfigs: any[] = [];
    public mailTemplateTypes: any[] = [];
    private selectedFromMail: number;
    private selectedTemplateType: number;

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService,
        private sentMailService: SentMailService, private mailTemplateTypeService: MailTemplateService, private mailSettingsService: MailSettingsService) {
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
            mailAddressTo: ['', Validators.compose([Validators.required])],
            mailAddressCc: [''],
            mailAddressBcc: [''],
            subject: [''],
            body: ['']
        });
    }

    getMailConfigurationByRecruiterId() {
        this.mailSettingsService
            .getRecruiterMailConfigsByRecruiterId()
            .subscribe(res => { this.recruiterMailConfigs = res.body; });
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
        this.getMailTemplateTypesByRecruiterId();
    }

    onMailTemplateTypeChange(event) {
        this.selectedTemplateType = event.target.value;
        this.getMailTemplate();
    }

    clear() {
        this.formGroup.reset();
    }

    hide() {
        this.formGroup.reset();
        this.hideEvent.emit(false);
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

            const model: any = {
                fromAddress: fromAddress,
                toAddress: toAddress,
                ccAddress: ccAddress,
                bccAddress: bccAddress,
                subject: subject,
                body: body
            }

            this.sentMailService.sendMail(model).subscribe(res => {
                if (res) {
                    this.formGroup.reset();
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
