import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseFormRoutingModule } from './nurse-form-routing.module';
import { NurseFormComponent } from './nurse-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { NurseFormService } from './nurse-form.service';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [NurseFormComponent],
  imports: [
    CommonModule,
    NurseFormRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule
  ],
  providers: [MessageService, NurseFormService]
})
export class NurseFormModule { }
