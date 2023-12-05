import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SentSMSService } from './sent-sms.service';

@Component({
    selector: 'sent-sms',
    templateUrl: './sent-sms.component.html',
    styleUrls: ['./sent-sms.component.css']
})
export class SentSMSComponent implements OnInit, OnChanges {

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

    constructor(private fb: FormBuilder, private messageService: MessageService, private smsService: SentSMSService) {

    }

    ngOnInit() {
        this.createFormGroup();
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

    onFromMailChange(event) {
        this.selectedFromMail = event.target.value;
        if (!this.selectedFromMail) {
            this.mailTemplateTypes = [];
            this.formGroup.controls.body.setValue('');
        }
        if (this.selectedFromMail) {
        }
    }

    onMailTemplateTypeChange(event) {
        this.selectedTemplateType = event.target.value;
        if (!this.selectedTemplateType) {
            this.formGroup.controls.body.setValue('');
        }
        else if (this.selectedTemplateType) {
        }
    }

    validateEmail(email) {
        return email.match(this.emailRegex);
    }

    clear() {
        this.formGroup.reset();
        this.formGroup.controls.mailTemplateType.setValue("");
    }

    hide() {
        this.formGroup.reset();
        this.hideEvent.emit(false);
    }

    sendSMS() {
        let model = {
            id: 0,
            sendTime: new Date(),
            fromNumber: '',
            toNumber: '6316826456',
            smsbody: 'Test sms from recruiter portal',
            createdBy: 0,
            createdDate: new Date(),
            updatedBy: 0,
            updatedDate: new Date()
        }
        this.smsService.sendSMS(model).subscribe(res => {
            if (res.status === 200) {
                console.log('sent');
                this.formGroup.reset();
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'SMS send successfully', detail: '' });
                this.hideEvent.emit(false);
            }
            else {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'SMS send failed', detail: '' });
            }
        },
            err => {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'SMS send failed', detail: '' });
            });

    }
}
