import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, AutoCompleteModule, ConfirmationService, MessageService } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatusComponent } from './status.component';
import { StatusService } from './status.service';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';


@NgModule({    
    declarations: [StatusComponent],
    exports: [StatusComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,        
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        FileUploadModule
    ],
    providers: [ConfirmationService, MessageService, StatusService]
})
export class StatusModule {

}
