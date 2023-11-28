import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SentMailService } from './sent-mail.service';


@Component({
    selector: 'sent-mail',
    templateUrl: './sent-mail.component.html',
    styleUrls: ['./sent-mail.component.css']
})
export class SentMailComponent implements OnInit {

    @Output() hideEvent = new EventEmitter<boolean>();    
    public formGroup: FormGroup;    

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private sentMailService: SentMailService) {

    }

    ngOnInit() {
        this.createFormGroup();
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            to: [''],
            cc: [''],
            bcc: [''],
            subject: [''],
            body: ['']
        });
    }

    clear() {
        this.formGroup.reset();
    }

    hide() {
        this.formGroup.reset();
        this.hideEvent.emit(false);
    }

    sendMail() {
        //this.sentMailService.addApplicantStatus(model).subscribe(res => {
        //    if (res) {
        //        this.formGroup.reset();
        //        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Applicant send successfully', detail: '' });
        //        this.hideEvent.emit(false);
        //    }
        //},
        //    err => {
        //        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Applicant send failed', detail: '' });
        //    });

    }
}
