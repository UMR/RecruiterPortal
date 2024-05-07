import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { Enum1099FileNameByType, Enum1099FileType, EnumFileNameByType, EnumFileType, EnumW2FileNameByType, EnumW2FileType, IUploadFile } from '../upload-file/upload-file.model';
import { Table } from 'primeng/components/table/table';
import { UploadRequirementsService } from './upload-requirements.service';
import { StorageService } from '../../common/services/storage.service';

@Component({
    selector: 'app-upload-requirements',
    templateUrl: './upload-requirements.component.html',
    styleUrls: ['./upload-requirements.component.css']
})
export class UploadRequirementsComponent implements OnInit {
    public isLoading: boolean = false;
    public fileData: string = "";
    public fileName: string = "";
    public fileTypes: any;
    public selectedEmpClass: string = '';
    public applicationFiles: Array<IUploadFile> = [];
    public selectedFile: IUploadFile;
    @ViewChild('applicationTable', { static: false }) applicationTable: Table;
    @ViewChild('myEmployment', { static: false }) myEmployment: ElementRef;
    @ViewChild('fileTypeSelect', { static: false }) fileTypeSelect: ElementRef;
    public steps: MenuItem[];
    public activeIndex: number = 0;
    public selectedActiveIndex: number = 0;
    public fileType: string = "";
    public userFiles: [] = [];
    public fileTypeEnum: any;
    public fileNameEnum: string = "";
    public filePath: string = "";
    public selectedFileName: string = "";

    constructor(private uploadFileService: UploadRequirementsService, private confirmationService: ConfirmationService, private messageService: MessageService, private service: StorageService) { }

    ngOnInit() {
        this.getEmpClass();
        if (this.fileTypeEnum) {
            this.getUserFileByFileType();
        }
    }

    getEmpClass() {
        this.uploadFileService.getEmpolymentClass(this.service.getApplicantId).subscribe(data => {
            if (data.status === 200) {
                this.myEmployment.nativeElement.value = data.body.EmploymentClass;
                this.selectedEmpClass = data.body.EmploymentClass;
                if (this.myEmployment.nativeElement.value == '1099') {
                    this.fileTypes = Object.values(Enum1099FileNameByType);
                    this.fileTypeEnum = (<any>Enum1099FileType)[this.fileType];
                    this.fileNameEnum = (<any>Enum1099FileNameByType)[this.fileType];
                }
                if (this.myEmployment.nativeElement.value == 'W-2') {
                    this.fileTypes = Object.values(EnumW2FileNameByType);
                    this.fileTypeEnum = (<any>EnumW2FileType)[this.fileType];
                    this.fileNameEnum = (<any>EnumW2FileNameByType)[this.fileType];
                }
            }
        },
            err => {
                this.isLoading = false;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get employment Class', detail: '' });
            },
            () => {
                this.isLoading = false;
            });
    }

    onEmploymentClassChange(value) {
        this.isLoading = true;
        this.uploadFileService.updateEmpolymentClass(this.service.getApplicantId, value)
            .subscribe(data => {
                if (data.status === 200) {
                    this.fileTypeSelect.nativeElement.value = '';
                    this.filePath = '';
                    this.userFiles = [];
                    this.getEmpClass();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Update Failed', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onFileTypeChange(fileTypeName) {
        this.selectedFileName = fileTypeName;
        if (this.selectedEmpClass == '1099') {
            this.fileNameEnum = Object.keys(Enum1099FileNameByType)[Object.values(Enum1099FileNameByType).indexOf(fileTypeName)];
            this.fileTypeEnum = Enum1099FileType[this.fileNameEnum];
        }
        else {
            this.fileNameEnum = Object.keys(EnumW2FileNameByType)[Object.values(EnumW2FileNameByType).indexOf(fileTypeName)];
            this.fileTypeEnum = EnumW2FileType[this.fileNameEnum];
        }
        this.getUserFileByFileType();
        this.loadFilePath();
    }

    loadFilePath() {
        if (this.fileNameEnum == "AgencyHired") {
            this.filePath = "assets/pdf/w2/Agency Hire Form.docx";
        }
        else if (this.fileNameEnum == "AdministrativeFeeAgreement") {
            this.filePath = "assets/pdf/2021/Administrative_Fee_Agreement.docx";
        }
        else if (this.fileNameEnum == "Cpr") {
            this.filePath = "";
        }
        else if (this.fileNameEnum == "DeclinationInfluenza") {
            this.filePath = "assets/pdf/w2/Declination of Influenza Vaccination.docx";
        }
        else if (this.fileNameEnum == "EmergencyContact") {
            this.filePath = "assets/pdf/w2/Emergency Contact Information Form.docx";
        }
        else if (this.fileNameEnum == "EmploymentApplication" && this.myEmployment.nativeElement.value == '1099') {
            this.filePath = "assets/pdf/2024/Independent Contractor Application Form.docx";
        }
        else if (this.fileNameEnum == "EmploymentApplication" && this.myEmployment.nativeElement.value == 'W-2') {
            this.filePath = "assets/pdf/w2/Application.docx";
        }
        else if (this.fileNameEnum == "EmploymentContract") {
            this.filePath = "";
        }
        else if (this.fileNameEnum == "EmploymentEligibility") {
            this.filePath = "assets/pdf/w2/I-9 Employment Eligibility Verification.pdf";
        }
        else if (this.fileNameEnum == "HepatitisB" && this.myEmployment.nativeElement.value == '1099') {
            this.filePath = "assets/pdf/2024/Hepatitis B Immunization.docx";
        }
        else if (this.fileNameEnum == "HepatitisB" && this.myEmployment.nativeElement.value == 'W-2') {
            this.filePath = "assets/pdf/w2/Hepatitis B Immunization.docx";
        }
        else if (this.fileNameEnum == "HippaForm" && this.myEmployment.nativeElement.value == '1099') {
            this.filePath = "assets/pdf/2024/HIPPA Form 2021.docx";
        }
        else if (this.fileNameEnum == "HippaForm" && this.myEmployment.nativeElement.value == 'W-2') {
            this.filePath = "assets/pdf/w2/HIPPA_Form.docx";
        }
        else if (this.fileNameEnum == "IndependentContractorAgreement") {
            this.filePath = "assets/pdf/2024/Independent Contractor Agreement.docx";
        }
        else if (this.fileNameEnum == "NurseForm") {
            this.filePath = "assets/pdf/2021/Nurse_Form_5.docx";
        }
        else if (this.fileNameEnum == "NysChrc") {
            this.filePath = "assets/pdf/w2/DOH CHRC Form.pdf";
        }
        else if (this.fileNameEnum == "Payroll") {
            this.filePath = "assets/pdf/w2/Direct Deposit Payroll Authorization.docx";
        }
        else if (this.fileNameEnum == "PhysicalExam") {
            this.filePath = "";
        }
        else if (this.fileNameEnum == "ReferenceLetters") {
            this.filePath = "";
        }
        else if (this.fileNameEnum == "Resume") {
            this.filePath = "";
        }
        else if (this.fileNameEnum == "TermsAndConditionsIndependentContractor") {
            this.filePath = "assets/pdf/2021/Terms_and_Conditions_Independent_Contractor_2020.docx";
        }
        else if (this.fileNameEnum == "UmrHealthForm" && this.myEmployment.nativeElement.value == '1099') {
            this.filePath = "assets/pdf/2024/UMR HEALTH FORM  11162023-001.pdf";
        }
        else if (this.fileNameEnum == "UmrHealthForm" && this.myEmployment.nativeElement.value == 'W-2') {
            this.filePath = "assets/pdf/w2/UMR HEALTH FORM.docx";
        }
        else if (this.fileNameEnum == "VoidedCheque") {
            this.filePath = "";
        }
        else if (this.fileNameEnum == "W9") {
            this.filePath = "assets/pdf/w2/W-9 Form.pdf";
        }
        else if (this.fileNameEnum == "W9CoverSheet") {
            this.filePath = "assets/pdf/w2/W-9 Coversheet.doc";
        }
        else if (this.fileNameEnum == "RNSupervisor3Year") {
            this.filePath = "assets/pdf/2024/RN SUPERVISOR Contractor 3 Year CONTRACT.docx";
        }
        else if (this.fileNameEnum == "RNSupervisor4Year") {
            this.filePath = "assets/pdf/2024/RN SUPERVISOR Contractor 4 Year CONTRACT.docx";
        }
        else if (this.fileNameEnum == "RNSupervisor5Year") {
            this.filePath = "assets/pdf/2024/RN SUPERVISOR Contractor 5 Year CONTRACT.docx";
        }
        else if (this.fileNameEnum == "StaffNurse3Year") {
            this.filePath = "assets/pdf/2024/STAFF NURSE Contractor 3 Year CONTRACT.docx";
        }
        else if (this.fileNameEnum == "StaffNurse4Year") {
            this.filePath = "assets/pdf/2024/STAFF NURSE Contractor 4 Year CONTRACT.docx";
        }
        else if (this.fileNameEnum == "StaffNurse5Year") {
            this.filePath = "assets/pdf/2024/STAFF NURSE Contractor 5 Year CONTRACT.docx";
        }
        else {
            this.filePath = "";
        }
    }

    isBase64(str) {
        if (str === '' || str.trim() === '') { return false; }
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }

    getUserFile() {
        this.isLoading = true;
        this.uploadFileService.getUserFile()
            .subscribe(data => {
                if (data.status === 200) {
                    this.userFiles = data.body;
                }
                else {
                    this.userFiles = [];
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user files', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onViewPdf(userFile: any) {
        if (userFile.FileName.includes(".pdf")) {
            this.uploadFileService.getFileById(userFile.UserFileID).subscribe(res => {
                var blob = this.b64toBlob(res.body.FIleData, "application/pdf", "");
                const fileURL = URL.createObjectURL(blob);
                window.open(fileURL, '_blank');
            });
        }
        else if (userFile.FileName.includes(".docx") || userFile.FileName.includes(".doc")) {
            this.uploadFileService.getFileById(userFile.UserFileID).subscribe(res => {
                var blob = this.b64toBlobDoc(res.body.FIleData, "application/octet-stream",);
                let blobUrl = URL.createObjectURL(blob);
                let doc = document.createElement("a");
                doc.href = blobUrl;
                doc.download = userFile.fileName;
                doc.click();
            });
        }
        else {
            this.uploadFileService.getFileById(userFile.UserFileID).subscribe(res => {
                var blob = this.b64toBlob(res.body.FIleData, "image/jpeg", "");
                const fileURL = URL.createObjectURL(blob);
                window.open(fileURL, '_blank');
            });
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

    getUserFileByFileType() {
        this.isLoading = true;
        this.uploadFileService.getUserFileByFileType(this.service.getApplicantId, this.fileTypeEnum)
            .subscribe(data => {
                if (data.status === 200) {
                    this.userFiles = data.body;
                }
                else {
                    this.userFiles = [];
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user files', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onFileSelect(event) {
        if (event.files.length > 0) {
            if (!event.files[0].type.includes("image/") && !event.files[0].type.includes("application/pdf") && !event.files[0].type.includes("application/msword") && !event.files[0].type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file type', detail: 'Upload file' });
            } else if (event.files[0].size > 5000000) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file size', detail: 'File size limit: 5MB' });
            }
        }
    }

    onUploadHandler(event) {
        let reader = new FileReader();
        reader.readAsDataURL(event.files[0]);
        reader.onloadend = () => {
            this.fileData = reader.result.toString().split(',')[1];
            this.fileName = event.files[0].name;
            this.onUploadFile();
        }
    }

    onUploadFile() {
        let uploadFileModel: IUploadFile = {
            UserFileID: 0,
            FIleData: this.fileData,
            FileName: this.fileName,
            CreatedDate: "",
            UserID: this.service.getApplicantId,
            FileType: this.fileTypeEnum
        }

        this.isLoading = true;
        this.uploadFileService.onUploadFile(uploadFileModel)
            .subscribe(data => {
                if (data.status === 200) {
                    this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: this.selectedFileName + ' Uploaded' });
                    this.getUserFileByFileType();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to upload' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    //onDeleteFile(userFileId) {
    //  if (userFileId) {
    //    if (confirm("Are you sure to delete this " + this.selectedFileName + "?")) {
    //      this.isLoading = true;
    //      this.uploadFileService.deleteFile(userFileId)
    //        .subscribe(data => {
    //          if (data.status === 200) {
    //            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: this.selectedFileName + ' Deleted' });
    //            this.getUserFileByFileType();
    //          }
    //        },
    //          err => {
    //            this.isLoading = false;
    //            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete', detail: '' });
    //          },
    //          () => {
    //            this.isLoading = false;
    //          });
    //    }
    //  }
    //}

    onDeleteFile(userFileId) {
        this.confirmationService.confirm({
            message: "Are you sure to delete this " + this.selectedFileName + "?",
            accept: () => {
                this.isLoading = true;
                this.uploadFileService.deleteFile(userFileId)
                    .subscribe(data => {
                        if (data.status === 200) {
                            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: this.selectedFileName + ' Deleted' });
                            this.getUserFileByFileType();
                        }
                    },
                        err => {
                            this.isLoading = false;
                            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete', detail: '' });
                        },
                        () => {
                            this.isLoading = false;
                        });
            }
        });
    }

    paginate(event) {
        let pageIndex = event.first / event.rows + 1 // Index of the new page if event.page not defined.        
        //let paging = {
        //  first: ((pageIndex - 1) * this.table.rows),
        //  rows: this.table.rows
        //};
    }
}
