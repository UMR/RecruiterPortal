import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AddEditCBCRoutingModule } from './add-edit-cbc-routing.module';
import { AddEditCBCComponent } from './add-edit-cbc.component';
import { AddEditCBCService } from './add-edit-cbc.service';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [AddEditCBCComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddEditCBCRoutingModule,
    ToastModule,
    LoadingImageModule,
    InputBehaviorModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [AddEditCBCService]
})
export class AddEditCBCModule { }
