import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploymentRoutingModule } from './employment-routing.module';
import { EmploymentComponent } from './employment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { EmploymentService } from './employment.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    declarations: [EmploymentComponent],
    imports: [
        CommonModule,
        EmploymentRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule, ConfirmDialogModule
    ],
    providers: [MessageService, EmploymentService, ConfirmationService]
})
export class EmploymentModule { }
