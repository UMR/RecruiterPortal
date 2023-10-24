import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IdentificationInfoService } from '../identification-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumFileType } from '../../upload-file/upload-file.model';
import { CompareValidator } from '../../../common/directives/compare-validator.directive';
import { StorageService } from '../../../common/services/storage.service';

@Component({
    selector: 'app-add-edit-identification-info',
    templateUrl: './add-edit-identification-info.component.html',
    styleUrls: ['./add-edit-identification-info.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class AddEditIdentificationInfoComponent implements OnInit {

    public isLoading: boolean = false;
    public licenseFormGroup: FormGroup;
    public userLicense: any = {};
    public licenseId: number;
    private licenseFile: string;
    public uploadedFile: any;
    public minDateValue: Date = new Date();
    public issuingAuthorityResults: string[];
    public documentNumberLabel: string = 'Document Number';
    public idTypes: any[] = [
        'U.S. Passport or U.S. Passport Card',
        'Permanent Resident Card',
        'Alien Registration Receipt Card',
        'Foreign passport with temporary I-551',
        'Employment Authorization Document',
        'Form I-94 or Form I-94A',
        'Driver\'s license or ID card',
        'School ID card',
        'Voter\'s registration card',
        'U.S. Military card or draft record',
        'Voter\'s registration card',
        'U.S. Coast Guard Merchant Mariner Card',
        'School record or report card',
        'Clinic, doctor, or hospital record',
        'Day-care or nursery school record',
        'SSN',
        'Birth Certificate',
        'Identification Card for Use of Resident Citizen in US (Form I-179)',
        'Employment authorization document of Homeland Security',
        'Other License'
    ];

    constructor(private fb: FormBuilder, private licenseService: IdentificationInfoService,
        private router: Router, private activeRoute: ActivatedRoute,
        private messageService: MessageService, private storageService: StorageService) { }

    ngOnInit() {
        this.activeRoute.paramMap.subscribe(params => {
            if (params.get('id')) {
                this.licenseId = +params.get('id');
                this.getUserLicenseById(this.licenseId);
            }
        });
        this.createLicenseForm();
    }

    onChangeIdType(event) {
        this.licenseFormGroup.controls.licenseName.setValue('');
        this.licenseFormGroup.controls.licenseNo.setValue('');

        if (event.target.value == 'Other License') {
            this.documentNumberLabel = 'License Number';
            this.licenseFormGroup.controls.licenseName.setValidators([Validators.required]);
            this.licenseFormGroup.controls.licenseName.updateValueAndValidity();
        } else {
            this.documentNumberLabel = 'Document Number';
            this.licenseFormGroup.controls.licenseName.clearValidators();
            this.licenseFormGroup.controls.licenseName.updateValueAndValidity();
        }

    }

    onChangeIdTypeA(event) {
        if (event.target.value) {
            this.licenseFormGroup.controls.idTypeB.clearValidators();
            this.licenseFormGroup.controls.idTypeB.updateValueAndValidity();
            this.licenseFormGroup.controls.idTypeC.clearValidators();
            this.licenseFormGroup.controls.idTypeC.updateValueAndValidity();
        }
    }

    onChangeIdTypeB(event) {
        if (event.target.value) {
            this.licenseFormGroup.controls.idTypeC.setValue('');
            this.licenseFormGroup.controls.idTypeC.setValidators([Validators.required]);
            this.licenseFormGroup.controls.idTypeC.updateValueAndValidity();
            this.licenseFormGroup.controls.idTypeA.clearValidators();
            this.licenseFormGroup.controls.idTypeA.updateValueAndValidity();
        } else {
            this.licenseFormGroup.controls.idTypeC.setValue('');
            this.licenseFormGroup.controls.idTypeC.clearValidators();
            this.licenseFormGroup.controls.idTypeC.updateValueAndValidity();
            this.licenseFormGroup.controls.idTypeA.setValidators([Validators.required]);
            this.licenseFormGroup.controls.idTypeA.updateValueAndValidity();
        }
    }

    onFileSelect(event) {
        if (event.files.length > 0) {
            if (!event.files[0].type.includes("image/") && !event.files[0].type.includes("application/pdf") && !event.files[0].type.includes("application/msword") && !event.files[0].type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file type', detail: 'Upload file' });
            } else if (event.files[0].size > 5000000) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file size', detail: 'File size limit: 5MB' });
            } else {
                this.uploadedFile = event.files[0];
                this.licenseFormGroup.get('fileName').setValue(event.files[0].name);
                let reader = new FileReader();
                reader.readAsDataURL(event.files[0]);
                reader.onloadend = () => {
                    this.licenseFile = reader.result.toString().split(',')[1];
                }
            }
        }
    }

    createLicenseForm() {
        this.licenseFormGroup = this.fb.group({
            idTypeA: [''],
            idTypeB: [''],
            idTypeC: [''],
            licenseNo: ['', [Validators.maxLength(50)]],
            fileName: [''],
            issueDate: ['', [new CompareValidator('expiryDate', '<', 'true')]],
            expiryDate: ['', [new CompareValidator('issueDate', '>', 'true')]],
            issuingAuthority: ['', Validators.maxLength(50)]
        });
    }

    noWhitespaceValidator(control: AbstractControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }

    getUserLicenseById(userLicenseId: number) {
        this.isLoading = true;
        this.licenseService.getUserLicenseById(userLicenseId)
            .subscribe(res => {                
                if (res.status === 200) {
                    this.userLicense = res.body;
                }
                else {
                    this.userLicense = {};
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user Identification information', detail: '' });
                },
                () => {
                    this.fillUserLicense();
                    this.isLoading = false;
                });
    }

    fillUserLicense() {        
        this.licenseFormGroup.patchValue({
            idTypeA: this.userLicense.LicenseNameA,
            idTypeB: this.userLicense.LicenseNameB,
            idTypeC: this.userLicense.LicenseNameC,
            licenseNo: this.checkNullOrUndefined(this.userLicense.LicenseNo),
            issueDate: this.userLicense.IssuedDate ? new Date(this.userLicense.IssuedDate) : null,
            expiryDate: this.userLicense.ExpiryDate ? new Date(this.userLicense.ExpiryDate) : null,
            fileName: this.checkNullOrUndefined(this.userLicense.FileName),
            issuingAuthority: { IssueAuthority: this.checkNullOrUndefined(this.userLicense.IssueAuthority) }
        });
        this.licenseFormGroup.controls.idTypeB.setValue(this.userLicense.LicenseNameB);
        this.licenseFormGroup.controls.idTypeC.setValue(this.userLicense.LicenseNameC);
        this.licenseFile = this.userLicense.FIleData;
        this.uploadedFile = { ...this.uploadedFile, name: this.userLicense.FileName };    
    }

    checkNullOrUndefined(value) {
        if (value) {
            return value;
        }
        return '';
    }

    isIdTypeSelected() {
        if (this.licenseFormGroup.controls.idTypeA.value == '' && this.licenseFormGroup.controls.idTypeB.value == '') {
            return true;
        }
    }

    onSave() {
        if (this.licenseFormGroup.controls.idTypeA.value == '' && this.licenseFormGroup.controls.idTypeB.value == '') {
            this.messageService.add({ key: 'toastKey1', severity: 'info', summary: 'Document Type A or Document Type B is required.', detail: '' });
            return false;
        }
        let model = {
            userID: this.storageService.getApplicantId,
            licenseID: this.userLicense.LicenseID ? this.userLicense.LicenseID : 0,
            licenseNameA: this.licenseFormGroup.get('idTypeA').value,
            licenseNameB: this.licenseFormGroup.get('idTypeB').value,
            licenseNameC: this.licenseFormGroup.get('idTypeC').value,
            licenseNo: this.licenseFormGroup.get('licenseNo').value,
            expiryDate: this.licenseFormGroup.get('expiryDate').value ? this.licenseFormGroup.get('expiryDate').value.toLocaleString() : null,
            issuedDate: this.licenseFormGroup.get('issueDate').value ? this.licenseFormGroup.get('issueDate').value.toLocaleString() : null,
            fileData: this.licenseFile,
            fileName: this.licenseFormGroup.get('fileName').value,
            fileType: EnumFileType.PassportSsnTin,
            issueAuthority: this.licenseFormGroup.get('issuingAuthority').value ? this.licenseFormGroup.get('issuingAuthority').value.IssueAuthority : "",
            stateCode: ""
        };        
        if (this.licenseId) {
            this.isLoading = true;
            this.licenseService.update(model).subscribe(() => {
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Identification information has been updated successfully', detail: '' });
            }, error => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update Identification information', detail: '' });
            },
                () => {
                    this.isLoading = false;
                    this.router.navigate(['/identification-info']);
                });
        }
        else {
            this.isLoading = true;
            this.licenseService.save(model).subscribe(() => {
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'License information has been added successfully', detail: '' });
            }, error => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save license information', detail: '' });
            },
                () => {
                    this.isLoading = false;
                    this.router.navigate(['/identification-info']);
                });
        }
    }

    onClear() {
        this.licenseFormGroup.get('idTypeA').setValue('');
        this.licenseFormGroup.get('idTypeB').setValue('');
        this.licenseFormGroup.get('idTypeC').setValue('');
        this.licenseFormGroup.get('licenseNo').setValue('');
        this.licenseFormGroup.get('expiryDate').setValue('');
        this.licenseFormGroup.get('issueDate').setValue('');
        this.licenseFormGroup.get('fileName').setValue('');
        this.licenseFormGroup.get('issuingAuthority').setValue('');
        this.licenseFile = null;
        this.uploadedFile = null;
    }

    onIssuingAuthoritySearch($event) {
        this.licenseService.getIssueingAuthorityByText($event.query).subscribe(res => {            
            if (res.status === 200) {                
                this.issuingAuthorityResults = res.body;                
            }
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get Issuing Authority', detail: '' }); },
            () => { });
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
}
