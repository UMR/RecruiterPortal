import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.css']
})
export class AddInstitutionComponent implements OnInit {
    public institutionForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.institutionForm = this.fb.group({
            institutionName: ["", Validators.required]
        });
    }

    onAddInstitutionSubmit() {

    }
}
