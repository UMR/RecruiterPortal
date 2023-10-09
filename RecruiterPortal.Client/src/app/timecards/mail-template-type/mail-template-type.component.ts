import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
    public addEditButtonText: string;
    public formGroup: FormGroup;
    @Output() hideEvent = new EventEmitter<boolean>();
    //@Input() showMailTemplateType: boolean;

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private mailTemplateTypeService: MailTemplateService) {
        this.addEditTitle = "Add";
        this.addEditButtonText = "Save";
        this.mailTemplateTypeService.mailTemplateTypes$.subscribe(data => { this.mailTemplateTypes = data; });
    }

    ngOnInit() {
        this.createJobFormGroup();
        this.getMailTemplateTypesByRecruiterId();
    }

    //ngOnChanges(changes: SimpleChanges) {
    //    if (changes.showMailTemplateType.currentValue == true) {
    //        this.selectedMailTemplateTypeId = 0;
    //        this.selectedMailTemplateType = null;
    //        this.addEditButtonText = "Save";
    //        this.formGroup.reset();
    //    }
    //}

    public setInitialValue(): void {
        this.selectedMailTemplateTypeId = 0;
        this.selectedMailTemplateType = null;
        this.addEditButtonText = "Save";
        this.formGroup.reset();
    }

    createJobFormGroup() {
        this.formGroup = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(100), this.noWhitespaceValidator])]
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
        this.addEditButtonText = "Save";
    }

    onEdit(mailTemplateType) {
        this.selectedMailTemplateTypeId = mailTemplateType.Id;
        this.selectedMailTemplateType = mailTemplateType;
        this.addEditButtonText = "Update";
        this.getMailTemplateTypeById(this.selectedMailTemplateTypeId);
    }

    onHide() {
        this.hideEvent.emit(false);
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
                    this.addEditButtonText = "Save";
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

    cancel() {
        this.setDefaultFields();
        this.selectedMailTemplateTypeId = 0;
        this.selectedMailTemplateType = null;
        this.addEditButtonText = "Save";
    }

    noWhitespaceValidator(control: AbstractControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }

}
