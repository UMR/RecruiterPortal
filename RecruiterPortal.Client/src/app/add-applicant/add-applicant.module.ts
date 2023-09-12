import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddApplicantRoutingModule } from './add-applicant-routing.module';
import { AddApplicantComponent } from './add-applicant.component';
import { SharedModule } from '../common/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [AddApplicantComponent],
    imports: [
        CommonModule,
        AddApplicantRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        ToastModule
    ],
    providers: [
        MessageService, ConfirmationService
    ]
})
export class AddApplicantModule { }
