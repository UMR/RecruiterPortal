import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddApplicantComponent } from './add-applicant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [AddApplicantComponent],
    exports: [AddApplicantComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToastModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class AddApplicantModule { }
