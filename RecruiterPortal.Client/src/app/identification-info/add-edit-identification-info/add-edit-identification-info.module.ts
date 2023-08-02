import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IdentificationInfoService } from '../identification-info.service';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { LoadingImageModule } from '../../common/loading-image.module';
import { InputBehaviorModule } from '../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AddEditIdentificationInfoComponent } from './add-edit-identification-info.component';
import { AddEditIdentificationInfoRoutingModule } from './add-edit-identification-info-routing.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [AddEditIdentificationInfoComponent],
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
    AddEditIdentificationInfoRoutingModule
  ],
  providers: [MessageService, IdentificationInfoService]
})
export class AddEditIdentificationInfoModule { }
