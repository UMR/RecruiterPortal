import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EditMilitaryService } from './edit-military.service';
import { CompareValidator } from '../../../../common/directives/compare-validator.directive';
import { StorageService } from '../../../../common/services/storage.service';
import { tick } from '@angular/core/testing';
import { applicantId } from '../../../../common/constants/auth-keys';


@Component({
    selector: 'app-edit-military',
    templateUrl: './edit-military.component.html',
    styleUrls: ['./edit-military.component.css']
})
export class EditMilitaryComponent implements OnInit {
    public isLoading: boolean = false;
    public militaryFormGroup: FormGroup;
    public userMilitary: any;
    private userMilitaryID: any;

    @ViewChild("trefDishonour", { static: false }) trefDishonour: ElementRef;

    constructor(private fb: FormBuilder,
        private editMilitaryService: EditMilitaryService,
        private router: Router,
        private messageService: MessageService,
        private service: StorageService
    ) { }

    ngOnInit() {
        this.createMilitaryForm();
        this.getUserMilitary();
    }

    createMilitaryForm() {
        this.militaryFormGroup = this.fb.group({
            branch: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(500)]],
            fromDate: ['', [Validators.required, new CompareValidator('toDate', '<', 'true')]],
            toDate: ['', [Validators.required, new CompareValidator('fromDate', '>', 'true')]],
            rankDischarge: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(150)]],
            typeDischarge: ['', Validators.required],
            dishonour: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(500)]]
        });
    }

    getUserMilitary() {
        this.isLoading = true;
        this.editMilitaryService.getUserMilitary(this.service.getApplicantId)
            .subscribe(data => {
                if (data.status === 200) {
                    this.userMilitary = data.body;
                    this.onDischargeChange();
                    this.fillUserMilitary();
                }
                else {
                    this.userMilitary = {};
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user military information', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
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

    fillUserMilitary() {
        if (this.userMilitary) {
            this.militaryFormGroup.get('branch').setValue(this.userMilitary.Branch);
            if (this.userMilitary.FromDate) {
                let fromDate = new Date(this.userMilitary.FromDate);
                this.militaryFormGroup.get('fromDate').setValue(fromDate);
            }
            if (this.userMilitary.ToDate) {
                let toDate = new Date(this.userMilitary.ToDate);
                this.militaryFormGroup.get('toDate').setValue(toDate);
            }
            this.militaryFormGroup.get('rankDischarge').setValue(this.userMilitary.RankAtDischarge);
            if (this.userMilitary.DischargeType == 0 || this.userMilitary.DischargeType == 1) {
                console.log('tr');
                let dischargeType = this.userMilitary.DischargeType ? 1 : 0;
                this.militaryFormGroup.get('typeDischarge').setValue(dischargeType);
            }

            if (this.militaryFormGroup.get('typeDischarge').value == 0) {
                this.trefDishonour.nativeElement.required = true;
                this.militaryFormGroup.controls['dishonour'].enable();
            }
            else {
                this.trefDishonour.nativeElement.required = false;
                this.militaryFormGroup.controls['dishonour'].disable();
            }
            this.militaryFormGroup.get('dishonour').setValue(this.userMilitary.DisonourComment);
        }
    }

    onSave() {
        console.log(this.userMilitary);
        if (this.userMilitary) {
            this.userMilitaryID = this.userMilitary.UserMilitaryID;
        }
        else {
            this.userMilitaryID = 0;
        }
        const model: any = {
            branch: this.militaryFormGroup.get('branch').value,
            userMilitaryID: this.userMilitaryID,
            fromDate: this.militaryFormGroup.get('fromDate').value ? new Date(this.militaryFormGroup.get('fromDate').value).toLocaleString() : '',
            toDate: this.militaryFormGroup.get('toDate').value ? new Date(this.militaryFormGroup.get('toDate').value).toLocaleString() : '',
            rankAtDischarge: this.militaryFormGroup.get('rankDischarge').value,
            dischargeType: +this.militaryFormGroup.get('typeDischarge').value,
            disonourComment: this.militaryFormGroup.get('dishonour').value,
            userId: this.service.getApplicantId
        };
        console.log(model);
        this.isLoading = true;
        this.editMilitaryService.save(model).subscribe(() => {
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: 'Military information has been saved' });
        }, error => {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to save military information' });
        },
            () => {
                this.isLoading = false;
            });
    }

    onDischargeChange() {
        if (this.militaryFormGroup.get('typeDischarge').value == '' || +this.militaryFormGroup.get('typeDischarge').value == 1) {
            this.militaryFormGroup.get('dishonour').setValidators(null);
            this.trefDishonour.nativeElement.required = false;
            this.militaryFormGroup.get('dishonour').setValue('');
            this.militaryFormGroup.controls['dishonour'].disable();
        }
        else if (+this.militaryFormGroup.get('typeDischarge').value == 0) {
            this.militaryFormGroup.get('dishonour').setValidators([Validators.required, Validators.maxLength(500)]);
            this.militaryFormGroup.get('dishonour').updateValueAndValidity();
            this.trefDishonour.nativeElement.required = true;
            this.militaryFormGroup.controls['dishonour'].enable();
        }
        this.militaryFormGroup.updateValueAndValidity();
    }

    onClear() {
        this.militaryFormGroup.get('branch').setValue('');
        this.militaryFormGroup.get('fromDate').setValue('');
        this.militaryFormGroup.get('toDate').setValue('');
        this.militaryFormGroup.get('rankDischarge').setValue('');
        this.militaryFormGroup.get('typeDischarge').setValue('');
        this.militaryFormGroup.get('dishonour').setValue('');
    }

    noWhitespaceValidator(control: AbstractControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }

    prevPage() {
        this.router.navigate(['personal-info/employment']);
    }

    nextPage() {
        this.router.navigate(['personal-info/reference']);
    }

}
