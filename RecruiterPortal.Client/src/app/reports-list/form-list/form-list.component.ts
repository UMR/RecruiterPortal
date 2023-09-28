import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
    public isLoading: boolean = false;
    public formList: any[] = [];
    public totalForm: number;
    public Id: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;

    public showDialog: boolean = false;
    public addEditTitle: string;
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) {
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
        });
    }

    onLazyLoad(event: LazyLoadEvent) {
    }

    onNew() {
        //this.selectedJobId = 0;
        //this.selectedJob = null;
        //this.addEditTitle = "Add";
        this.showDialog = true;
        //this.setDefaultFields();
    }

    onEdit(job) {
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
    }

    onDelete() {
    }
}
