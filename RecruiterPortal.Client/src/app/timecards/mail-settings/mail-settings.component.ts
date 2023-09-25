import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MailSettingsService } from './mail-settings.service';

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

    constructor(private fb: FormBuilder, private messageService: MessageService,
        private confirmationService: ConfirmationService, private mailSettingsService: MailSettingsService) {        
    }

    ngOnInit() {
        this.createFormGroup();
        this.getMailTemplateTypesByRecruiterId();
    }

    getMailTemplateTypesByRecruiterId() {
        this.mailSettingsService.getMailTemplateTypesByRecruiterId().subscribe(res => this.mailTemplateTypes = res.body);
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

}
