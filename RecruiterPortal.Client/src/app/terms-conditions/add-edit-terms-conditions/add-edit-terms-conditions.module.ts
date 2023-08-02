import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingImageModule } from '../../common/loading-image.module';
import { InputBehaviorModule } from '../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AddEditTermsConditionsRoutingModule } from './add-edit-terms-conditions-routing.module';
import { AddEditTermsConditionsComponent } from './add-edit-terms-conditions.component';
import { TermsConditionsService } from '../terms-conditions.service';



@NgModule({
  declarations: [AddEditTermsConditionsComponent],
  imports: [
    CommonModule,
    AddEditTermsConditionsRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    InputBehaviorModule,
    AutoCompleteModule,
    InputBehaviorModule
  ],
  providers: [TermsConditionsService, MessageService]
})
export class AddEditTermsConditionsModule { }
