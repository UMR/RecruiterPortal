import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComUploadFileComponent } from './com-upload-file.component';

import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TableModule } from 'primeng/components/table/table';



@NgModule({
    declarations: [ComUploadFileComponent],
    imports: [
        CommonModule,
        LoadingImageModule,
        ToastModule,
        FileUploadModule,
        DropdownModule,
        TableModule
    ],
    providers: [MessageService],
    exports: [ComUploadFileComponent]
})
export class ComUploadFileModule { }
