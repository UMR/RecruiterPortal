import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
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
    private fileName: string = "";
    public resumes: any = [];

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private statusService: StatusService) {

    }

    ngOnInit() {
        this.createFormGroup();
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            status: ['', Validators.compose([Validators.required])],
            statusId: [],
            position: ['', Validators.compose([Validators.required])],
            positionId: [''],
            institution: [''],
            instituteId: [''],
            resume: [''],
            notes: [''],
            currentSalary: [''],
            expectedSalary: ['']
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getApplicantResume(changes.selectedApplicant.currentValue);
        this.getNotesForApplicant();
    }

    onStatusSelect($event) {
        this.formGroup.patchValue({
            status: $event.StatusName,
            statusId: $event.StatusId
        });
    }

    onStatusSearch() {
        this.statusService.getStatus().subscribe(response => {
            this.statusResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }

    getNotesForApplicant() {
        if (this.selectedApplicant) {
            this.statusService.getStatusByApplicantId(this.selectedApplicant).subscribe(res => {
                if (res.body) {
                    this.formGroup.patchValue({
                        notes: res.body.Notes
                    });
                }
            },
                err => {
                    //this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get resume', detail: '' });
                },
                () => { });
        }
    }

    ///////////////  Resume Section   //////////////////

    getApplicantResume(applicantId) {
        if (this.selectedApplicant) {
            this.statusService.getApplicantResume(this.selectedApplicant).subscribe(response => {
                this.resumes = response.body;
            },
                err => {
                    //this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get resume', detail: '' });
                },
                () => { });
        }
    }

    uploadResume(resumeModel: any) {
        this.statusService.uploadApplicantResume(resumeModel).subscribe(response => {
            this.getApplicantResume(this.selectedApplicant);
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to upload resume', detail: '' }); },
            () => { });
    }

    deleteResume(resumeId) {
        if (this.selectedApplicant) {
            this.statusService.deleteApplicantResume(resumeId).subscribe(response => {
                this.getApplicantResume(this.selectedApplicant);
            },
                err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete resume', detail: '' }); },
                () => { });
        }
    }

    onDelete(resume) {
        this.deleteResume(resume.Id);
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
                this.fileName = event.files[0].name;
                let reader = new FileReader();
                reader.readAsDataURL(event.files[0]);
                reader.onloadend = () => {
                    let licenseFile = reader.result.toString().split(',')[1];
                    let uploadModel = {
                        ApplicantId: this.selectedApplicant,
                        Title: this.fileName,
                        FileName: this.fileName,
                        FileData: licenseFile
                    }
                    this.uploadResume(uploadModel);
                }
            }
        }
    }


    //////////////////////////   End Resume   //////////////////////


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
        statusModel.Notes = this.formGroup.get('notes').value == '' ? null : this.formGroup.get('notes').value;;
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
