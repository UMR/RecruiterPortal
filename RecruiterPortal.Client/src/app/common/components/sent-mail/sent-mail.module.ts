import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../common/shared.module';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, AutoCompleteModule, ConfirmationService, MessageService, EditorModule, FileUploadModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

import { SentMailComponent } from './sent-mail.component';
import { MailTemplateService } from '../../../timecards/mail-template-type/mail-template-type.service';
import { MailService } from '../../services/mail.service';


@NgModule({
    declarations: [SentMailComponent],
    exports: [SentMailComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        ChipsModule,
        EditorModule,
        FileUploadModule
    ],
    providers: [ConfirmationService, MessageService, MailService, MailTemplateService]
})
export class SentMailModule {

}
