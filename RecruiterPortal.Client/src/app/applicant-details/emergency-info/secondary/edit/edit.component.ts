import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../../common/services/storage.service';
import { EmergencyInfoService } from '../../emergency-info.service';

@Component({
    selector: 'app-secondary-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class SecondaryEditComponent implements OnInit {
    public isLoading: boolean = false;
    public infoForm: FormGroup;
    public submitted: boolean = false;
    public secondaryInfoModel: EmergencyInfoModel[] = [];
    public secondaryInfo: EmergencyInfoModel[] = [];
    public applicantEmergencyInfoId: number = 0;

    constructor(private messageService: MessageService,
        private fb: FormBuilder,
        private emergencyInfoService: EmergencyInfoService,
        private router: Router,
        private storageService: StorageService) { }

    ngOnInit() {
        this.getData();
        this.setInitialForm();
    }
    setInitialForm() {
        this.infoForm = this.fb.group({
            lastName: ["", Validators.required],
            firstName: ["", Validators.required],
            relationship: [""],
            homePhone: ["", Validators.required],
            cellPhone: [""],
            workPhone: [""],
        });
    }
    getData() {
        this.emergencyInfoService.getEmergencyInfoByApplicantId(this.storageService.getApplicantId)
            .subscribe(response => {
                const data = (response as any).Data;
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].EmrType && +data[i].EmrType === 2) {
                            this.secondaryInfo = data[i];
                            if ((this.secondaryInfo as any).ApplicantEmergencyInfoID) {
                                this.applicantEmergencyInfoId = +(this.secondaryInfo as any).ApplicantEmergencyInfoID;
                            }
                            this.infoForm.patchValue({
                                firstName: (this.secondaryInfo as any).EmrFirstName,
                                lastName: (this.secondaryInfo as any).EmrLastName,
                                relationship: (this.secondaryInfo as any).NatureOfRelationship,
                                homePhone: (this.secondaryInfo as any).EmrHomePhone,
                                cellPhone: (this.secondaryInfo as any).EmrCellPhone,
                                workPhone: (this.secondaryInfo as any).EmrWorkPhone,
                            });
                        }
                    }
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load secondary info', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    get f() { return this.infoForm.controls; }

    onSubmitPrimaryInfo() {
        this.submitted = true;
        this.secondaryInfoModel = [];
        if (!this.infoForm.invalid) {
            this.secondaryInfoModel.push({
                ApplicantEmergencyInfoID: this.applicantEmergencyInfoId,
                ApplicantID: this.storageService.getApplicantId,
                EmrLastName: this.infoForm.get('lastName').value,
                EmrFirstName: this.infoForm.get('firstName').value,
                NatureOfRelationship: this.infoForm.get('relationship').value,
                EmrHomePhone: this.infoForm.get('homePhone').value,
                EmrCellPhone: this.infoForm.get('cellPhone').value,
                EmrWorkPhone: this.infoForm.get('workPhone').value,
                EmrType: "2",
                UserID: this.storageService.getApplicantId
            })
            this.isLoading = true;
            this.emergencyInfoService.insertSecondaryEmergencyInfo(this.secondaryInfoModel[0])
                .subscribe(data => {
                    if (data.status === 200) {
                        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully Saved', detail: '' });
                        this.submitted = false;
                        this.router.navigate(['/emergency-info/secondary']);
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to Saved', detail: '' });
                    },
                    () => {
                        this.isLoading = false;
                    });
        }
    }
    onClear() {
        this.infoForm.reset()
    }
}
