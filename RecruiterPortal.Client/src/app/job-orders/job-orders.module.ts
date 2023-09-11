import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { LoadingImageModule } from '../common/loading-image.module';
import { EditorModule } from 'primeng/editor';
import { AutoCompleteModule } from 'primeng/primeng';

import { JobOrdersRoutingModule } from './job-orders-routing.module';
import { JobOrdersComponent } from './job-orders.component';
import { SharedModule } from '../common/shared.module';


@NgModule({
    declarations: [JobOrdersComponent],
    imports: [
        CommonModule,
        JobOrdersRoutingModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        TableModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        EditorModule,
        AutoCompleteModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class JobOrdersModule { }
