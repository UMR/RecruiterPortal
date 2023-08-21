import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../../../common/services/storage.service';
import { ReferenceService } from '../reference.service';

@Component({
    selector: 'app-add-edit-reference',
    templateUrl: './add-edit-reference.component.html',
    styleUrls: ['./add-edit-reference.component.css']
})
export class AddEditReferenceComponent implements OnInit {

    private emailRegEx = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    public isLoading: boolean = false;
    public refFormGroup: FormGroup;
    public userReferenceId: any;
    public userReference: any;

    constructor(private fb: FormBuilder, private messageService: MessageService, private referenceService: ReferenceService,
        private service: StorageService, private router: Router, private activeRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.activeRoute.paramMap.subscribe(params => {
            if (params.get('id')) {
                this.userReferenceId = + params.get('id');
                this.getUserReferenceById();
            }
        });
        this.createReferenceForm();
    }

    createReferenceForm() {
        this.refFormGroup = this.fb.group({
            lastName: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(30)]],
            middleName: ['', [this.noWhitespaceValidator, Validators.maxLength(30)]],
            firstName: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(30)]],
            referenceType: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(30)]],
            relationship: ['', [this.noWhitespaceValidator, Validators.maxLength(30)]],
            company: ['', [this.noWhitespaceValidator, Validators.maxLength(200)]],
            phone: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(25)]],
            email: ['', [this.noWhitespaceValidator, Validators.maxLength(50), Validators.pattern(this.emailRegEx)]],
            address: ['', [this.noWhitespaceValidator, Validators.maxLength(500)]]
        });
    }

    fillUserReference() {
        this.refFormGroup.get('lastName').setValue(this.userReference.RefLastName);
        this.refFormGroup.get('firstName').setValue(this.userReference.RefFirstName);
        this.refFormGroup.get('middleName').setValue(this.userReference.RefMiddleName);
        this.refFormGroup.get('referenceType').setValue(this.userReference.ReferenceType);
        this.refFormGroup.get('relationship').setValue(this.userReference.NatureOfRelationship);
        this.refFormGroup.get('company').setValue(this.userReference.CompanyName);
        this.refFormGroup.get('phone').setValue(this.userReference.RefPhone);
        this.refFormGroup.get('email').setValue(this.userReference.RefEmail);
        this.refFormGroup.get('address').setValue(this.userReference.RefAddress);
    }

    getUserReferenceById() {
        this.isLoading = true;
        this.referenceService.getUserReferenceById(this.userReferenceId)
            .subscribe(data => {
                if (data.status === 200) {
                    this.userReference = data.body;
                }
                else {
                    this.userReference = {};
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user reference information', detail: '' });
                },
                () => {
                    this.fillUserReference();
                    this.isLoading = false;
                });
    }

    onSave() {
        const model: any = {
            userReferenceID: this.userReferenceId ? +this.userReferenceId : 0,
            refLastName: this.refFormGroup.get('lastName').value,
            refFirstName: this.refFormGroup.get('firstName').value,
            refMiddleName: this.refFormGroup.get('middleName').value,
            referenceType: this.refFormGroup.get('referenceType').value,
            natureOfRelationship: this.refFormGroup.get('relationship').value,
            companyName: this.refFormGroup.get('company').value,
            refPhone: this.refFormGroup.get('phone').value,
            refEmail: this.refFormGroup.get('email').value,
            refAddress: this.refFormGroup.get('address').value,
            userID: this.service.getApplicantId
        };

        this.isLoading = true;
        this.referenceService.save(model).subscribe(() => {
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Reference information has been added successfully', detail: '' });
        }, error => {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save reference information', detail: '' });
        },
            () => {
                this.isLoading = false;
                this.router.navigate(['/personal-info/reference']);
            });
    }

    onClear() {
        this.refFormGroup.get('lastName').setValue('');
        this.refFormGroup.get('firstName').setValue('');
        this.refFormGroup.get('middleName').setValue('');
        this.refFormGroup.get('phone').setValue('');
        this.refFormGroup.get('email').setValue('');
        this.refFormGroup.get('referenceType').setValue('');
        this.refFormGroup.get('relationship').setValue('');
        this.refFormGroup.get('company').setValue('');
        this.refFormGroup.get('address').setValue('');
    }

    noWhitespaceValidator(control: AbstractControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }
}
