import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AddEditAgreementRoutingModule } from './add-edit-agreement-routing.module';
import { AddEditAgreementComponent } from './add-edit-agreement.component';
import { AddEditAgreementService } from './add-edit-agreement.service';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [AddEditAgreementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddEditAgreementRoutingModule,
    ToastModule,
    LoadingImageModule,
    InputBehaviorModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [AddEditAgreementService]
})
export class AddEditAgreementModule { }
