import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerifyService } from './verify.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { currentUserVerificationStatus } from '../common/constants/auth-keys';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css'],
    providers: [MessageService]
})
export class VerifyComponent implements OnInit {

    public isLoading: boolean = false;
    public verficationCode: string;

    constructor(private router: Router, private verifyService: VerifyService, private messageService: MessageService) { }

    ngOnInit() {
        let isCurrentUserVerified = localStorage.getItem(currentUserVerificationStatus);
        if (isCurrentUserVerified == undefined) {
            this.router.navigate(['registration']);
        }
        else {
            if (isCurrentUserVerified == "true") {
                this.router.navigate(['/']);
            }
        }
    }

    onVerification() {
        this.isLoading = true;
        this.messageService.clear();
        this.verifyService.verify(this.verficationCode)
            .subscribe(data => {
                if (data.status === 200) {
                    localStorage.removeItem(currentUserVerificationStatus);
                    localStorage.setItem(currentUserVerificationStatus, data.body);
                    if (data.body) {
                        this.router.navigate(['/']);
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid Code', detail: '' });
                    }
                }
            },
                err => {
                    this.isLoading = false;
                    if (err instanceof HttpErrorResponse) {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'The verfication code is incorrect.', detail: '' });
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Something went wrong on server.', detail: '' });
                    }
                },
                () => {
                    this.isLoading = false;
                });
    }

    resendCodeEvent() {
        this.isLoading = true;
        this.messageService.clear();
        this.verifyService.resendVerificationCode()
            .subscribe(data => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Please check your mail.', detail: '' });
            },
                err => {
                    this.isLoading = false;
                    if (err instanceof HttpErrorResponse) {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'The verfication code resend failed.', detail: '' });
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Something went wrong on server.', detail: '' });
                    }
                });
    }
}
