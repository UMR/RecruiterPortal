import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SentSMSService } from './sent-sms.service';

@Component({
    selector: 'sent-sms',
    templateUrl: './sent-sms.component.html',
    styleUrls: ['./sent-sms.component.css']
})
export class SentSMSComponent implements OnInit, AfterViewInit {

    @Input() selectedApplicant: any;
    @Output() hideEvent = new EventEmitter<boolean>();
    public formGroup: FormGroup;
    public recruiterMailConfigs: any[] = [];
    public mailTemplateTypes: any[] = [];
    public phoneRegex = '^\[0-9]{10}$';

    constructor(private fb: FormBuilder, private messageService: MessageService, private smsService: SentSMSService) {

    }

    ngOnInit() {
        this.createFormGroup();
        //this.getApplicantPhone();
    }

    getApplicantPhone() {
        console.log(this.selectedApplicant);
        if (this.selectedApplicant) {
            this.smsService.getApplicantPhone(this.selectedApplicant.UserId).subscribe(res => {
                let phone = [];
                phone.push(res.body[0].Phone)
                this.formGroup.controls.phoneNumber.setValue(phone);
            },
                err => {
                    console.log(err);
                }
            )
        }
    }

    ngAfterViewInit() {
        this.test();
    }
    test() {
        setTimeout(() => { this.getApplicantPhone() }, 5000);
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            phoneNumber: ['', Validators.compose([Validators.required])],
            messageBody: ['', Validators.compose([Validators.required])]
        });
    }

    clear() {
        this.formGroup.reset();
    }

    hide() {
        this.getApplicantPhone();
        console.log(this.selectedApplicant.UserId);
        this.formGroup.reset();
        this.hideEvent.emit(false);
    }

    validatePhone(phone) {
        return phone.match(this.phoneRegex);
    }

    onToTokenAdd(chip) {
        if (chip.value) {
            const result = this.validatePhone(chip.value);
            if (!result) {
                const toPhone: string[] = this.formGroup.controls.phoneNumber.value;
                if (toPhone && toPhone.length > 0) {
                    toPhone.pop();
                    this.formGroup.controls.phoneNumber.patchValue(toPhone);
                }
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid phone', detail: '' });
            }
        }
    }

    sendSMS() {
        let model = {
            toNumber: this.formGroup.controls.phoneNumber.value,
            smsbody: this.formGroup.controls.messageBody.value.trim()
        }
        this.smsService.sendSMS(model).subscribe(res => {
            console.log(res);
            if (res.status === 200) {
                this.formGroup.reset();
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'SMS send successfully', detail: '' });
                this.hideEvent.emit(false);
            }
            else {
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'SMS send successfully', detail: '' });
            }
        },
            err => {
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'SMS send successfully', detail: '' });
                //this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'SMS send failed', detail: '' });
            });

    }
}