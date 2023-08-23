import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { RecruiterService } from './recruiter.service';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
    declarations: [RecruiterComponent],
    imports: [
        CommonModule,
        RecruiterRoutingModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        TableModule,
        ConfirmDialogModule,
        CheckboxModule,
        FormsModule,
        DialogModule,
        InputMaskModule,
        InputTextareaModule,
        KeyFilterModule
    ],
    providers: [RecruiterService, ConfirmationService, MessageService]
})
export class RecruiterModule { }
