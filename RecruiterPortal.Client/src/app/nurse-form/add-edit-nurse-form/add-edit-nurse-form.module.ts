import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingImageModule } from '../../common/loading-image.module';
import { InputBehaviorModule } from '../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AddEditNurseFormRoutingModule } from './add-edit-nurse-form-routing.module';
import { AddEditNurseFormComponent } from './add-edit-nurse-form.component';
import { NurseFormService } from '../nurse-form.service';


@NgModule({
  declarations: [AddEditNurseFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddEditNurseFormRoutingModule,
    ToastModule,
    LoadingImageModule,
    InputBehaviorModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [NurseFormService]
})
export class AddEditNurseFormModule { }
