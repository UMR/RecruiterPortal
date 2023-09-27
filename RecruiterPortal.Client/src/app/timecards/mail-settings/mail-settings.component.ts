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
    private selectedFromMail: string;
    private selectedTemplateType: string;
    public mailTemplateId: number = 0;

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
        this.formGroup.reset();
        this.formGroup.controls.fromMail.setValue('');
        this.formGroup.controls.mailTemplateType.setValue('');        
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

        }
    }

    save() {        
        const model = {
            Id: 0,
            RecruiterMailConfigId: this.formGroup.controls.fromMail.value,
            MailTemplateTypeId: this.formGroup.controls.mailTemplateType.value,
            TemplateText: this.formGroup.controls.templateDescription.value
        }
        if (this.formGroup.valid) {
            this.mailSettingsService.save(model).subscribe(res => {
                if (res.status === 200) {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mail Template Type Saved', life: 3000 });
                }
            },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mail Template Type Save Failed', life: 3000 });
                });
        }
    }

}
