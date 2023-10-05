import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailConfigurationRoutingModule } from './mail-configuration-routing.module';
import { MailConfigurationComponent } from './mail-configuration.component';
import { LoadingImageModule } from '../../common/loading-image.module';
import { SharedModule } from '../../common/shared.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule, DialogModule, AutoCompleteModule, ConfirmationService, MessageService } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [MailConfigurationComponent],
    imports: [
        CommonModule,
        MailConfigurationRoutingModule,
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
    providers: [ConfirmationService, MessageService]
})
export class MailConfigurationModule { }
