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
    public minDateValue: Date = new Date();
    public issuingAuthorityResults: string[];

    constructor(private fb: FormBuilder, private licenseService: IdentificationInfoService, private router: Router,
        private activeRoute: ActivatedRoute, private messageService: MessageService,
        private storageService: StorageService) { }

    ngOnInit() {
        this.activeRoute.paramMap.subscribe(params => {
            if (params.get('id')) {
                this.licenseId = +params.get('id');
                this.getUserLicenseById(this.licenseId);
            }
        });
        this.createLicenseForm();
    }

    onFileSelect(event) {
        if (event.files.length > 0) {
            if (!event.files[0].type.includes("image/") && !event.files[0].type.includes("application/pdf") && !event.files[0].type.includes("application/msword") && !event.files[0].type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file type', detail: 'Upload file' });
            } else if (event.files[0].size > 5000000) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file size', detail: 'File size limit: 5MB' });
            } else {
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
            idType: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(200)]],
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
            .subscribe(data => {
                if (data.status === 200) {
                    this.userLicense = data.body;
                    console.log(this.userLicense);
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
        this.licenseFormGroup.setValue({
            idType: this.checkNullOrUndefined(this.userLicense.LicenseName),
            licenseNo: this.checkNullOrUndefined(this.userLicense.LicenseNo),
            issueDate: this.userLicense.IssuedDate ? new Date(this.userLicense.IssuedDate) : null,
            expiryDate: this.userLicense.ExpiryDate ? new Date(this.userLicense.ExpiryDate) : null,
            fileName: this.checkNullOrUndefined(this.userLicense.FileName),
            issuingAuthority: { IssueAuthority: this.checkNullOrUndefined(this.userLicense.IssueAuthority) }
        });
    }

    checkNullOrUndefined(value) {
        if (value) {
            return value;
        }
        return '';
    }

    onSave() {
        const model: any = {
            LicenseID: this.userLicense.LicenseID ? this.userLicense.LicenseID : 0,
            LicenseName: this.licenseFormGroup.get('idType').value,
            LicenseNo: this.licenseFormGroup.get('licenseNo').value,
            ExpiryDate: this.licenseFormGroup.get('expiryDate').value ? this.licenseFormGroup.get('expiryDate').value.toLocaleString() : null,
            IssuedDate: this.licenseFormGroup.get('issueDate').value ? this.licenseFormGroup.get('issueDate').value.toLocaleString() : null,
            FIleData: this.licenseFile,
            FileName: this.licenseFormGroup.get('fileName').value,
            FileType: EnumFileType.PassportSsnTin,
            IssueAuthority: this.licenseFormGroup.get('issuingAuthority').value ? this.licenseFormGroup.get('issuingAuthority').value.IssueAuthority : "",
            StateCode: "",
            ApplicantID: this.storageService.getApplicantId
        };

        console.log(model);
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
        this.licenseFormGroup.get('idType').setValue('');
        this.licenseFormGroup.get('licenseNo').setValue('');
        this.licenseFormGroup.get('expiryDate').setValue('');
        this.licenseFormGroup.get('issueDate').setValue('');
        this.licenseFormGroup.get('fileName').setValue('');
        this.licenseFormGroup.get('issuingAuthority').setValue('');
    }

    onIssuingAuthoritySearch($event) {
        this.licenseService.getIssueingAuthorityByText($event.query).subscribe(data => {            
            //console.log(data.body.data);
            this.issuingAuthorityResults = data.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get Issuing Authority', detail: '' }); },
            () => { });
    }
}
