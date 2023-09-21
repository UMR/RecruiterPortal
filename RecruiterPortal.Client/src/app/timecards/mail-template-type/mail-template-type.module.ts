import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTemplateTypeComponent } from './mail-template-type.component';

import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule, DialogModule, AutoCompleteModule, MessageService, ConfirmationService } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [MailTemplateTypeComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        TableModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,        
        AutoCompleteModule
    ],
    providers: [ConfirmationService, MessageService],
    exports: [MailTemplateTypeComponent]   
})
export class MailTemplateTypeModule { }
