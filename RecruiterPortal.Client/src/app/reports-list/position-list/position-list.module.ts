import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionListRoutingModule } from './position-list-routing.module';
import { PositionListComponent } from './position-list.component';
import { PositionListService } from './position-list.service';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule, CheckboxModule, FileUploadModule, AutoCompleteModule } from 'primeng/primeng';
import { LoadingImageModule } from '../../common/loading-image.module';



@NgModule({
    declarations: [PositionListComponent],
    imports: [
        CommonModule,
        PositionListRoutingModule,
        SharedModule,
        TableModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        ConfirmDialogModule,
        CheckboxModule,
        FileUploadModule,
        LoadingImageModule,
        AutoCompleteModule
    ],
    providers: [ConfirmationService, MessageService, PositionListService]
})
export class PositionListModule { }
