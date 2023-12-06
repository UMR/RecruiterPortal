import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmailHistoryService } from './email-history.service';

@Component({
    selector: 'email-history',
    templateUrl: './email-history.component.html',
    styleUrls: ['./email-history.component.css']
})
export class EmailHistoryComponent implements OnInit {
    public emailHistory: any = [];
    public totalEmail: number = 0;
    constructor(private messageService: MessageService, private emailService: EmailHistoryService) {

    }

    ngOnInit() {
    }
    getEmailHistory() {
        this.emailService.getEmailHistory().subscribe(res => {
            if (res.status == 200) {
                this.emailHistory = res.body;
                this.totalEmail = res.body.length;
            }
        },
            err => {
                console.log(err);
            })
    }
    loadEmailLazy() {
        this.getEmailHistory();
    }
}
