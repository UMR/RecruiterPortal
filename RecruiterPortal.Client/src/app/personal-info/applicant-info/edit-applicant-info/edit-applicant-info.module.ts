import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

import { EditApplicantInfoRoutingModule } from './edit-applicant-info-routing.module';
import { EditApplicantInfoComponent } from './edit-applicant-info.component';
import { EditApplicantInfoService } from './edit-applicant-info.service';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [EditApplicantInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditApplicantInfoRoutingModule,
    ToastModule,
    LoadingImageModule,
    AutoCompleteModule,
    InputBehaviorModule,
    CalendarModule,
    InputMaskModule
  ],
  providers: [EditApplicantInfoService]
})
export class EditApplicantInfoModule { }
