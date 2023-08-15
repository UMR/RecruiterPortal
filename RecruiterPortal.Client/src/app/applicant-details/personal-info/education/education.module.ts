import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education.component';
import { EditEducationService } from './edit-education/edit-education.service';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
    declarations: [EducationComponent],
    imports: [
        CommonModule,
        EducationRoutingModule,
        ToastModule,
        LoadingImageModule,
        ReactiveFormsModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, EditEducationService, ConfirmationService]
})
export class EducationModule { }
