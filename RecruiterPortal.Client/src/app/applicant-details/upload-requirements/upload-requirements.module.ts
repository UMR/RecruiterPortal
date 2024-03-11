import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRequirementsRoutingModule } from './upload-requirements-routing.module';
import { UploadRequirementsComponent } from './upload-requirements.component';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [UploadRequirementsComponent],
  imports: [
    CommonModule,
    UploadRequirementsRoutingModule,
    CommonModule,
    LoadingImageModule,
    ToastModule,
    FileUploadModule,
    DropdownModule,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class UploadRequirementsModule { }
