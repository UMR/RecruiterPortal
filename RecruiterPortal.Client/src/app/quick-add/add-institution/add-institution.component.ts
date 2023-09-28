import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddInstitutionService } from './add-institution.service';
import { InstitutionModel } from './institution.model';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.css']
})
export class AddInstitutionComponent implements OnInit {
    public institutionForm: FormGroup;
    public zipCodeResults: string[];
    public isLoading: boolean = false;

    constructor(private fb: FormBuilder, private messageService: MessageService, private addInstitutionService: AddInstitutionService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.institutionForm = this.fb.group({
            institutionName: ["", Validators.required],
            telephone: [''],
            zipCode: ['', Validators.required],
            state: [''],
            cityTown: [''],
            county: [''],
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
        console.log($event);
        if ($event) {
            this.institutionForm.patchValue({
                cityTown: $event.City,
                state: $event.StateCode,
                county: $event.StateName
            });
        }
        else {
            this.institutionForm.patchValue({
                cityTown: '',
                state: '',
                county: ''
            });
        }
    }

    onAddInstitutionSubmit() {
        this.isLoading = true;
        let insModel = new InstitutionModel;
        insModel.InstituteName = this.institutionForm.get('institutionName').value;
        insModel.Telephone = this.institutionForm.get('telephone').value == '' ? null : this.institutionForm.get('telephone').value;
        insModel.ZipCode = this.institutionForm.get('zipCode').value.ZipCode;
        insModel.CountryId = 1;
        insModel.StateCode = this.institutionForm.get('state').value;
        insModel.County = this.institutionForm.get('county').value;;
        insModel.Town = this.institutionForm.get('cityTown').value;
        insModel.Address = this.institutionForm.get('institutionAddress').value;
        insModel.IsActive = this.institutionForm.get('isActive').value;

        this.addInstitutionService.addInstitution(insModel).subscribe(res => {
            console.log(res);
            if (res) {
                this.institutionForm.reset()
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Institution Added Successfully', detail: '' });
            }
        },
            err => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Add Institution failed', detail: '' });
            },
            () => {
                this.isLoading = false;
            });
    }
}
