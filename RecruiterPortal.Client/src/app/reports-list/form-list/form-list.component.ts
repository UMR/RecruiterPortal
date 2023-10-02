import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormListService } from './form-list.service';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
    public isLoading: boolean = false;
    public officialFiles: any[] = [];
    public totalOfficialFile: number;
    public selectedOfficialFileId: number;
    public selectedOfficialFile: any;
    public cols: any[];
    public rows: number = 15;    
    private pageNumber: number;
    private pageSize: number;

    public showDialog: boolean = false;
    public addEditTitle: string;
    public formGroup: FormGroup;
    private fileData: any;

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private formService: FormListService) {
        this.addEditTitle = "Add";
    }

    ngOnInit() {
        this.createFormGroup();        
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
            isRequired: [''],
            isAdministrative: [''],
            isActive: ['', Validators.compose([Validators.required])],
            fileName: ['']
        });
    }

    onLazyLoadOfficialFiles(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.pageSize = event.rows;        
        this.getOfficialFilesByAgencyId(this.pageNumber, this.pageSize);
    }

    getOfficialFilesByAgencyId(pageNumber: number, pageSize: number) {
        this.isLoading = true;
        this.formService.getOfficialFilesByAgencyId(pageNumber, pageSize)
            .subscribe(response => {
                console.log(response);
                if (response.status === 200) {
                    this.officialFiles = response.body.Records;
                    this.totalOfficialFile = response.body.TotalRecords;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get official form', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    getOfficialFormById(id) {
        this.isLoading = true;
        this.formService.getOfficialFileById(id)
            .subscribe(response => {
                if (response.status === 200) {
                    //this.selectedJob = response.body;
                    //this.fillupJob(this.selectedJob);
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get official form', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    fillupOfficialForm(officialForm: any) {
        this.formGroup.patchValue({
            title: officialForm.title,
            isRequired: officialForm.isRequired,
            isAdministrative: officialForm.isAdministrative,
            isActive: officialForm.isActive,
            fileName: officialForm.fileName            
        });
    }

    onLazyLoad(event: LazyLoadEvent) {
    }

    onFileSelect(event) {
        if (event.files.length > 0) {
            if (!event.files[0].type.includes("image/") && !event.files[0].type.includes("application/pdf") && !event.files[0].type.includes("application/msword") && !event.files[0].type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file type', detail: 'Upload file' });
            } else if (event.files[0].size > 5000000) {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file size', detail: 'File size limit: 5MB' });
            } else {
                this.formGroup.controls.fileName.setValue(event.files[0].name);
                let reader = new FileReader();
                reader.readAsDataURL(event.files[0]);
                reader.onloadend = () => {
                    this.fileData = reader.result.toString().split(',')[1];
                }
            }
        }
    }

    onNew() {
        //this.selectedJobId = 0;
        //this.selectedJob = null;
        //this.addEditTitle = "Add";
        this.showDialog = true;
        //this.setDefaultFields();
    }

    onEdit(form) {
        //this.selectedJobId = job.JobId;
        //this.getJobsById(this.selectedJobId);
        //this.jobDialog = true;
    }

    onClear() {
        this.formGroup.reset();
    }

    onHide() {
        this.showDialog = false;
    }

    onSave() {
        const model: any = {
            fileName: this.formGroup.controls.fileName.value,
            fileData: this.fileData,
            title: this.formGroup.controls.title.value,
            isRequired: this.formGroup.controls.isRequired.value,
            isAdministrative: this.formGroup.controls.isAdministrative.value,
            isActive: this.formGroup.controls.isActive.value
        };
        console.log(model);
        this.isLoading = true;
        this.formService.saveOfficialFile(model)
            .subscribe(result => {
                if (result.status === 200) {
                    this.isLoading = false;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Official form saved successfully', life: 3000 });
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save official form', detail: '' });
                });

    }

    onDelete() {
    }
}
