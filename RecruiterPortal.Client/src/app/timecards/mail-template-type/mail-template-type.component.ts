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
    public selectedMailTemplateTypeId: number = 0;
    public addEditTitle: string;
    public formGroup: FormGroup;

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private mailTemplateTypeService: MailTemplateService) {
        this.addEditTitle = "Add";
        this.mailTemplateTypeService.mailTemplateTypes$.subscribe(data => { this.mailTemplateTypes = data; });
    }

    ngOnInit() {
        this.createJobFormGroup();
        this.getMailTemplateTypesByRecruiterId();
    }

    createJobFormGroup() {
        this.formGroup = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
        });
    }

    getMailTemplateTypesByRecruiterId() {
        this.mailTemplateTypeService.getMailTemplateTypesByRecruiterId()
            .subscribe(response => {
                this.mailTemplateTypes = response.body;
                this.mailTemplateTypeService.setMailTemplateTypes(this.mailTemplateTypes);
            });
    }

    getMailTemplateTypeById(id) {
        this.mailTemplateTypeService.getMailTemplateTypeById(id)
            .subscribe(response => {
                this.selectedMailTemplateType = response.body;
                this.selectedMailTemplateTypeId = this.selectedMailTemplateType.Id;
                this.formGroup.controls.name.setValue(this.selectedMailTemplateType.Name);
                this.mailTemplateTypeService.mailTemplateTypes$.subscribe(data => { this.mailTemplateTypes = data; });
            });
    }

    onAddNew() {
        this.setDefaultFields();
        this.selectedMailTemplateTypeId = 0;
        this.selectedMailTemplateType = null;
    }

    onEdit(mailTemplateType) {
        this.selectedMailTemplateTypeId = mailTemplateType.Id;
        this.getMailTemplateTypeById(this.selectedMailTemplateTypeId);
    }

    save() {
        const model = {
            Id: this.selectedMailTemplateTypeId,
            Name: this.formGroup.controls.name.value
        }
        if (this.formGroup.valid) {
            this.mailTemplateTypeService.save(model).subscribe(res => {
                if (res.status === 200) {
                    this.selectedMailTemplateTypeId = 0;
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
        this.mailTemplateTypeService.delete(mailTemplateType.Id).subscribe(res => {
            if (res.status === 200) {
                this.selectedMailTemplateTypeId = 0;
                this.selectedMailTemplateType = null;
                this.setDefaultFields();
                this.getMailTemplateTypesByRecruiterId();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail Template Type Deleted', life: 3000 });
            }
        },
            err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mail Template Type Delete Failed', life: 3000 });
            }
        );
    }

}
