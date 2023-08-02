import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadFileService } from '../upload-file.service';
import { IUploadFile, EnumFileType } from '../upload-file.model';
import { Table } from 'primeng/components/table/table';

@Component({
  selector: 'app-com-upload-file',
  templateUrl: './com-upload-file.component.html',
  styleUrls: ['./com-upload-file.component.css']
})
export class ComUploadFileComponent implements OnInit {

    public isLoading: boolean = false;
    public fileData: string = "";
    public fileName: string = "";
    @Input() fileType: string = "";
    @Input() fileCaption: string = "";
    @Input() filePath: string = "";
    @Output() getFileTypeChange = new EventEmitter<Array<IUploadFile>>();
    public fileTypeEnum: EnumFileType;
    public userFiles: Array<IUploadFile> = [];
    public selectedFile: IUploadFile;
    @ViewChild('table', { static: false }) table: Table;

    constructor(private uploadFileService: UploadFileService, private messageService: MessageService) { }

    ngOnInit() {        
        this.fileTypeEnum = (<any>EnumFileType)[this.fileType];
        if (this.fileTypeEnum) {
            this.getUserFileByFileType();
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

    getUserFileByFileType() {
        this.isLoading = true;
        this.uploadFileService.getUserFileByFileType(this.fileTypeEnum)
            .subscribe(data => {
                if (data.status === 200) {
                    this.userFiles = data.body;
                    this.getFileTypeChange.emit(this.userFiles);
                }
                else {
                    this.userFiles = [];
                    this.getFileTypeChange.emit(this.userFiles);
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user files', detail: '' });
                    console.log(this.fileTypeEnum);
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
            UserID: 0,
            FileType: this.fileTypeEnum
        }        

        this.isLoading = true;
        this.uploadFileService.onUploadFile(uploadFileModel)
            .subscribe(data => {
                if (data.status === 200) {
                    this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Upload successful', detail: '' });
                    this.getUserFileByFileType();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to upload', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onDeleteFile(userFileId) {
        this.isLoading = true;
        if (userFileId) {
            if (confirm("Are you sure to delete this file?")) {
                this.uploadFileService.deleteFile(userFileId)
                    .subscribe(data => {
                        if (data.status === 200) {
                            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Delete successful', detail: '' });
                            const index = (this.userFiles as any).findIndex(x => x.userFileID === +userFileId);
                            this.userFiles.splice(index, 1);
                            this.getFileTypeChange.emit(this.userFiles);
                            this.table.reset();
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
        }
    }

    paginate(event) {
        let pageIndex = event.first / event.rows + 1 // Index of the new page if event.page not defined.        
        let paging = {
            first: ((pageIndex - 1) * this.table.rows),
            rows: this.table.rows
        };
    }

}
