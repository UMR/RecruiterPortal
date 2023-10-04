import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MailSettingsService } from './mail-settings.service';
import { MailTemplateService } from '../mail-template-type/mail-template-type.service';

@Component({
    selector: 'app-mail-settings',
    templateUrl: './mail-settings.component.html',
    styleUrls: ['./mail-settings.component.css']
})
export class MailSettingsComponent implements OnInit {

    public isLoading: boolean = false;
    public showMailTemplateType: boolean = false;
    public formGroup: FormGroup;
    public mailTemplateTypes: any[] = [];
    public recruiterMailConfigs: any[] = [];
    private selectedFromMail: number;
    private selectedTemplateType: number;
    public selectedMailTemplateId: number = 0;
    public addEditButtonTitle: string = "Save";

    constructor(private fb: FormBuilder, private messageService: MessageService, private mailTemplateTypeService: MailTemplateService,
        private mailSettingsService: MailSettingsService) {
        this.mailTemplateTypeService.mailTemplateTypes$.subscribe(data => { this.mailTemplateTypes = data; });
    }

    ngOnInit() {
        this.createFormGroup();
        this.getMailTemplateTypesByRecruiterId();
    }

    getMailTemplateTypesByRecruiterId() {
        this.mailSettingsService.getRecruiterMailConfigsByRecruiterId().subscribe(res => this.recruiterMailConfigs = res.body);
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            fromMail: ['', Validators.compose([Validators.required])],
            mailTemplateType: ['', Validators.compose([Validators.required])],
            templateDescription: ['', Validators.compose([Validators.required])]
        });
    }

    showTemplateType() {
        this.showMailTemplateType = true;
    }

    clear() {
        this.clearFields();        
    }

    clearFields() {
        this.formGroup.reset();
        this.formGroup.controls.fromMail.setValue('');
        this.formGroup.controls.mailTemplateType.setValue(''); 
        this.selectedFromMail = null;
        this.selectedTemplateType = null;
        this.selectedMailTemplateId = 0;
        this.addEditButtonTitle = "Save";
    }

    onMailChange(event) {        
        this.selectedFromMail = event.target.value;
        this.getMailTemplate();
    }

    onTemplateTypeChange(event) {
        this.selectedTemplateType = event.target.value;        
        this.getMailTemplate();
    }

    getMailTemplate() {
        if (this.selectedFromMail && this.selectedTemplateType) {
            this.mailSettingsService
                .getMailTemplate(this.selectedFromMail, this.selectedTemplateType)
                .subscribe(res => {                    
                    if (res.body) {
                        this.selectedMailTemplateId = res.body.Id;
                        this.formGroup.controls.templateDescription.setValue(res.body.TemplateText);
                        this.addEditButtonTitle = "Update";
                    } else {
                        this.selectedMailTemplateId = 0;
                        this.formGroup.controls.templateDescription.setValue('');
                        this.addEditButtonTitle = "Save";
                    }
                });
        }
    }

    save() {        
        const model = {
            Id: this.selectedMailTemplateId,
            RecruiterMailConfigId: this.formGroup.controls.fromMail.value,
            MailTemplateTypeId: this.formGroup.controls.mailTemplateType.value,
            TemplateText: this.formGroup.controls.templateDescription.value
        }
        if (this.formGroup.valid) {
            this.mailSettingsService.save(model).subscribe(res => {
                if (res.status === 200) {                    
                    if (this.addEditButtonTitle === "Update") {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail Template Updated', life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mail Template Saved', life: 3000 });
                    }
                    this.clearFields();
                }
            },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mail Template Save Failed', life: 3000 });
                });
        }
    }

}
