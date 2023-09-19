import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailSettingsRoutingModule } from './mail-settings-routing.module';
import { MailSettingsComponent } from './mail-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { DropdownModule, AutoCompleteModule, SharedModule, DialogModule, ConfirmDialogModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';


@NgModule({
    declarations: [MailSettingsComponent],
    imports: [
        CommonModule,
        MailSettingsRoutingModule,
        ReactiveFormsModule,
        LoadingImageModule,
        ToastModule,
        DropdownModule,
        AutoCompleteModule,
        TableModule,
        SharedModule,
        DialogModule,
        ConfirmDialogModule
    ]
})
export class MailSettingsModule { }
