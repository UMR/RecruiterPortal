import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LicenseService } from '../license.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-license',
    templateUrl: './add-edit-license.component.html',
    styleUrls: ['./add-edit-license.component.css']
})
export class AddEditLicenseComponent implements OnInit {

    public isLoading: boolean = false;
    public licenseFormGroup: FormGroup;
    public userLicense: any = {};
    public licenseId: number;

    constructor(private fb: FormBuilder, private licenseService: LicenseService, private router: Router, private activeRoute: ActivatedRoute, private messageService: MessageService) { }

    ngOnInit() {
        this.activeRoute.paramMap.subscribe(params => {
            if (params.get('id')) {
                this.licenseId = +params.get('id');
                this.getUserLicenseById(this.licenseId);
            }
        });
        this.createLicenseForm();
    }

    createLicenseForm() {
        this.licenseFormGroup = this.fb.group({
            licenseName: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(200)]],
            licenseNo: ['', [Validators.maxLength(50)]],
            expiryDate: ['']            
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
                }
                else {
                    this.userLicense = {};
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user license information', detail: '' });
                },
                () => {
                    this.fillUserLicense();
                    this.isLoading = false;
                });
    }

    fillUserLicense() {
        this.licenseFormGroup.get('licenseName').setValue(this.userLicense.licenseName);
        this.licenseFormGroup.get('licenseNo').setValue(this.userLicense.licenseNo);
        if (this.userLicense.expiryDate) {
            let expiryDate = new Date(this.userLicense.expiryDate);
            this.licenseFormGroup.get('expiryDate').setValue(expiryDate);
        }
    }

    onSave() {        
        const model: any = {
            licenseID: this.userLicense.licenseID ? this.userLicense.licenseID : 0,
            licenseName: this.licenseFormGroup.get('licenseName').value,
            licenseNo: this.licenseFormGroup.get('licenseNo').value,
            expiryDate: this.licenseFormGroup.get('expiryDate').value            
        };
        
        if (this.licenseId) {
            this.isLoading = true;
            this.licenseService.update(model).subscribe(() => {
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'License information has been updated successfully', detail: '' });
            }, error => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update license information', detail: '' });
            },
                () => {
                    this.isLoading = false;
                    this.router.navigate(['/personal-info/license']);
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
                    this.router.navigate(['/personal-info/license']);
                });
        }
    }

    onClear() {
        this.licenseFormGroup.get('licenseName').setValue('');
        this.licenseFormGroup.get('licenseNo').setValue('');
        this.licenseFormGroup.get('expiryDate').setValue('');        
    }
}
