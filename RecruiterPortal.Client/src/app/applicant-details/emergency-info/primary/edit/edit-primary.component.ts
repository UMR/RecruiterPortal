import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../../common/services/storage.service';
import { EmergencyInfoService } from '../../emergency-info.service';

@Component({
    selector: 'app-edit-primary',
    templateUrl: './edit-primary.component.html',
    styleUrls: ['./edit-primary.component.css']
})
export class PrimaryEditComponent implements OnInit {
    public isLoading: boolean = false;
    public infoForm: FormGroup;
    public submitted: boolean = false;
    public primaryInfoModel: EmergencyInfoModel;
    public primaryInfo: EmergencyInfoModel;
    public applicantEmergencyInfoId: number = 0;

    constructor(private messageService: MessageService,
        private fb: FormBuilder,
        private emergencyInfoService: EmergencyInfoService,
        private router: Router,
        private storageService: StorageService) { }

    ngOnInit() {
        this.getPrimaryEmergencyInfo();
        this.infoForm = this.fb.group({
            lastName: ["", Validators.compose([Validators.required, Validators.maxLength(30)])],
            firstName: ["", Validators.compose([Validators.required, Validators.maxLength(30)])],
            relationship: ["", Validators.maxLength(50)],
            homePhone: ["", Validators.compose([Validators.required, Validators.maxLength(25)])],
            cellPhone: ["", Validators.maxLength(25)],
            workPhone: ["", Validators.maxLength(25)],
        });
    }

    getPrimaryEmergencyInfo() {
        this.emergencyInfoService.getEmergencyInfoByApplicantId(this.storageService.getApplicantId)
            .subscribe(response => {
                if (response.status === 200) {
                    const data = response.body;
                    if (data && data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].EmrType && +data[i].EmrType === 1) {
                                this.primaryInfo = data[i];
                                if ((this.primaryInfo as any).ApplicantEmergencyInfoID) {
                                    this.applicantEmergencyInfoId = +(this.primaryInfo as any).ApplicantEmergencyInfoID;
                                }
                                this.infoForm.patchValue({
                                    firstName: (this.primaryInfo as any).EmrFirstName,
                                    lastName: (this.primaryInfo as any).EmrLastName,
                                    relationship: (this.primaryInfo as any).NatureOfRelationship,
                                    homePhone: (this.primaryInfo as any).EmrHomePhone,
                                    cellPhone: (this.primaryInfo as any).EmrCellPhone,
                                    workPhone: (this.primaryInfo as any).EmrWorkPhone,
                                });
                            }
                        }
                    }
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load primary info', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }
    get f() { return this.infoForm.controls; }

    onSubmitPrimaryInfo() {

        this.submitted = true;
        if (this.infoForm.valid) {
            this.primaryInfoModel = {
                ApplicantEmergencyInfoID: this.applicantEmergencyInfoId,
                ApplicantID: this.storageService.getApplicantId,
                EmrLastName: this.infoForm.get('lastName').value,
                EmrFirstName: this.infoForm.get('firstName').value,
                NatureOfRelationship: this.infoForm.get('relationship').value,
                EmrHomePhone: this.infoForm.get('homePhone').value,
                EmrCellPhone: this.infoForm.get('cellPhone').value,
                EmrWorkPhone: this.infoForm.get('workPhone').value,
                EmrType: "1",
                UserID: this.storageService.getApplicantId
            };
            this.isLoading = true;
            this.emergencyInfoService.insertPrimaryEmergencyInfo(this.primaryInfoModel)
                .subscribe(data => {
                    if (data.status === 200) {
                        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully Saved', detail: '' });
                        this.submitted = false;
                        this.router.navigate(['/emergency-info']);
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
