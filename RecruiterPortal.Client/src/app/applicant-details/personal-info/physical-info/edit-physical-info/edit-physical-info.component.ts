import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EditPhysicalInfoService } from './edit-physical-info.service';
import { StorageService } from '../../../../common/services/storage.service';

@Component({
    selector: 'app-edit-physical-info',
    templateUrl: './edit-physical-info.component.html',
    styleUrls: ['./edit-physical-info.component.css']
})
export class EditPhysicalInfoComponent implements OnInit {
    public isLoading: boolean = false;
    public physicalFormGroup: FormGroup;
    public userPhysical: any;
    public races: string[];
    public eyeColors: string[];
    public hairColors: string[];
    constructor(private fb: FormBuilder, private editPhysicalInfoService: EditPhysicalInfoService, private router: Router,
        private messageService: MessageService, private service: StorageService) { }

    ngOnInit() {
        this.createPhysicalInfoForm();
        this.getUserPhysicalInfo();
    }

    createPhysicalInfoForm() {
        this.physicalFormGroup = this.fb.group({
            height: ['', [this.noWhitespaceValidator, Validators.maxLength(200)]],
            eyeColor: ['', [this.noWhitespaceValidator, Validators.maxLength(200)]],
            race: ['', [this.noWhitespaceValidator, Validators.maxLength(200)]],
            weight: ['', [Validators.maxLength(3), Validators.max(499), Validators.min(0)]],
            hairColor: ['', [this.noWhitespaceValidator, Validators.maxLength(200)]]
        });        
    }

    getUserPhysicalInfo() {
        this.isLoading = true;        
        this.getAllEyeColor();
        this.getAllHairColor();
        this.editPhysicalInfoService.getAllRaces()
            .subscribe(dataRaces => {
                if (dataRaces.status === 200) {
                    this.races = dataRaces.body;
                    this.editPhysicalInfoService.getPhysicalInfo(this.service.getApplicantId)
                        .subscribe(data => {                            
                            if (data.status === 200) {                                
                                this.userPhysical = data.body;
                                this.fillUserPhysicalInfoService();
                            }
                            else {
                                this.userPhysical = {};
                            }
                        },
                            err => {
                                this.isLoading = false;
                                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user physical information', detail: '' });
                            },
                            () => {
                                this.isLoading = false;
                            });
                }
                else {
                    this.userPhysical = {};
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get races', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    getAllEyeColor() {
        this.editPhysicalInfoService.getAllEyeColor()
            .subscribe(data => {
                if (data.status === 200) {
                    this.eyeColors = data.body;
                }
            },
                err => {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get eye color', detail: '' });
                });
    }
    getAllHairColor() {
        this.editPhysicalInfoService.getAllHairColor()
            .subscribe(data => {
                if (data.status === 200) {
                    this.hairColors = data.body;
                }
            },
                err => {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get hair color', detail: '' });
                });
    }

    fillUserPhysicalInfoService() {
        console.log(this.userPhysical.EyeColor);
        this.physicalFormGroup.get('height').setValue(this.checkNullOrUndefined(this.userPhysical.Height));
        this.physicalFormGroup.get('eyeColor').setValue(this.checkNullOrUndefined(this.userPhysical.EyeColor));
        this.physicalFormGroup.get('race').setValue(this.checkNullOrUndefined(this.userPhysical.Race));
        this.physicalFormGroup.get('weight').setValue(this.checkNullOrUndefined(this.userPhysical.Weight));
        this.physicalFormGroup.get('hairColor').setValue(this.checkNullOrUndefined(this.userPhysical.HairColor));
    }

    checkNullOrUndefined(value) {
        if (value) {
            return value;
        }
        return '';
    }

    onSave() {
        const model: any = {
            userPhysicalID: this.userPhysical.userPhysicalID ? this.userPhysical.userPhysicalID : 0,
            height: this.physicalFormGroup.get('height').value,
            eyeColor: this.physicalFormGroup.get('eyeColor').value,
            race: this.physicalFormGroup.get('race').value,
            weight: this.physicalFormGroup.get('weight').value,
            hairColor: this.physicalFormGroup.get('hairColor').value,
            userId: this.service.getApplicantId
        };

        this.isLoading = true;
        this.editPhysicalInfoService.save(model).subscribe(() => {
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: 'Physical information has been saved' });
        }, error => {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to save physical information' });
        },
            () => {
                this.isLoading = false;
            });
    }

    onClear() {
        this.physicalFormGroup.get('height').setValue('');
        this.physicalFormGroup.get('eyeColor').setValue('');
        this.physicalFormGroup.get('race').setValue('');
        this.physicalFormGroup.get('weight').setValue('');
        this.physicalFormGroup.get('hairColor').setValue('');
    }

    noWhitespaceValidator(control: AbstractControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }

    prevPage() {
        this.router.navigate(['personal-info/applicant-info/edit']);
    }

    nextPage() {
        this.router.navigate(['personal-info/education']);
    }

}
