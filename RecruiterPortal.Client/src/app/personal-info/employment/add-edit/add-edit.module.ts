import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';

import { AddEditRoutingModule } from './add-edit-routing.module';
import { AddEditComponent } from './add-edit.component';
import { AddEditService } from './add-edit.service';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { CompareValidatorModule } from '../../../common/compare-validator.module';


@NgModule({
  declarations: [AddEditComponent],
  imports: [
    CommonModule,
    AddEditRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule,
    CalendarModule,
    InputBehaviorModule,
    AutoCompleteModule,
    CompareValidatorModule
  ],
  providers: [AddEditService, MessageService]
})
export class AddEditModule { }
