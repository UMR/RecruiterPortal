import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { EditApplicantInfoService } from './edit-applicant-info.service';
import { EditApplicantInfoModel } from './edit-applicant-info.model';
import { StorageService } from '../../../common/services/storage.service';

@Component({
    selector: 'app-edit-applicant-info',
    templateUrl: './edit-applicant-info.component.html',
    styleUrls: ['./edit-applicant-info.component.css'],
    providers: [MessageService]
})
export class EditApplicantInfoComponent implements OnInit {
    public editApplicantInfoModel: EditApplicantInfoModel = new EditApplicantInfoModel();
    public editApplicantInfoFormGroup: FormGroup;
    public isLoading: boolean = true;
    public zipCodeResults: string[];
    public positionResults: string[];
    public countryNames: string[];

    constructor(private editApplicantInfoService: EditApplicantInfoService, private fb: FormBuilder, private router: Router,
        private messageService: MessageService, private storageService: StorageService) {
        this.editApplicantInfoFormGroup = this.fb.group({
            lastName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            firstName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            middleName: ['', Validators.compose([Validators.maxLength(200)])],
            streetAddress: ['', Validators.compose([Validators.maxLength(500)])],
            apartment: ['', Validators.compose([Validators.maxLength(50)])],
            zipCode: ['', Validators.maxLength(50)],
            city: ['', Validators.maxLength(50)],
            state: ['', Validators.maxLength(50)],
            email: [{ value: '', disabled: true }, Validators.compose([Validators.required, Validators.maxLength(200)])],
            phone: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
            ssn: [''],
            dateAvailable: [''],
            desiredSalary: ['', Validators.compose([Validators.maxLength(10)])],
            positionAppliedFor: ['', Validators.compose([Validators.maxLength(500)])],
            isUSCitizen: ['', Validators.required],
            isAuthorized: ['', Validators.required],
            isOldClient: ['', Validators.required],
            isConvict: ['', Validators.required],
            convictionDetail: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
            dateOfBirth: [''],
            gender: ['', Validators.maxLength(50)],
            countryOfBirth: ['', Validators.maxLength(50)],
            countryFromApplied: ['', Validators.maxLength(50)],
            emailId: [''],
            phoneId: [''],
            positionAppliedForId: [''],
        });
    }

    ngOnInit() {
        this.editApplicantInfoService.getApplicantInfo().subscribe(data => {
            console.log(data);
            this.editApplicantInfoModel = data.body[0] as EditApplicantInfoModel;
            //console.log(data.body.Data);
            this.editApplicantInfoFormGroup.setValue({
                lastName: this.checkNullOrUndefined(this.editApplicantInfoModel.LastName),
                firstName: this.checkNullOrUndefined(this.editApplicantInfoModel.FirstName),
                middleName: this.checkNullOrUndefined(this.editApplicantInfoModel.MiddleName),
                streetAddress: this.checkNullOrUndefined(this.editApplicantInfoModel.StreetAddress),
                apartment: this.checkNullOrUndefined(this.editApplicantInfoModel.Apartment),
                zipCode: { ZipCode: this.checkNullOrUndefined(this.editApplicantInfoModel.ZipCode) },
                city: this.checkNullOrUndefined(this.editApplicantInfoModel.City),
                state: this.checkNullOrUndefined(this.editApplicantInfoModel.State),
                email: this.checkNullOrUndefined(this.editApplicantInfoModel.Email),
                emailId: this.checkNullOrUndefined(this.editApplicantInfoModel.ApplicantEmailID),
                phone: this.checkNullOrUndefined(this.editApplicantInfoModel.Phone),
                phoneId: this.checkNullOrUndefined(this.editApplicantInfoModel.ApplicantPhoneID),
                ssn: this.checkNullOrUndefined(this.editApplicantInfoModel.SSN),
                dateAvailable: this.editApplicantInfoModel.DateAvailable ? new Date(this.editApplicantInfoModel.DateAvailable) : null,
                desiredSalary: this.checkNullOrUndefined(this.editApplicantInfoModel.DesiredSalary),
                //positionAppliedFor: { Text: this.checkNullOrUndefined(this.editApplicantInfoModel.PositionAppliedFor) },
                positionAppliedFor: { Text: this.checkNullOrUndefined(this.editApplicantInfoModel.PositionAppliedFor) },
                positionAppliedForId: this.checkNullOrUndefined(this.editApplicantInfoModel.DesiredPositionId),
                isUSCitizen: this.setRadioButtonData(this.editApplicantInfoModel.IsUSCitizen),
                isAuthorized: this.setRadioButtonData(this.editApplicantInfoModel.IsAuthorized),
                isOldClient: this.setRadioButtonData(this.editApplicantInfoModel.IsOldClient),
                isConvict: this.setRadioButtonData(this.editApplicantInfoModel.IsConvict),
                convictionDetail: this.checkNullOrUndefined(this.editApplicantInfoModel.ConvictionDetail),
                dateOfBirth: this.editApplicantInfoModel.DateOfBirth ? new Date(this.editApplicantInfoModel.DateOfBirth) : null,
                gender: this.checkNullOrUndefined(this.editApplicantInfoModel.Gender),
                countryOfBirth: { CountryName: this.checkNullOrUndefined(this.editApplicantInfoModel.CountryOfBirth) },
                countryFromApplied: { CountryName: this.checkNullOrUndefined(this.editApplicantInfoModel.CountryFromApplied) },
            });
            if (this.editApplicantInfoFormGroup.get('isConvict').value != 'YES') {
                this.editApplicantInfoFormGroup.patchValue({ convictionDetail: '' });
                this.editApplicantInfoFormGroup.controls['convictionDetail'].disable();
            }
            if (this.editApplicantInfoFormGroup.get('isUSCitizen').value != 'YES') {
                //this.editApplicantInfoFormGroup.patchValue({ ssn: '' });
                //this.editApplicantInfoFormGroup.controls['ssn'].disable();
            }
            if (this.editApplicantInfoFormGroup.get('isUSCitizen').value != 'NO') {
                //this.editApplicantInfoFormGroup.patchValue({ isAuthorized: '' });
                this.editApplicantInfoFormGroup.controls['isAuthorized'].disable();
            }
            //if (this.editApplicantInfoFormGroup.get('zipCode').value.zipCode == '') {
            //    this.editApplicantInfoFormGroup.controls['zipCode'].setErrors({ 'incorrect': true });
            //}
        },
            err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant info', detail: '' }); },
            () => { this.isLoading = false; });
    }

    onSubmit() {
        let applicantInfoModel = new EditApplicantInfoModel();
        applicantInfoModel.UserId = this.storageService.getApplicantId;
        applicantInfoModel.LastName = this.editApplicantInfoFormGroup.get('lastName').value ? this.editApplicantInfoFormGroup.get('lastName').value.trim() : "";
        applicantInfoModel.FirstName = this.editApplicantInfoFormGroup.get('firstName').value ? this.editApplicantInfoFormGroup.get('firstName').value.trim() : "";
        applicantInfoModel.MiddleName = this.editApplicantInfoFormGroup.get('middleName').value ? this.editApplicantInfoFormGroup.get('middleName').value.trim() : "";
        applicantInfoModel.StreetAddress = this.editApplicantInfoFormGroup.get('streetAddress').value ? this.editApplicantInfoFormGroup.get('streetAddress').value.trim() : "";
        applicantInfoModel.Apartment = this.editApplicantInfoFormGroup.get('apartment').value ? this.editApplicantInfoFormGroup.get('apartment').value.trim() : "";
        applicantInfoModel.ZipCode = this.editApplicantInfoFormGroup.get('zipCode').value ? this.editApplicantInfoFormGroup.get('zipCode').value.ZipCode : "";
        applicantInfoModel.City = this.editApplicantInfoFormGroup.get('city').value ? this.editApplicantInfoFormGroup.get('city').value.trim() : "";
        applicantInfoModel.State = this.editApplicantInfoFormGroup.get('state').value ? this.editApplicantInfoFormGroup.get('state').value.trim() : "";
        applicantInfoModel.Email = this.editApplicantInfoFormGroup.get('email').value ? this.editApplicantInfoFormGroup.get('email').value.trim() : "";
        applicantInfoModel.ApplicantEmailID = this.editApplicantInfoFormGroup.get('emailId').value ? this.editApplicantInfoFormGroup.get('emailId').value.trim() : "";
        applicantInfoModel.Phone = this.editApplicantInfoFormGroup.get('phone').value ? this.editApplicantInfoFormGroup.get('phone').value.trim() : "";
        applicantInfoModel.ApplicantPhoneID = this.editApplicantInfoFormGroup.get('phoneId').value ? this.editApplicantInfoFormGroup.get('phoneId').value.trim() : "";
        applicantInfoModel.SSN = this.editApplicantInfoFormGroup.get('ssn').value ? this.editApplicantInfoFormGroup.get('ssn').value.trim() : "";
        applicantInfoModel.DateAvailable = this.editApplicantInfoFormGroup.get('dateAvailable').value == "" ? null : this.getUTCFormatedDate(this.editApplicantInfoFormGroup.get('dateAvailable').value);
        applicantInfoModel.DesiredSalary = this.editApplicantInfoFormGroup.get('desiredSalary').value ? this.editApplicantInfoFormGroup.get('desiredSalary').value.trim() : "";
        //applicantInfoModel.PositionAppliedFor = this.editApplicantInfoFormGroup.get('positionAppliedFor').value.position_Name;
        applicantInfoModel.PositionAppliedFor = this.editApplicantInfoFormGroup.get('positionAppliedFor').value ? this.editApplicantInfoFormGroup.get('positionAppliedFor').value.Text : "";
        applicantInfoModel.DesiredPositionId = this.editApplicantInfoFormGroup.get('positionAppliedFor').value.Value;
        applicantInfoModel.IsUSCitizen = this.getBooleanValue(this.editApplicantInfoFormGroup.get('isUSCitizen').value ? this.editApplicantInfoFormGroup.get('isUSCitizen').value.trim() : "");
        applicantInfoModel.IsAuthorized = this.getBooleanValue(this.editApplicantInfoFormGroup.get('isAuthorized').value ? this.editApplicantInfoFormGroup.get('isAuthorized').value.trim() : "");
        applicantInfoModel.IsOldClient = this.getBooleanValue(this.editApplicantInfoFormGroup.get('isOldClient').value ? this.editApplicantInfoFormGroup.get('isOldClient').value.trim() : "");
        applicantInfoModel.IsConvict = this.getBooleanValue(this.editApplicantInfoFormGroup.get('isConvict').value ? this.editApplicantInfoFormGroup.get('isConvict').value.trim() : "");
        applicantInfoModel.ConvictionDetail = this.editApplicantInfoFormGroup.get('convictionDetail').value ? this.editApplicantInfoFormGroup.get('convictionDetail').value.trim() : "";
        applicantInfoModel.DateOfBirth = this.editApplicantInfoFormGroup.get('dateOfBirth').value == "" ? null : this.getUTCFormatedDate(this.editApplicantInfoFormGroup.get('dateOfBirth').value);
        applicantInfoModel.Gender = this.editApplicantInfoFormGroup.get('gender').value;
        applicantInfoModel.CountryOfBirth = this.editApplicantInfoFormGroup.get('countryOfBirth').value.CountryName;
        applicantInfoModel.CountryFromApplied = this.editApplicantInfoFormGroup.get('countryFromApplied').value.CountryName;

        this.isLoading = true;
        this.editApplicantInfoService.updateApplicantInfo(applicantInfoModel)
            .subscribe(result => {
                if (result.status === 200) {
                    this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: 'Applicant info has been saved' });
                }
                else {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update applicant info', detail: '' });
                }
            },
                err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update applicant info', detail: '' }); },
                () => { this.isLoading = false; })
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

    getBooleanValue(value: string): boolean {
        return value.toLowerCase() === "yes" ? true : false;
    }

    checkNullOrUndefined(value) {
        if (value) {
            return value;
        }
        return '';
    }

    setRadioButtonData(value) {
        if (value == undefined || value == null) {
            return ''
        }
        return value.toString() == 'true' ? "YES" : "NO";
    }

    onClear() {
        this.editApplicantInfoFormGroup.patchValue({
            lastName: '',
            firstName: '',
            middleName: '',
            streetAddress: '',
            apartment: '',
            zipCode: '',
            city: '',
            state: '',
            phone: '',
            dateOfBirth: '',
            gender: '',
            countryOfBirth: '',
            countryFromApplied: '',
            ssn: '',
            dateAvailable: '',
            desiredSalary: '',
            positionAppliedFor: '',
            isUSCitizen: '',
            isAuthorized: '',
            isOldClient: '',
            isConvict: '',
            convictionDetail: ''
        });
        this.editApplicantInfoFormGroup.controls['convictionDetail'].disable();
    }

    onIsConvictChange($event) {
        if ($event.target.value != 'YES') {
            this.editApplicantInfoFormGroup.patchValue({ convictionDetail: '' });
            this.editApplicantInfoFormGroup.controls['convictionDetail'].disable();
        }
        else {
            this.editApplicantInfoFormGroup.controls['convictionDetail'].enable();
        }
    }

    onZipCodeSearch($event) {
        this.editApplicantInfoService.getZipCodeCityStateByZipCode($event.query).subscribe(data => {
            this.zipCodeResults = data.body.Data;
            //console.log(this.zipCodeResults);
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get zip code', detail: '' }); },
            () => { });
    }

    onPositionSearch($event) {
        this.editApplicantInfoService.getPositionByPositionName($event.query).subscribe(data => {
            this.positionResults = data.body.Data;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get position', detail: '' }); },
            () => { });
    }

    onZipCodeSelect($event) {
        this.editApplicantInfoFormGroup.patchValue({
            //zipCode: $event.ZipCode,
            city: $event.City,
            state: $event.StateName
        });
    }

    onPositionSelect($event) {
        this.editApplicantInfoFormGroup.patchValue({
            positionAppliedForId: $event.Value
        });
    }

    countrySearch($event) {
        this.editApplicantInfoService.getCountryName($event.query).subscribe(data => {
            //console.log(data.body.Data);
            this.countryNames = data.body.Data;
        });
    }
    onIsUSCitizenChange($event) {
        if ($event.target.value == 'YES') {
            //this.editApplicantInfoFormGroup.controls['ssn'].enable();
            this.editApplicantInfoFormGroup.patchValue({ isAuthorized: 'YES' });
            this.editApplicantInfoFormGroup.controls['isAuthorized'].disable();
        }
        else if ($event.target.value == 'NO') {
            this.editApplicantInfoFormGroup.patchValue({ isAuthorized: '' });
            this.editApplicantInfoFormGroup.controls['isAuthorized'].enable();
            //this.editApplicantInfoFormGroup.patchValue({ ssn: '' });
            //this.editApplicantInfoFormGroup.controls['ssn'].disable();
        }
        else {
            this.editApplicantInfoFormGroup.patchValue({ isAuthorized: '' });
            this.editApplicantInfoFormGroup.controls['isAuthorized'].disable();
            //this.editApplicantInfoFormGroup.patchValue({ ssn: '' });
            //this.editApplicantInfoFormGroup.controls['ssn'].disable();
        }
    }
}

