import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LicenseCertificateService } from '../license-certificate.service';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AddEditLicenseCertificateComponent } from './add-edit-license-certificate.component';
import { AddEditLicenseCertificateRoutingModule } from './add-edit-license-certificate-routing.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [AddEditLicenseCertificateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputBehaviorModule,
    LoadingImageModule,
    AutoCompleteModule,
    ToastModule,
    FileUploadModule,
    TooltipModule,
    CalendarModule,
    AddEditLicenseCertificateRoutingModule
  ],
  providers: [MessageService, LicenseCertificateService]
})
export class AddEditLicenseCertificateModule { }
