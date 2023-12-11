import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../../common/services/storage.service';
import { TermsConditionsService } from '../terms-conditions.service';

@Component({
    selector: 'app-add-edit-terms-conditions',
    templateUrl: './add-edit-terms-conditions.component.html',
    styleUrls: ['./add-edit-terms-conditions.component.css']
})
export class AddEditTermsConditionsComponent implements OnInit {

    public isLoading: boolean = false;
    public addEditTermsConditionsFormGroup: FormGroup;
    public zipCodeResults: string[];
    public termsConditions: any = {};
    public termsConditionsId: number = null;

    constructor(private termsConditionsService: TermsConditionsService, private fb: FormBuilder, private router: Router,
        private messageService: MessageService, private activeRoute: ActivatedRoute, private storageService: StorageService) {
    }

    ngOnInit() {
        this.createTermsConditionsFormGroup();
        this.getTermsConditionsByApplicantId();
    }

    createTermsConditionsFormGroup() {
        this.addEditTermsConditionsFormGroup = this.fb.group({
            effectiveDate: [''],
            facilityName: ['', Validators.compose([Validators.maxLength(500)])],
            streetAddress: ['', Validators.compose([Validators.maxLength(500)])],
            zipCode: ['', Validators.compose([Validators.maxLength(500)])],
            stateName: ['', Validators.compose([Validators.maxLength(500)])],
            city: ['', Validators.compose([Validators.maxLength(500)])],
            officePhone: ['', Validators.compose([Validators.maxLength(500)])],
            position: ['', Validators.compose([Validators.maxLength(500)])],
            ratePayCompensation: ['', Validators.compose([Validators.maxLength(500)])],
            daysPerWeek: ['', Validators.compose([Validators.maxLength(1), Validators.min(0), Validators.max(7)])],
            nameGeneralLiabilityInsurance: ['', Validators.compose([Validators.maxLength(500)])],
            generalLiabilityInsurancePolicyNo: ['', Validators.compose([Validators.maxLength(500)])],
            nameMalpracticeInsurance: ['', Validators.compose([Validators.maxLength(500)])],
            malpracticeInsurancePolicyNo: ['', Validators.compose([Validators.maxLength(500)])],
            nameWorkersCompensationInsurance: ['', Validators.compose([Validators.maxLength(500)])],
            workersCompensationInsurancePolicyNo: ['', Validators.compose([Validators.maxLength(500)])],
            nameDisabilityInsurance: ['', Validators.compose([Validators.maxLength(500)])],
            nameDisabilityInsurancePolicyNo: ['', Validators.compose([Validators.maxLength(500)])],
            signatureDate: [''],
            authorizedBy: ['', Validators.compose([Validators.maxLength(500)])],
            authorizedDate: [''],
        });
    }

    getTermsConditionsByApplicantId() {
        this.isLoading = true;
        this.termsConditionsService.getTermsConditionsByApplicantId(this.storageService.getApplicantId)
            .subscribe(data => {
                if (data.status === 200 && data.body) {
                    this.termsConditions = data.body;
                    this.fillUpTermsConditions();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get terms & conditions', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    fillUpTermsConditions() {
        this.termsConditionsId = this.termsConditions.TermsConditionsID ? +this.termsConditions.TermsConditionsID : null;
        this.addEditTermsConditionsFormGroup.setValue({
            effectiveDate: this.termsConditions.EffectiveDate ? new Date(this.termsConditions.EffectiveDate) : null,
            facilityName: this.checkNullOrUndefined(this.termsConditions.FacilityName),
            streetAddress: this.checkNullOrUndefined(this.termsConditions.StreetAddress),
            zipCode: { ZipCode: this.termsConditions.ZipCode },
            stateName: this.checkNullOrUndefined(this.termsConditions.StateName),
            city: this.checkNullOrUndefined(this.termsConditions.City),
            officePhone: this.checkNullOrUndefined(this.termsConditions.OfficePhone),
            position: this.checkNullOrUndefined(this.termsConditions.Position),
            ratePayCompensation: this.checkNullOrUndefined(this.termsConditions.RatePayCompensation),
            daysPerWeek: this.checkNullOrUndefined(this.termsConditions.DaysPerWeek),
            nameGeneralLiabilityInsurance: this.checkNullOrUndefined(this.termsConditions.NameGeneralLiabilityInsurance),
            generalLiabilityInsurancePolicyNo: this.checkNullOrUndefined(this.termsConditions.GeneralLiabilityInsurancePolicyNo),
            nameMalpracticeInsurance: this.checkNullOrUndefined(this.termsConditions.NameMalpracticeInsurance),
            malpracticeInsurancePolicyNo: this.checkNullOrUndefined(this.termsConditions.MalpracticeInsurancePolicyNo),
            nameWorkersCompensationInsurance: this.checkNullOrUndefined(this.termsConditions.NameWorkersCompensationInsurance),
            workersCompensationInsurancePolicyNo: this.checkNullOrUndefined(this.termsConditions.WorkersCompensationInsurancePolicyNo),
            nameDisabilityInsurance: this.checkNullOrUndefined(this.termsConditions.NameDisabilityInsurance),
            nameDisabilityInsurancePolicyNo: this.checkNullOrUndefined(this.termsConditions.NameDisabilityInsurancePolicyNo),
            signatureDate: this.termsConditions.SignatureDate ? new Date(this.termsConditions.SignatureDate) : null,
            authorizedBy: this.checkNullOrUndefined(this.termsConditions.AuthorizedBy),
            authorizedDate: this.termsConditions.AuthorizedDate ? new Date(this.termsConditions.AuthorizedDate) : null,
        });
    }

    checkNullOrUndefined(value) {
        if (value) {
            return value;
        }
        return '';
    }

    onZipCodeSearch($event) {
        this.termsConditionsService.getZipCodeCityStateByZipCode($event.query).subscribe(response => {            
            this.zipCodeResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get zip code', detail: '' }); },
            () => { });
    }

    onZipCodeSelect($event) {
        this.addEditTermsConditionsFormGroup.patchValue({
            city: $event.City,
            stateName: $event.StateName
        });
    }

    onZipCodeClear() {
        this.addEditTermsConditionsFormGroup.patchValue({
            city: '',
            stateName: ''
        });
    }
    getZipCode(): string {
        if (this.addEditTermsConditionsFormGroup.controls.zipCode.value) {
            return this.addEditTermsConditionsFormGroup.controls.zipCode.value.zipCode;
        }
    }

    isEmptyField(): boolean {
        let isEmpty: boolean = true;
        if (this.addEditTermsConditionsFormGroup.controls.effectiveDate.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.facilityName.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.streetAddress.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.zipCode.value && this.addEditTermsConditionsFormGroup.controls.zipCode.value.ZipCode) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.stateName.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.city.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.officePhone.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.position.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.ratePayCompensation.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.daysPerWeek.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.nameGeneralLiabilityInsurance.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.generalLiabilityInsurancePolicyNo.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.nameMalpracticeInsurance.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.malpracticeInsurancePolicyNo.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.nameWorkersCompensationInsurance.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.workersCompensationInsurancePolicyNo.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.nameDisabilityInsurance.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.nameDisabilityInsurancePolicyNo.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.signatureDate.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.authorizedBy.value) {
            isEmpty = false;
        }
        if (this.addEditTermsConditionsFormGroup.controls.authorizedDate.value) {
            isEmpty = false;
        }
        return isEmpty;
    }

    onSubmit() {
        if (this.isEmptyField()) {
            this.messageService.add({ key: 'toastKey1', severity: 'warn', summary: 'Please fill at least one field', detail: '' });
            return;
        }
        else {
            const termsConditions = {
                userID: this.storageService.getApplicantId,
                termsConditionsId: this.termsConditionsId,
                effectiveDate: this.addEditTermsConditionsFormGroup.controls.effectiveDate.value ? new Date(this.addEditTermsConditionsFormGroup.controls.effectiveDate.value).toLocaleString() : '',
                facilityName: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.facilityName.value),
                streetAddress: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.streetAddress.value),
                zipCode: this.addEditTermsConditionsFormGroup.controls.zipCode.value ? this.addEditTermsConditionsFormGroup.controls.zipCode.value.ZipCode : null,
                stateName: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.stateName.value),
                city: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.city.value),
                officePhone: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.officePhone.value),
                position: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.position.value),
                ratePayCompensation: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.ratePayCompensation.value),
                daysPerWeek: this.addEditTermsConditionsFormGroup.controls.daysPerWeek.value ? + this.addEditTermsConditionsFormGroup.controls.daysPerWeek.value : null,
                nameGeneralLiabilityInsurance: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.nameGeneralLiabilityInsurance.value),
                generalLiabilityInsurancePolicyNo: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.generalLiabilityInsurancePolicyNo.value),
                nameMalpracticeInsurance: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.nameMalpracticeInsurance.value),
                malpracticeInsurancePolicyNo: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.malpracticeInsurancePolicyNo.value),
                nameWorkersCompensationInsurance: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.nameWorkersCompensationInsurance.value),
                workersCompensationInsurancePolicyNo: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.workersCompensationInsurancePolicyNo.value),
                nameDisabilityInsurance: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.nameDisabilityInsurance.value),
                nameDisabilityInsurancePolicyNo: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.nameDisabilityInsurancePolicyNo.value),
                signatureDate: this.addEditTermsConditionsFormGroup.controls.signatureDate.value ? new Date(this.addEditTermsConditionsFormGroup.controls.signatureDate.value).toLocaleString() : '',
                authorizedBy: this.checkNullOrUndefined(this.addEditTermsConditionsFormGroup.controls.authorizedBy.value),
                authorizedDate: this.addEditTermsConditionsFormGroup.controls.authorizedDate.value ? new Date(this.addEditTermsConditionsFormGroup.controls.authorizedDate.value).toLocaleString() : ''
            }
            this.isLoading = true;
            this.termsConditionsService.save(termsConditions)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.router.navigate(['/terms-conditions']);
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update terms & conditions', detail: '' });
                    }
                },
                    err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update terms & conditions', detail: '' }); },
                    () => { this.isLoading = false; })
        }
    }

    onClear() {
        this.addEditTermsConditionsFormGroup.reset();
    }

}
