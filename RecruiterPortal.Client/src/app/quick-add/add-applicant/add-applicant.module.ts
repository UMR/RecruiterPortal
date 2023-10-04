import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddApplicantComponent } from './add-applicant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputBehaviorModule } from '../../common/input-behavior.module';


@NgModule({
    declarations: [AddApplicantComponent],
    exports: [AddApplicantComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToastModule,
        InputBehaviorModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class AddApplicantModule { }
