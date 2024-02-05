import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StatusService } from './status.service';
import { ApplicantStatusRequestModel } from '../../common/model/applicantStatusRequestModel';


@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']    
})
export class StatusComponent implements OnInit {

    @Output() hideEvent = new EventEmitter<boolean>();
    @Input() selectedApplicant: any;
    public formGroup: FormGroup;
    public statusResults: string[];
    public positionResults: string[];
    public institutionResults: any[];
    
    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private statusService: StatusService) {

     }

    ngOnInit() {
        this.createFormGroup();
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            status: ['', Validators.compose([Validators.required])],
            statusId:[],
            position: ['', Validators.compose([Validators.required])],
            positionId: [''],
            institution: [''],
            instituteId: [''],
            resume:[''],
            notes:[''],
            currentSalary: [''],
            expectedSalary:['']
        });
    }

    onStatusSelect($event) {
        this.formGroup.patchValue({
            status: $event.StatusName,
            statusId: $event.StatusId
        });
    }

    onStatusSearch() {
        this.statusService.getStatus().subscribe(response => {
            console.log(response.body);
            this.statusResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }
    
    onPositionSearch($event) {
        this.statusService.getPositionByPositionName($event.query).subscribe(response => {
            this.positionResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }

    onPositionSelect($event) {
        this.formGroup.patchValue({
            position: $event.PositionName,
            positionId: $event.Id
        });
    }

    onInstitutiionSearch($event) {
        this.statusService.getInsituteByInsituteName($event.query).subscribe(response => {
            if (response.status === 200) {
                this.institutionResults = response.body;
            }
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get institutes', detail: '' }); },
            () => { });
    }

    onInstitutiionSelect($event) {
        this.formGroup.patchValue({
            instituteId: $event.Id,
            institution: $event.InstituteName
        });
    }

    onFileSelect(event) {
        if (event.files.length > 0) {
            if (!event.files[0].type.includes("image/") && !event.files[0].type.includes("application/pdf") && !event.files[0].type.includes("application/msword") && !event.files[0].type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file type', detail: 'Upload file' });
            } else if (event.files[0].size > 5000000) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file size', detail: 'File size limit: 5MB' });
            } else {
                //this.uploadedFile = event.files[0];
                //this.licenseFormGroup.get('fileName').setValue(event.files[0].name);
                let reader = new FileReader();
                reader.readAsDataURL(event.files[0]);
                reader.onloadend = () => {
                    //this.licenseFile = reader.result.toString().split(',')[1];
                }
            }
        }
    }

    clear() {
        this.formGroup.reset();
    }

    hide() {
        this.formGroup.reset();
        this.hideEvent.emit(false);
    }

    save() {

        let statusModel = new ApplicantStatusRequestModel;
        statusModel.ApplicantId = this.selectedApplicant;
        statusModel.Status = this.formGroup.get('statusId').value;
        statusModel.Date = new Date;
        statusModel.PositionId = this.formGroup.get('positionId').value;
        statusModel.InstitutionId = this.formGroup.get('instituteId').value == '' ? null : this.formGroup.get('instituteId').value;
        statusModel.CurrentSalary = this.formGroup.get('currentSalary').value == '' ? null : this.formGroup.get('currentSalary').value;
        statusModel.ExpectedSalary = this.formGroup.get('expectedSalary').value == '' ? null : this.formGroup.get('expectedSalary').value;
        statusModel.IsActive = true;

        this.statusService.addApplicantStatus(statusModel).subscribe(res => {
            if (res) {
                this.formGroup.reset();
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Applicant send successfully', detail: '' });
                this.hideEvent.emit(false);
            }
        },
            err => {
               /* this.isLoading = false;*/
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Applicant send failed', detail: '' });
            },
            () => {
                //this.isLoading = false;
            });
    }
}
