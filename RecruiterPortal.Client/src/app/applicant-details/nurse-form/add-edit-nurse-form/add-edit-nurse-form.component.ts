import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../../common/services/storage.service';
import { AddEditNurseFormModel } from '../nurse-form.model';
import { NurseFormService } from '../nurse-form.service';

@Component({
    selector: 'app-add-edit-nurse-form',
    templateUrl: './add-edit-nurse-form.component.html',
    styleUrls: ['./add-edit-nurse-form.component.css']
})
export class AddEditNurseFormComponent implements OnInit {

    public isLoading: boolean;
    public submitted: boolean;
    public addEditNurseFormGroup: FormGroup;
    public nurseForm: any = {};
    public nurseFormId: number = null;

    constructor(private fb: FormBuilder,
        private nurseFormService: NurseFormService,
        private messageService: MessageService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private storageService: StorageService
    ) { }

    ngOnInit() {
        this.createNurseFormGroup();
        this.addEditNurseFormGroup.controls.cgfnsExaminationDate.disable();
        this.addEditNurseFormGroup.controls.cgfnsCertificateNumber.disable();
        this.addEditNurseFormGroup.controls.cnatsExaminationDate.disable();
        this.addEditNurseFormGroup.controls.cnatsExamScore.disable();
        this.getNurseFormByApplicantId();
    }

    createNurseFormGroup() {
        this.addEditNurseFormGroup = this.fb.group({
            applyingForJobType: '',
            applyingForPosition: '',
            licensedJurisdiction: '',
            failedRNLicensing: '',
            failedPNLicensing: '',
            cgfnscnatsCompleted: '',
            cgfnsExaminationDate: '',
            cgfnsCertificateNumber: ['', Validators.compose([Validators.maxLength(500)])],
            cnatsExaminationDate: '',
            cnatsExamScore: ['', Validators.compose([Validators.maxLength(500)])],
            nursingSchoolAttended: ['', Validators.compose([Validators.maxLength(500)])],
            nursingSchoolAddress: ['', Validators.compose([Validators.maxLength(500)])],
            nursingSchoolCompletedDate: '',
            permitteesName: ['', Validators.compose([Validators.maxLength(500)])],
            rnlpnEmployed: '',
            employerName: ['', Validators.compose([Validators.maxLength(500)])],
            employerStreetAddress: ['', Validators.compose([Validators.maxLength(500)])],
            employerCity: ['', Validators.compose([Validators.maxLength(500)])],
            employerStateProvince: ['', Validators.compose([Validators.maxLength(500)])],
            employerZipCode: ['', Validators.compose([Validators.maxLength(500)])],
            employerCountry: ['', Validators.compose([Validators.maxLength(500)])],
            employerTelephone: ['', Validators.compose([Validators.maxLength(500)])],
            employerFax: ['', Validators.compose([Validators.maxLength(500)])],
            employerEmail: ['', Validators.compose([Validators.maxLength(500)])],
            practiceName: ['', Validators.compose([Validators.maxLength(500)])],
            practiceStreetAddress: ['', Validators.compose([Validators.maxLength(500)])],
            practiceCity: ['', Validators.compose([Validators.maxLength(500)])],
            practiceStateProvince: ['', Validators.compose([Validators.maxLength(500)])],
            practiceZipCode: ['', Validators.compose([Validators.maxLength(500)])],
            practiceCountry: ['', Validators.compose([Validators.maxLength(500)])],
            practiceTelephone: ['', Validators.compose([Validators.maxLength(500)])],
            practiceFax: ['', Validators.compose([Validators.maxLength(500)])],
            practiceEmail: ['', Validators.compose([Validators.maxLength(500)])],
            registeredProfessionalNurse: ['', Validators.compose([Validators.maxLength(500)])],
            newYorkStateLicenseNumber1: ['', Validators.compose([Validators.maxLength(500)])],
            newYorkStateLicenseNumber2: ['', Validators.compose([Validators.maxLength(500)])],
            signatureBehalfEmployer: ['', Validators.compose([Validators.maxLength(500)])],
            signatureDate: '',
            printName: ['', Validators.compose([Validators.maxLength(500)])],
            title: ['', Validators.compose([Validators.maxLength(500)])],
            newYorkStateProfession: ['', Validators.compose([Validators.maxLength(500)])],
            newYorkStateProfessionalLicenseNumber: ['', Validators.compose([Validators.maxLength(500)])],
        });
    }

    getNurseFormByApplicantId() {
        this.isLoading = true;
        this.nurseFormService.getNurseFormByApplicantId(this.storageService.getApplicantId)
            .subscribe(data => {
                if (data.status === 200 && data.body) {
                    this.nurseForm = data.body;
                    this.nurseFormId = this.nurseForm.nurseFormID ? +this.nurseForm.nurseFormID : null;
                    this.fillUpNurseForm();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get nurse form', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    fillUpNurseForm() {
        this.addEditNurseFormGroup.setValue({
            applyingForJobType: '',
            applyingForPosition: '',
            licensedJurisdiction: '',
            failedRNLicensing: '',
            failedPNLicensing: '',
            cgfnscnatsCompleted: this.checkNullOrUndefined(this.nurseForm.cgfnscnatsCompleted),
            cgfnsExaminationDate: this.nurseForm.cgfnsExaminationDate ? new Date(this.nurseForm.cgfnsExaminationDate) : null,
            cgfnsCertificateNumber: this.checkNullOrUndefined(this.nurseForm.cgfnsCertificateNumber),
            cnatsExaminationDate: this.nurseForm.cnatsExaminationDate ? new Date(this.nurseForm.cnatsExaminationDate) : null,
            cnatsExamScore: this.checkNullOrUndefined(this.nurseForm.cnatsExamScore),
            nursingSchoolAttended: this.checkNullOrUndefined(this.nurseForm.nursingSchoolAttended),
            nursingSchoolAddress: this.checkNullOrUndefined(this.nurseForm.nursingSchoolAddress),
            nursingSchoolCompletedDate: this.nurseForm.nursingSchoolCompletedDate ? new Date(this.nurseForm.nursingSchoolCompletedDate) : null,
            permitteesName: this.checkNullOrUndefined(this.nurseForm.permitteesName),
            rnlpnEmployed: this.checkNullOrUndefined(this.nurseForm.rnlpnEmployed),
            employerName: this.checkNullOrUndefined(this.nurseForm.employerName),
            employerStreetAddress: this.checkNullOrUndefined(this.nurseForm.employerStreetAddress),
            employerCity: this.checkNullOrUndefined(this.nurseForm.employerCity),
            employerStateProvince: this.checkNullOrUndefined(this.nurseForm.employerStateProvince),
            employerZipCode: this.checkNullOrUndefined(this.nurseForm.employerZipCode),
            employerCountry: this.checkNullOrUndefined(this.nurseForm.employerCountry),
            employerTelephone: this.checkNullOrUndefined(this.nurseForm.employerTelephone),
            employerFax: this.checkNullOrUndefined(this.nurseForm.employerFax),
            employerEmail: this.checkNullOrUndefined(this.nurseForm.employerEmail),
            practiceName: this.checkNullOrUndefined(this.nurseForm.practiceName),
            practiceStreetAddress: this.checkNullOrUndefined(this.nurseForm.practiceStreetAddress),
            practiceCity: this.checkNullOrUndefined(this.nurseForm.practiceCity),
            practiceStateProvince: this.checkNullOrUndefined(this.nurseForm.practiceStateProvince),
            practiceZipCode: this.checkNullOrUndefined(this.nurseForm.practiceZipCode),
            practiceCountry: this.checkNullOrUndefined(this.nurseForm.practiceCountry),
            practiceTelephone: this.checkNullOrUndefined(this.nurseForm.practiceTelephone),
            practiceFax: this.checkNullOrUndefined(this.nurseForm.practiceFax),
            practiceEmail: this.checkNullOrUndefined(this.nurseForm.practiceEmail),
            registeredProfessionalNurse: this.checkNullOrUndefined(this.nurseForm.registeredProfessionalNurse),
            newYorkStateLicenseNumber1: this.checkNullOrUndefined(this.nurseForm.newYorkStateLicenseNumber1),
            newYorkStateLicenseNumber2: this.checkNullOrUndefined(this.nurseForm.newYorkStateLicenseNumber2),
            signatureBehalfEmployer: this.checkNullOrUndefined(this.nurseForm.signatureBehalfEmployer),
            signatureDate: this.nurseForm.signatureDate ? new Date(this.nurseForm.signatureDate) : null,
            printName: this.checkNullOrUndefined(this.nurseForm.printName),
            title: this.checkNullOrUndefined(this.nurseForm.title),
            newYorkStateProfession: this.checkNullOrUndefined(this.nurseForm.newYorkStateProfession),
            newYorkStateProfessionalLicenseNumber: this.checkNullOrUndefined(this.nurseForm.newYorkStateProfessionalLicenseNumber)
        });

        if (this.nurseForm.licensedJurisdiction) {
            if (this.nurseForm.licensedJurisdiction === 'True') {
                this.addEditNurseFormGroup.controls.licensedJurisdiction.setValue('Yes');
            }
            else {
                this.addEditNurseFormGroup.controls.licensedJurisdiction.setValue('No');
            }
        }
        if (this.nurseForm.failedRNLicensing) {
            if (this.nurseForm.failedRNLicensing === 'True') {
                this.addEditNurseFormGroup.controls.failedRNLicensing.setValue('Yes');
            }
            else {
                this.addEditNurseFormGroup.controls.failedRNLicensing.setValue('No');
            }
        }
        if (this.nurseForm.failedPNLicensing) {
            if (this.nurseForm.failedPNLicensing === 'True') {
                this.addEditNurseFormGroup.controls.failedPNLicensing.setValue('Yes');
            }
            else {
                this.addEditNurseFormGroup.controls.failedPNLicensing.setValue('No');
            }
        }
        if (this.nurseForm.applyingForJobType) {
            if (this.nurseForm.applyingForJobType === 'True') {
                this.addEditNurseFormGroup.controls.applyingForJobType.setValue('Yes');
            }
            else {
                this.addEditNurseFormGroup.controls.applyingForJobType.setValue('No');
            }
        }
        if (this.nurseForm.applyingForPosition) {
            if (this.nurseForm.applyingForPosition === '1') {
                this.addEditNurseFormGroup.controls.applyingForPosition.setValue('1');
            }
            else if (this.nurseForm.applyingForPosition === '2') {
                this.addEditNurseFormGroup.controls.applyingForPosition.setValue('2');
            }
            else if (this.nurseForm.applyingForPosition === '3') {
                this.addEditNurseFormGroup.controls.applyingForPosition.setValue('3');
            }
        }
        if (this.nurseForm.cgfnsExaminationDate || this.nurseForm.cgfnsCertificateNumber) {
            this.addEditNurseFormGroup.controls.cgfnscnatsCompleted.setValue('CGFNS');
            this.onCgfnscnatsCompletedChange('CGFNS');
        }
        else if (this.nurseForm.cnatsExaminationDate || this.nurseForm.cnatsExamScore) {
            this.addEditNurseFormGroup.controls.cgfnscnatsCompleted.setValue('CNATS');
            this.onCgfnscnatsCompletedChange('CNATS');
        }
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

    isEmptyField(): boolean {
        let isEmpty: boolean = true;
        if (this.addEditNurseFormGroup.controls.applyingForJobType.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.applyingForPosition.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.licensedJurisdiction.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.failedRNLicensing.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.failedPNLicensing.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.cgfnscnatsCompleted.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.cgfnsExaminationDate.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.cgfnsCertificateNumber.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.cnatsExaminationDate.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.cnatsExamScore.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.nursingSchoolAttended.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.nursingSchoolAddress.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.nursingSchoolCompletedDate.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.permitteesName.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.rnlpnEmployed.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerName.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerStreetAddress.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerCity.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerStateProvince.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerZipCode.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerCountry.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerTelephone.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerFax.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.employerEmail.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceName.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceStreetAddress.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceCity.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceStateProvince.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceZipCode.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceCountry.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceTelephone.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceFax.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.practiceEmail.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.registeredProfessionalNurse.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.newYorkStateLicenseNumber1.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.newYorkStateLicenseNumber2.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.signatureBehalfEmployer.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.signatureDate.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.printName.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.title.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.newYorkStateProfession.value) {
            isEmpty = false;
        }
        if (this.addEditNurseFormGroup.controls.newYorkStateProfessionalLicenseNumber.value) {
            isEmpty = false;
        }
        return isEmpty;
    }

    onCgfnscnatsCompletedChange(value) {
        if (value === 'CGFNS') {
            this.addEditNurseFormGroup.controls.cgfnsExaminationDate.enable();
            this.addEditNurseFormGroup.controls.cgfnsCertificateNumber.enable();
            this.addEditNurseFormGroup.controls.cnatsExaminationDate.setValue('');
            this.addEditNurseFormGroup.controls.cnatsExamScore.setValue('');
            this.addEditNurseFormGroup.controls.cnatsExaminationDate.disable();
            this.addEditNurseFormGroup.controls.cnatsExamScore.disable();
        }
        else if (value === 'CNATS') {
            this.addEditNurseFormGroup.controls.cgfnsExaminationDate.setValue('');
            this.addEditNurseFormGroup.controls.cgfnsCertificateNumber.setValue('');
            this.addEditNurseFormGroup.controls.cgfnsExaminationDate.disable();
            this.addEditNurseFormGroup.controls.cgfnsCertificateNumber.disable();
            this.addEditNurseFormGroup.controls.cnatsExaminationDate.enable();
            this.addEditNurseFormGroup.controls.cnatsExamScore.enable();
        }
    }

    onSubmit() {

        if (this.isEmptyField()) {
            this.messageService.add({ key: 'toastKey1', severity: 'warn', summary: 'Please fill at least one field', detail: '' });
            return;
        }
        else {
            const nurseFormModel = new AddEditNurseFormModel();
            nurseFormModel.userId = this.storageService.getApplicantId;
            nurseFormModel.nurseFormID = this.nurseFormId;
            if (this.addEditNurseFormGroup.controls.applyingForJobType.value) {
                if (this.addEditNurseFormGroup.controls.applyingForJobType.value === "Yes") {
                    nurseFormModel.applyingForJobType = 'true';
                }
                else if (this.addEditNurseFormGroup.controls.applyingForJobType.value === "No") {
                    nurseFormModel.applyingForJobType = 'false';
                }
            }
            nurseFormModel.applyingForPosition = this.addEditNurseFormGroup.controls.applyingForPosition.value;
            if (this.addEditNurseFormGroup.controls.licensedJurisdiction.value) {
                if (this.addEditNurseFormGroup.controls.licensedJurisdiction.value === "Yes") {
                    nurseFormModel.licensedJurisdiction = 'true';
                }
                else if (this.addEditNurseFormGroup.controls.licensedJurisdiction.value === "No") {
                    nurseFormModel.licensedJurisdiction = 'false';
                }
            }
            if (this.addEditNurseFormGroup.controls.failedRNLicensing.value) {
                if (this.addEditNurseFormGroup.controls.failedRNLicensing.value === "Yes") {
                    nurseFormModel.failedRNLicensing = 'true';
                }
                else if (this.addEditNurseFormGroup.controls.failedRNLicensing.value === "No") {
                    nurseFormModel.failedRNLicensing = 'false';
                }
            }
            if (this.addEditNurseFormGroup.controls.failedPNLicensing.value) {
                if (this.addEditNurseFormGroup.controls.failedPNLicensing.value === "Yes") {
                    nurseFormModel.failedPNLicensing = 'true';
                }
                else if (this.addEditNurseFormGroup.controls.failedPNLicensing.value === "No") {
                    nurseFormModel.failedPNLicensing = 'false';
                }
            }
            nurseFormModel.cgfnscnatsCompleted = this.addEditNurseFormGroup.controls.cgfnscnatsCompleted.value;
            nurseFormModel.cgfnsExaminationDate = this.addEditNurseFormGroup.controls.cgfnsExaminationDate.value ? new Date(this.addEditNurseFormGroup.controls.cgfnsExaminationDate.value).toLocaleString() : null;
            nurseFormModel.cgfnsCertificateNumber = this.addEditNurseFormGroup.controls.cgfnsCertificateNumber.value;
            nurseFormModel.cnatsExaminationDate = this.addEditNurseFormGroup.controls.cnatsExaminationDate.value ? new Date(this.addEditNurseFormGroup.controls.cnatsExaminationDate.value).toLocaleString() : null;
            nurseFormModel.cnatsExamScore = this.addEditNurseFormGroup.controls.cnatsExamScore.value;
            nurseFormModel.nursingSchoolAttended = this.addEditNurseFormGroup.controls.nursingSchoolAttended.value;
            nurseFormModel.nursingSchoolAddress = this.addEditNurseFormGroup.controls.nursingSchoolAddress.value;
            nurseFormModel.nursingSchoolCompletedDate = this.addEditNurseFormGroup.controls.nursingSchoolCompletedDate.value ? new Date(this.addEditNurseFormGroup.controls.nursingSchoolCompletedDate.value).toLocaleString() : null;
            nurseFormModel.permitteesName = this.addEditNurseFormGroup.controls.permitteesName.value;
            nurseFormModel.rnlpnEmployed = this.addEditNurseFormGroup.controls.rnlpnEmployed.value;
            nurseFormModel.employerName = this.addEditNurseFormGroup.controls.employerName.value;
            nurseFormModel.employerStreetAddress = this.addEditNurseFormGroup.controls.employerStreetAddress.value;
            nurseFormModel.employerCity = this.addEditNurseFormGroup.controls.employerCity.value;
            nurseFormModel.employerStateProvince = this.addEditNurseFormGroup.controls.employerStateProvince.value;
            nurseFormModel.employerZipCode = this.addEditNurseFormGroup.controls.employerZipCode.value;
            nurseFormModel.employerCountry = this.addEditNurseFormGroup.controls.employerCountry.value;
            nurseFormModel.employerTelephone = this.addEditNurseFormGroup.controls.employerTelephone.value;
            nurseFormModel.employerFax = this.addEditNurseFormGroup.controls.employerFax.value;
            nurseFormModel.employerEmail = this.addEditNurseFormGroup.controls.employerEmail.value;
            nurseFormModel.practiceName = this.addEditNurseFormGroup.controls.practiceName.value;
            nurseFormModel.practiceStreetAddress = this.addEditNurseFormGroup.controls.practiceStreetAddress.value;
            nurseFormModel.practiceCity = this.addEditNurseFormGroup.controls.practiceCity.value;
            nurseFormModel.practiceStateProvince = this.addEditNurseFormGroup.controls.practiceStateProvince.value;
            nurseFormModel.practiceZipCode = this.addEditNurseFormGroup.controls.practiceZipCode.value;
            nurseFormModel.practiceCountry = this.addEditNurseFormGroup.controls.practiceCountry.value;
            nurseFormModel.practiceTelephone = this.addEditNurseFormGroup.controls.practiceTelephone.value;
            nurseFormModel.practiceFax = this.addEditNurseFormGroup.controls.practiceFax.value;
            nurseFormModel.practiceEmail = this.addEditNurseFormGroup.controls.practiceEmail.value;
            nurseFormModel.registeredProfessionalNurse = this.addEditNurseFormGroup.controls.registeredProfessionalNurse.value;
            nurseFormModel.newYorkStateLicenseNumber1 = this.addEditNurseFormGroup.controls.newYorkStateLicenseNumber1.value;
            nurseFormModel.newYorkStateLicenseNumber2 = this.addEditNurseFormGroup.controls.newYorkStateLicenseNumber2.value;
            nurseFormModel.signatureBehalfEmployer = this.addEditNurseFormGroup.controls.signatureBehalfEmployer.value;
            nurseFormModel.signatureDate = this.addEditNurseFormGroup.controls.signatureDate.value ? new Date(this.addEditNurseFormGroup.controls.signatureDate.value).toLocaleString() : null;;
            nurseFormModel.printName = this.addEditNurseFormGroup.controls.printName.value;
            nurseFormModel.title = this.addEditNurseFormGroup.controls.title.value;
            nurseFormModel.newYorkStateProfession = this.addEditNurseFormGroup.controls.newYorkStateProfession.value;
            nurseFormModel.newYorkStateProfessionalLicenseNumber = this.addEditNurseFormGroup.controls.newYorkStateProfessionalLicenseNumber.value;

            this.isLoading = true;
            this.nurseFormService.save(nurseFormModel)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.router.navigate(['/nurse-form/']);
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update Nurse Form', detail: '' });
                    }
                },
                    err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update Nurse Form', detail: '' }); },
                    () => { this.isLoading = false; })
        }
    }

    onClear() {
        this.addEditNurseFormGroup.setValue({
            applyingForJobType: '',
            applyingForPosition: '',
            licensedJurisdiction: '',
            failedRNLicensing: '',
            failedPNLicensing: '',
            cgfnscnatsCompleted: '',
            cgfnsExaminationDate: '',
            cgfnsCertificateNumber: '',
            cnatsExaminationDate: '',
            cnatsExamScore: '',
            nursingSchoolAttended: '',
            nursingSchoolAddress: '',
            nursingSchoolCompletedDate: '',
            permitteesName: '',
            rnlpnEmployed: '',
            employerName: '',
            employerStreetAddress: '',
            employerCity: '',
            employerStateProvince: '',
            employerZipCode: '',
            employerCountry: '',
            employerTelephone: '',
            employerFax: '',
            employerEmail: '',
            practiceName: '',
            practiceStreetAddress: '',
            practiceCity: '',
            practiceStateProvince: '',
            practiceZipCode: '',
            practiceCountry: '',
            practiceTelephone: '',
            practiceFax: '',
            practiceEmail: '',
            registeredProfessionalNurse: '',
            newYorkStateLicenseNumber1: '',
            newYorkStateLicenseNumber2: '',
            signatureBehalfEmployer: '',
            signatureDate: '',
            printName: '',
            title: '',
            newYorkStateProfession: '',
            newYorkStateProfessionalLicenseNumber: ''
        });
    }

}
