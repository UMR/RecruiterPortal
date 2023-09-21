import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MailTemplateService } from './mail-template-type.service';

@Component({
    selector: 'app-mail-template-type',
    templateUrl: './mail-template-type.component.html',
    styleUrls: ['./mail-template-type.component.css']
})
export class MailTemplateTypeComponent implements OnInit {

    public isLoading: boolean = false;
    public mailTemplateTypes: any[] = [];
    public selectedMailTemplateType: any;
    public selectedMailTemplateTypeId: number;
    public addEditTitle: string;
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private mailTemplateTypeService: MailTemplateService) {
        this.addEditTitle = "Add";
    }

    ngOnInit() {
        this.createJobFormGroup();
        this.getMailTemplateTypesByRecruiterId();
    }

    createJobFormGroup() {
        this.formGroup = this.fb.group({
            name: ['', Validators.compose([Validators.maxLength(100)])]
        });
    }

    getMailTemplateTypesByRecruiterId() {
        this.mailTemplateTypeService.getMailTemplateTypesByRecruiterId()
            .subscribe(response => { this.mailTemplateTypes = response.body; console.log(this.mailTemplateTypes); });
    }

    getMailTemplateTypeById(id) {
        this.mailTemplateTypeService.getMailTemplateTypeById(id)
            .subscribe(response => {
                console.log(response);
                this.selectedMailTemplateType = response.body;
                this.selectedMailTemplateTypeId = this.selectedMailTemplateType.Id;
                this.formGroup.controls.name.setValue(this.selectedMailTemplateType.Name);
            });
    }

    onAddNew() {
        this.setDefaultFields();
    }

    onEdit(mailTemplateType) {
        this.selectedMailTemplateTypeId = mailTemplateType.Id;
        this.getMailTemplateTypeById(this.selectedMailTemplateTypeId);
    }

    save() {
        const jobModel = {
            Id: this.selectedMailTemplateTypeId,
            Name: this.formGroup.controls.name.value
        }
        if (this.formGroup.valid) {
            this.mailTemplateTypeService.save(jobModel).subscribe(res => {
                if (res.status === 200) {
                    this.selectedMailTemplateTypeId = null;
                    this.selectedMailTemplateType = null;
                    this.setDefaultFields();
                    this.getMailTemplateTypesByRecruiterId();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail Template Type Saved', life: 3000 });
                }
            },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mail Template Type Save Failed', life: 3000 });
                });
        }
    }

    setDefaultFields() {
        this.formGroup.reset();
    }

    onDelete(mailTemplateType) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${mailTemplateType.Name} mail template type?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.mailTemplateTypeService.delete(mailTemplateType.Id).subscribe(res => {
                    if (res.status === 200) {
                        this.selectedMailTemplateTypeId = null;
                        this.selectedMailTemplateType = null;
                        this.setDefaultFields();
                        this.getMailTemplateTypesByRecruiterId();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail Template Type Deleted', life: 3000 });
                    }
                },
                    err => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail Template Type Delete Failed', life: 3000 });
                    }
                );
            }
        });
    }

}
