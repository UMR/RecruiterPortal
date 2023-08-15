import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentificationInfoRoutingModule } from './identification-info-routing.module';
import { IdentificationInfoComponent } from './identification-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IdentificationInfoService } from './identification-info.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
    declarations: [IdentificationInfoComponent],
    imports: [
        CommonModule,
        IdentificationInfoRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService, IdentificationInfoService]
})
export class IdentificationInfoModule { }
