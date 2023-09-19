import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailSettingsRoutingModule } from './mail-settings-routing.module';
import { MailSettingsComponent } from './mail-settings.component';
import { MailTemplateTypeModule } from '../mail-template-type/mail-template-type.module';

import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { DialogModule, ConfirmDialogModule, EditorModule, ConfirmationService, MessageService } from 'primeng/primeng';
import { SharedModule } from '../../common/shared.module';



@NgModule({
    declarations: [MailSettingsComponent],
    imports: [
        CommonModule,
        MailSettingsRoutingModule,
        MailTemplateTypeModule,
        ReactiveFormsModule,
        LoadingImageModule,
        ToastModule,        
        SharedModule,
        DialogModule,
        ConfirmDialogModule,
        EditorModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class MailSettingsModule { }
