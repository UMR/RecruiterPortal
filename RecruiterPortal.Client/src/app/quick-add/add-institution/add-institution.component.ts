import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddInstitutionService } from './add-institution.service';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.css']
})
export class AddInstitutionComponent implements OnInit {
    public institutionForm: FormGroup;
    public zipCodeResults: string[];

    constructor(private fb: FormBuilder, private messageService: MessageService, private addInstitutionService: AddInstitutionService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.institutionForm = this.fb.group({
            institutionName: ["", Validators.required],
            telephone: [''],
            zipCode: [''],
            state: [''],
            cityTown: [''],
            institutionWeb: [''],
            institutionAddress: [''],
            isActive: [false]
        });
    }

    onZipCodeSearch($event) {
        this.addInstitutionService.getZipCodeCityStateByZipCode($event.query).subscribe(data => {
            console.log(data);
            this.zipCodeResults = data.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get zip code', detail: '' }); },
            () => { });
    }

    onZipCodeSelect($event) {
        if ($event) {
            this.institutionForm.patchValue({
                cityTown: $event.City,
                state: $event.StateName
            });
        }
        else {
            this.institutionForm.patchValue({
                cityTown: '',
                state: ''
            });
        }
    }

    onAddInstitutionSubmit() {

    }
}
