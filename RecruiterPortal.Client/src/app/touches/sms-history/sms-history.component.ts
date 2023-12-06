import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SmsHistoryService } from './sms-history.service';

@Component({
    selector: 'sms-history',
    templateUrl: './sms-history.component.html',
    styleUrls: ['./sms-history.component.css']
})
export class SmsHistoryComponent implements OnInit {
    public smsHistory: any = [];
    public totalSms: number = 0;
    constructor(private messageService: MessageService, private smsService: SmsHistoryService) {

    }

    ngOnInit() {
    }
    getSmsHistory() {
        this.smsService.getSmsHistory().subscribe(res => {
            if (res.status == 200) {
                this.smsHistory = res.body;
                this.totalSms = res.body.length;
            }
        },
            err => {
                console.log(err);
            })
    }
    loadSmsLazy() {
        this.getSmsHistory();
    }
}
