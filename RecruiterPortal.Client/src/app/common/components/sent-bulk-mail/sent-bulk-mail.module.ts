import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../common/shared.module';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, AutoCompleteModule, ConfirmationService, MessageService, EditorModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

import { MailTemplateService } from '../../../timecards/mail-template-type/mail-template-type.service';
import { SentBulkMailComponent } from './sent-bulk-mail.component';
import { MailService } from '../../services/mail.service';


@NgModule({
    declarations: [SentBulkMailComponent],
    exports: [SentBulkMailComponent],
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
        EditorModule
    ],
    providers: [ConfirmationService, MessageService, MailTemplateService, MailService]
})
export class SentBulkMailModule {

}
