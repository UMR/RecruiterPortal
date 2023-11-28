import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../common/shared.module';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, AutoCompleteModule, ConfirmationService, MessageService } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

import { SentMailService } from './sent-mail.service';
import { SentMailComponent } from './sent-mail.component';


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
        ChipsModule
    ],
    providers: [ConfirmationService, MessageService, SentMailService]
})
export class SentMailModule {

}
