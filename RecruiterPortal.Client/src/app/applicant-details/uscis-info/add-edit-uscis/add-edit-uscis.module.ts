import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AddEditUscisRoutingModule } from './add-edit-uscis-routing.module';
import { AddEditUscisComponent } from './add-edit-uscis.component';


@NgModule({
  declarations: [AddEditUscisComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddEditUscisRoutingModule,
    ToastModule,
    LoadingImageModule,
    InputBehaviorModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ]
})
export class AddEditUscisModule { }
