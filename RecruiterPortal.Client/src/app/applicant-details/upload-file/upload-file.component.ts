import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { UploadFileService } from './upload-file.service';
import { IUploadFile, EnumFileType } from './upload-file.model';
import { Table } from 'primeng/components/table/table';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  public isLoading: boolean = false;
  public fileData: string = "";
  public fileName: string = "";
  public applicationFiles: Array<IUploadFile> = [];
  public selectedFile: IUploadFile;
  @ViewChild('applicationTable', { static: false }) applicationTable: Table;
  public steps: MenuItem[];
  public activeIndex: number = 0;
  public selectedActiveIndex: number = 0;

  constructor(private uploadFileService: UploadFileService, private messageService: MessageService) {
    this.activeIndex = this.selectedActiveIndex;
  }

  ngOnInit() {
    this.steps = [{
      label: 'Agency Hired',
      routerLink: 'agency-hired',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Reference Letters',
      routerLink: 'reference-letter',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Payroll',
      routerLink: 'payroll',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
    {
      label: 'Voided Cheque',
      routerLink: 'voided-cheque',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    },
    {
      label: 'Administrative Fee Agreement',
      routerLink: 'administrative-fee-agreement',
      command: (event: any) => {
        this.activeIndex = 4;
      }
    },
    {
      label: 'Emergency Contact',
      routerLink: 'emergency-contact',
      command: (event: any) => {
        this.activeIndex = 5;
      }
    },
    {
      label: 'Employment Application',
      routerLink: 'employment-application',
      command: (event: any) => {
        this.activeIndex = 6;
      }
    },
    {
      label: 'Employment Eligibility',
      routerLink: 'employment-eligibility',
      command: (event: any) => {
        this.activeIndex = 7;
      }
    },
    {
      label: 'Hepatitis B',
      routerLink: 'hepatitis-b',
      command: (event: any) => {
        this.activeIndex = 8;
      }
    },
    {
      label: 'Declination Influenza',
      routerLink: 'declination-influenza',
      command: (event: any) => {
        this.activeIndex = 9;
      }
    },
    {
      label: 'HIPPA',
      routerLink: 'hippa',
      command: (event: any) => {
        this.activeIndex = 10;
      }
    },
    {
      label: 'Nurse Form',
      routerLink: 'nurse-form',
      command: (event: any) => {
        this.activeIndex = 11;
      }
    },
    {
      label: 'Independent Contractor Agreement',
      routerLink: 'independent-contractor-agreement',
      command: (event: any) => {
        this.activeIndex = 12;
      }
    },
    {
      label: 'Employment Contract',
      routerLink: 'employment-contract',
      command: (event: any) => {
        this.activeIndex = 13;
      }
    },
    {
      label: 'Terms and Conditions Independent Contractor',
      routerLink: 'terms-conditions-independent-contractor',
      command: (event: any) => {
        this.activeIndex = 14;
      }
    },
    {
      label: 'Umr Health Form',
      routerLink: 'umr-health-form',
      command: (event: any) => {
        this.activeIndex = 15;
      }
    },
    {
      label: 'W-9 Cover Sheet',
      routerLink: 'w9-cover-sheet',
      command: (event: any) => {
        this.activeIndex = 16;
      }
    },
    {
      label: 'W-9',
      routerLink: 'w9',
      command: (event: any) => {
        this.activeIndex = 17;
      }
    },
    {
      label: 'Resume',
      routerLink: 'resume',
      command: (event: any) => {
        this.activeIndex = 18;
      }
    },
    {
      label: 'CPR(ALS/BLS)',
      routerLink: 'cpr',
      command: (event: any) => {
        this.activeIndex = 19;
      }
    },
    {
      label: 'Physical Exam',
      routerLink: 'physical-exam',
      command: (event: any) => {
        this.activeIndex = 20;
      }
    }, {
      label: 'NYS DOH CHRC',
      routerLink: 'nys-chrc',
      command: (event: any) => {
        this.activeIndex = 21;
      }
    }];
  }

  onActiveIndexChange(e) {
    console.log(e);
  }


  isBase64(str) {
    if (str === '' || str.trim() === '') { return false; }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }

  getUserFileByApplication() {
    this.isLoading = true;
    this.uploadFileService.getUserFileByFileType(EnumFileType.UmrHealthForm)
      .subscribe(data => {
        if (data.status === 200) {
          this.applicationFiles = data.body;
        }
        else {
          this.applicationFiles = [];
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

  onApplicationUploadHandler(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onloadend = () => {
      this.fileData = reader.result.toString().split(',')[1];
      this.fileName = event.files[0].name;
      this.onApplicationUploadFile();
    }
  }

  onApplicationUploadFile() {
    let uploadFileModel: IUploadFile = {
      UserFileID: 0,
      FIleData: this.fileData,
      FileName: this.fileName,
      CreatedDate: "",
      UserID: 0,
      FileType: EnumFileType.UmrHealthForm
    }

    this.isLoading = true;
    this.uploadFileService.onUploadFile(uploadFileModel)
      .subscribe(data => {
        if (data.status === 200) {
          this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Upload successful', detail: '' });
          this.getUserFileByApplication();
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
              const index = (this.applicationFiles as any).findIndex(x => x.userFileID === +userFileId);
              this.applicationFiles.splice(index, 1);
              this.applicationTable.reset();
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
      first: ((pageIndex - 1) * this.applicationTable.rows),
      rows: this.applicationTable.rows
    };
  }
}
