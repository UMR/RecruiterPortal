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

    public isLoading: boolean = false;
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
        this.getNotesForApplicant(changes.selectedApplicant.currentValue);
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

    getNotesForApplicant(applicantId) {
        if (this.selectedApplicant) {
            if (typeof (this.selectedApplicant) !== "object") {
                this.formGroup.patchValue({ notes: '' });
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
    }

    ///////////////  Resume Section   //////////////////

    getApplicantResume(applicantId) {
        this.resumes = [];
        if (this.selectedApplicant) {
            if (typeof (this.selectedApplicant) !== "object") {
                this.isLoading = true;
                this.statusService.getApplicantResume(this.selectedApplicant).subscribe(response => {
                    this.resumes = response.body;
                    this.isLoading = false;
                },
                    err => {
                        this.isLoading = false;
                        //this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get resume', detail: '' });
                    },
                    () => { });
            }
        }
    }

    getResume() {
        this.isLoading = true;
        this.statusService.getApplicantResume(this.selectedApplicant).subscribe(response => {
            this.resumes = response.body;
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
            },
            () => { });
    }

    uploadResume(resumeModel: any) {
        this.isLoading = true;
        this.statusService.uploadApplicantResume(resumeModel).subscribe(response => {
            this.isLoading = false;
            this.getResume();
        },
            err => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get resume', detail: '' });
            },
            () => { this.isLoading = false; });
    }

    deleteResume(resumeId) {
        if (this.selectedApplicant) {
            if (typeof (this.selectedApplicant) !== "object") {
                this.isLoading = true;
                this.statusService.deleteApplicantResume(resumeId).subscribe(response => {
                    this.isLoading = false;
                    this.getResume();
                },
                    err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete resume', detail: '' }); },
                    () => { });
            }
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

    onViewPdf(resume: any) {
        if (resume.FileName.includes(".pdf")) {
            //this.licenseService.getUserLicenseById(userLicense.LicenseID).subscribe(res => {
            var blob = this.b64toBlob(resume.FileData, "application/pdf", "");
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
            //});
        }
        else if (resume.FileName.includes(".docx") || resume.FileName.includes(".doc")) {
            //this.licenseService.getUserLicenseById(userLicense.LicenseID).subscribe(res => {
            let blob = this.b64toBlobDoc(resume.FileData, "application/octet-stream",);
            let blobUrl = URL.createObjectURL(blob);
            let doc = document.createElement("a");
            doc.href = blobUrl;
            doc.download = resume.FileName;
            doc.click();
            //});
        }
        else {
            //this.licenseService.getUserLicenseById(userLicense.LicenseID).subscribe(res => {
            var blob = this.b64toBlob(resume.FileData, "image/jpeg", "");
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
            //});
        }
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        return new File(byteArrays, "pot", { type: contentType });
    }

    b64toBlobDoc(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
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
