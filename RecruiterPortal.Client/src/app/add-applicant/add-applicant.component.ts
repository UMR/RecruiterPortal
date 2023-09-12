import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-add-applicant',
    templateUrl: './add-applicant.component.html',
    styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {
    public applicantForm: FormGroup;
    private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    constructor(private messageService: MessageService, private fb: FormBuilder) { }

    ngOnInit() {
        this.applicantForm = this.fb.group({
            firstName: ["", Validators.required],
            middleName: [""],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]]
        });
    }

    onAddApplicantSubmit() {
    }


}
