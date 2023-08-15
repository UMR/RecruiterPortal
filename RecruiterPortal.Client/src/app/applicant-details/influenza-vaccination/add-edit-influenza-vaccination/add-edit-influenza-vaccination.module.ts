import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AddEditInfluenzaVaccinationRoutingModule } from './add-edit-influenza-vaccination-routing.module';
import { AddEditInfluenzaVaccinationComponent } from './add-edit-influenza-vaccination.component';
import { InfluenzaVaccinationService } from '../influenza-vaccination.service';


@NgModule({
  declarations: [AddEditInfluenzaVaccinationComponent],
  imports: [
    CommonModule,
    AddEditInfluenzaVaccinationRoutingModule,
    ReactiveFormsModule,    
    ToastModule,
    LoadingImageModule,
    InputBehaviorModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule    
  ],
  providers: [InfluenzaVaccinationService]
})
export class AddEditInfluenzaVaccinationModule { }
