import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AddApplicantService } from '../../add-applicant/add-applicant.service';


@NgModule({
    declarations: [AgencyComponent],
    imports: [
        CommonModule,
        AgencyRoutingModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        TableModule,
        ConfirmDialogModule,
        CheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        InputMaskModule,
        InputTextareaModule,
        KeyFilterModule
    ],
    providers: [ConfirmationService, MessageService, AddApplicantService]
})
export class AgencyModule { }
