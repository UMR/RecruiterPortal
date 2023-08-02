import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService, ConfirmationService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ReferenceRoutingModule } from './reference-routing.module';
import { ReferenceComponent } from './reference.component';
import { ReferenceService } from './reference.service';



@NgModule({
    declarations: [ReferenceComponent],
    imports: [
        CommonModule,
        LoadingImageModule,
        ToastModule,
        ConfirmDialogModule,
        ReferenceRoutingModule
    ],
    providers: [ReferenceService, MessageService,ConfirmationService]
})
export class ReferenceModule { }
