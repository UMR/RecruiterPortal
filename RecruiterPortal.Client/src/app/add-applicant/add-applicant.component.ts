import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApplicantModel } from '../common/model/applicant';
import { AddApplicantService } from './add-applicant.service';

@Component({
    selector: 'app-add-applicant',
    templateUrl: './add-applicant.component.html',
    styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {
    public applicantForm: FormGroup;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    public isLoading: boolean = false;
    public applicantModel: ApplicantModel;

    constructor(private messageService: MessageService, private fb: FormBuilder, private addApplicantService: AddApplicantService) { }

    ngOnInit() {
        this.applicantForm = this.fb.group({
            firstName: ["", Validators.required],
            middleName: [""],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]]
        });
    }

    onAddApplicantSubmit() {

        this.isLoading = true;
        this.messageService.clear();
        let appModel = new ApplicantModel;
        appModel.FirstName = this.applicantForm.get('firstName').value;
        appModel.LastName = this.applicantForm.get('lastName').value;
        appModel.Email = this.applicantForm.get('email').value
        appModel.Password = '123456';
        appModel.IsVerified = true;
        appModel.MiddleName = this.applicantForm.get('middleName').value;

        this.addApplicantService.addApplicant(appModel).subscribe(res => {
            console.log(res);
            if (res == 1) {
                this.applicantForm.reset()
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Applicant Added Successfully', detail: '' });
            }
        },
            err => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Add Applicant failed', detail: '' });
            },
            () => {
                this.isLoading = false;
            });

    }

    focusOutEmail() {
        let email = this.applicantForm.get('email').value
        this.addApplicantService.getApplicantByEmail(email)
            .subscribe(data => {
                if (data.body) {
                    this.applicantForm.controls['email'].setErrors({ 'incorrect': true });
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
