import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddEditAgreementService } from './add-edit-agreement.service';
import { AddEditAgreementModel } from './add-edit-agreement.model';
import { CompareValidator } from '../../../common/directives/compare-validator.directive';
import { forkJoin } from 'rxjs';
import { SelectItem } from 'primeng/primeng';
import { StorageService } from '../../../common/services/storage.service';

@Component({
    selector: 'app-add-edit-agreement',
    templateUrl: './add-edit-agreement.component.html',
    styleUrls: ['./add-edit-agreement.component.css'],
    providers: [MessageService]
})
export class AddEditAgreementComponent implements OnInit {
    public addEditAgreementFormGroup: FormGroup;
    public isLoading: boolean = false;
    public submitted: boolean = false;
    public zipCodeResults: string[];
    private agreementId: string = "";

    constructor(private addEditAgreementService: AddEditAgreementService, private fb: FormBuilder, private router: Router,
        private messageService: MessageService, private activeRoute: ActivatedRoute, private service: StorageService) {
        this.addEditAgreementFormGroup = this.fb.group({
            contractorName: [''],
            streetAdress: [''],
            zipCode: [''],
            state: [''],
            cityTown: [''],
            notary: [''],
            date: ['']
        });
    }

    ngOnInit() {
        this.addEditAgreementService.getAgreementInfo(this.service.getApplicantId)
            .subscribe(data => {
                if (data.status === 200 && data.body !== null) {
                    this.agreementId = data.body.agreementID;
                    this.addEditAgreementFormGroup.setValue({
                        contractorName: data.body.ContractorName,
                        streetAdress: data.body.StreetAddress,
                        zipCode: { ZipCode: data.body.ZipCode },
                        state: data.body.StateName,
                        cityTown: data.body.City,
                        notary: data.body.Notary,
                        date: data.body.Date ? new Date(data.body.Date) : null,
                    });
                }
            },
                err => {
                    console.log(err);
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get agreement info', detail: '' });
                },
                () => { this.isLoading = false; });
    }



    onSubmit() {
        if (this.agreementId == "" && this.isEmpty()) {
            this.messageService.add({ key: 'toastKey1', severity: 'warn', summary: 'Please fill at least one field', detail: '' });
            return;
        }
        else {
            const agreeModel = new AddEditAgreementModel();
            if (this.agreementId != "") {
                agreeModel.AgreementID = this.agreementId;
            }
            agreeModel.ApplicantId = this.service.getApplicantId.toString();
            agreeModel.ContractorName = this.addEditAgreementFormGroup.get('contractorName').value;
            agreeModel.StreetAddress = this.addEditAgreementFormGroup.get('streetAdress').value;
            if (this.addEditAgreementFormGroup.get('zipCode').value != "") {
                agreeModel.ZipCode = this.addEditAgreementFormGroup.get('zipCode').value.ZipCode;
            }
            agreeModel.City = this.addEditAgreementFormGroup.get('cityTown').value;
            agreeModel.StateName = this.addEditAgreementFormGroup.get('state').value;
            agreeModel.Notary = this.addEditAgreementFormGroup.get('notary').value;

            agreeModel.Date = this.addEditAgreementFormGroup.get('date').value ? this.getUTCFormatedDate(this.addEditAgreementFormGroup.get('date').value) : Date;
            this.isLoading = true;
            this.addEditAgreementService.saveAgreementInfo(agreeModel)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.router.navigate(['/agreement-form-info/'/*, { updateSuccessful: 1 }*/]);
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update agreement info', detail: '' });
                    }
                },
                    err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update agreement info', detail: '' }); },
                    () => { this.isLoading = false; })
        }
    }

    getClientFormattedDate(value): Date {
        if (value) {
            var dateParts = value.split("-");
            var dateObject = new Date(+dateParts[2], dateParts[0] - 1, +dateParts[1]);

            return dateObject;
        }
        return null;
    }
    getUTCFormatedDate(value): Date {
        if (value) {
            return new Date(Date.UTC(
                new Date(value).getFullYear(),
                new Date(value).getMonth(),
                new Date(value).getDate()));
        }
        return null;
    }

    onClear() {
        this.addEditAgreementFormGroup.setValue({
            contractorName: '',
            streetAdress: '',
            zipCode: '',
            cityTown: '',
            state: '',
            notary: '',
            date: '',
        });
    }
    onZipCodeSearch($event) {
        this.addEditAgreementService.getZipCodeCityStateByZipCode($event.query).subscribe(data => {
            console.log(data);
            this.zipCodeResults = data.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get zip code', detail: '' }); },
            () => { });
    }
    onZipCodeSelect($event) {
        this.addEditAgreementFormGroup.patchValue({
            cityTown: $event.City,
            state: $event.StateName
        });
    }

    isEmpty(): boolean {
        let isEmpty: boolean = true;
        if (this.addEditAgreementFormGroup.get('contractorName').value) {
            isEmpty = false;
        }
        if (this.addEditAgreementFormGroup.get('streetAdress').value) {
            isEmpty = false;
        }
        if (this.addEditAgreementFormGroup.get('zipCode').value) {
            isEmpty = false;
        }
        if (this.addEditAgreementFormGroup.get('cityTown').value) {
            isEmpty = false;
        }
        if (this.addEditAgreementFormGroup.get('state').value) {
            isEmpty = false;
        }
        if (this.addEditAgreementFormGroup.get('notary').value) {
            isEmpty = false;
        }
        if (this.addEditAgreementFormGroup.get('date').value) {
            isEmpty = false;
        }
        return isEmpty;
    }
}
