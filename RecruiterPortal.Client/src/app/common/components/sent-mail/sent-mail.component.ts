import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SentMailService } from './sent-mail.service';
import { ApplicantStatusRequestModel } from '../../model/applicantStatusRequestModel';


@Component({
    selector: 'app-status',
    templateUrl: './sent-mail.component.html',
    styleUrls: ['./sent-mail.component.css']    
})
export class SentMailComponent implements OnInit {

    @Output() hideEvent = new EventEmitter<boolean>();
    @Input() selectedApplicant: any;
    public formGroup: FormGroup;
    public statusResults: string[];
    public positionResults: string[];
    public institutionResults: any[];
    
    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private sentMailService: SentMailService) {

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
        this.sentMailService.getStatus().subscribe(response => {
            console.log(response.body);
            this.statusResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }
    
    onPositionSearch($event) {
        this.sentMailService.getPositionByPositionName($event.query).subscribe(response => {
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
        this.sentMailService.getInsituteByInsituteName($event.query).subscribe(response => {
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

        this.sentMailService.addApplicantStatus(statusModel).subscribe(res => {
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
