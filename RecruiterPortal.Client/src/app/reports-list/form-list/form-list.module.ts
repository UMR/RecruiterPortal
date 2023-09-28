import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormListRoutingModule } from './form-list-routing.module';
import { FormListComponent } from './form-list.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/primeng';


@NgModule({
    declarations: [FormListComponent],
    imports: [
        CommonModule,
        FormListRoutingModule,
        SharedModule,
        TableModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class FormListModule { }
