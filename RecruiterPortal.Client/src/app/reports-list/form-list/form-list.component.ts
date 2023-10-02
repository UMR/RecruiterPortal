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
            isActive: [''],
            fileName: ['', Validators.compose([Validators.required])],
            fileData: ['']
        });
    }

    onLazyLoadOfficialFiles(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.pageSize = event.rows;        
        this.getOfficialFilesByAgencyId();
    }

    getOfficialFilesByAgencyId() {
        this.isLoading = true;
        this.formService.getOfficialFilesByAgencyId(this.pageNumber, this.pageSize)
            .subscribe(response => {                
                if (response.status === 200) {
                    this.officialFiles = response.body.Records;
                    this.totalOfficialFile = response.body.TotalRecords;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get official file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    setDefaultFields(isLoading: boolean, showDialog: boolean, selectedId: number, selectedOfficialFile: any, addEditTitle: string) {
        this.isLoading = isLoading;
        this.showDialog = showDialog;
        this.selectedOfficialFileId = selectedId;
        this.selectedOfficialFile = selectedOfficialFile;
        this.formGroup.reset();
        this.addEditTitle = addEditTitle;
    }

    getOfficialFileById(id) {
        this.isLoading = true;
        this.formService.getOfficialFileById(id)
            .subscribe(response => {               
                if (response.status === 200) {
                    this.selectedOfficialFile = response.body;
                    this.fillupOfficialFile(this.selectedOfficialFile);
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get official file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    fillupOfficialFile(officialForm: any){
        console.log(officialForm);
        this.formGroup.patchValue({
            title: officialForm.Title,
            isRequired: officialForm.IsRequired,
            isAdministrative: officialForm.IsAdministrative,
            isActive: officialForm.IsActive,
            fileName: officialForm.FileName            
        });
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
                    this.formGroup.controls.fileData.setValue(reader.result.toString().split(',')[1]);
                }
            }
        }
    }

    onNew() {
        this.setDefaultFields(false, true, 0, null, "Add");             
    }

    onEdit(form) {
        this.formGroup.reset();
        this.selectedOfficialFileId = form.Id;
        this.selectedOfficialFile = form;
        this.fillupOfficialFile(form);
        this.showDialog = true;
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
            fileData: this.formGroup.controls.fileData.value,
            title: this.formGroup.controls.title.value,
            isRequired: this.formGroup.controls.isRequired.value,
            isAdministrative: this.formGroup.controls.isAdministrative.value,
            isActive: this.formGroup.controls.isActive.value
        };        
        this.isLoading = true;
        this.formService.saveOfficialFile(model)
            .subscribe(result => {
                if (result.status === 200) {
                    this.setDefaultFields(false, false, 0, null, "Add");
                    this.getOfficialFilesByAgencyId();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Official file saved successfully', life: 3000 });
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save official file', detail: '' });
                });
    }

    onDelete() {
    }
}
