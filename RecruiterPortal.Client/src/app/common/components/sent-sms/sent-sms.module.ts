import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../common/shared.module';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, AutoCompleteModule, ConfirmationService, MessageService, EditorModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

import { SentSMSService } from './sent-sms.service';
import { SentSMSComponent } from './sent-sms.component';


@NgModule({
    declarations: [SentSMSComponent],
    exports: [SentSMSComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [ConfirmationService, MessageService, SentSMSService]
})
export class SentSMSModule {

}
