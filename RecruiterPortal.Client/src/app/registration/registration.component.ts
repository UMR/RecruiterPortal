import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { RegistrationService } from './registration.service';
import { LoginService } from '../login/login.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    public regModel: RegistrationModel[] = [];
    public isLoading: boolean = false;
    public regForm: FormGroup;
    public submitted = false;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    constructor(private regService: RegistrationService, private loginService: LoginService, private messageService: MessageService, private fb: FormBuilder) {

    }

    ngOnInit() {
        this.regForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
            isConditionAgree: [false, Validators.required],
            password: ["", [Validators.required, Validators.minLength(6)]],
            confirmPassword: ["", Validators.required],
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    get f() { return this.regForm.controls; }

    onRegSubmit() {
        this.submitted = true;
        if (!this.regForm.invalid && this.regForm.get('isConditionAgree').value) {
            this.isLoading = true;
            this.messageService.clear();
            this.regModel = [];
            this.regModel.push({
                First_Name: this.regForm.get('firstName').value, Last_Name: this.regForm.get('lastName').value, Email: this.regForm.get('email').value,
                Password: this.regForm.get('password').value, IsVerified: false, Middle_Name: ""
            })
            this.regService.registration(this.regModel[0])
                .subscribe(data => {
                    this.postRegLogin();
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Registration failed', detail: '' });
                    },
                    () => {
                        this.isLoading = false;
                    });
        }
    }

    postRegLogin() {
        this.loginService.login(this.regForm.get('email').value, this.regForm.get('password').value,'')
            .subscribe(_ => _, err => {
                if (err instanceof HttpErrorResponse) {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'The email or password is incorrect', detail: '' });
                }
                else {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Something went wrong on server', detail: '' });
                }
            },
                () => { });
    }

    focusOutEmail() {
        let email = this.regForm.get('email').value
        this.regService.getUserByEmail(email)
            .subscribe(data => {
                if (data.body) {
                    this.regForm.controls['email'].setErrors({ 'incorrect': true });
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Email already exist', detail: '' });
                }
            },
                err => {
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                });
    }
}
