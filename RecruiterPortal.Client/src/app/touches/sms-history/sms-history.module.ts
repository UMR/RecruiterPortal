import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, AutoCompleteModule, ConfirmationService, MessageService, EditorModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

import { SmsHistoryService } from './sms-history.service';
import { SmsHistoryComponent } from './sms-history.component';


@NgModule({
    declarations: [SmsHistoryComponent],
    exports: [SmsHistoryComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        ChipsModule
    ],
    providers: [ConfirmationService, MessageService, SmsHistoryService]
})
export class SmsHistoryModule {

}
