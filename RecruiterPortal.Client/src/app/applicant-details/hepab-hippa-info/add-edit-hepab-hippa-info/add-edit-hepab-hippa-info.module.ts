import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AddEditHepabHippaInfoRoutingModule } from './add-edit-hepab-hippa-info-routing.module';
import { AddEditHepabHippaInfoComponent } from './add-edit-hepab-hippa-info.component';


@NgModule({
  declarations: [AddEditHepabHippaInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddEditHepabHippaInfoRoutingModule,
    ToastModule,
    LoadingImageModule,
    InputBehaviorModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ]
})
export class AddEditHepabHippaInfoModule { }
