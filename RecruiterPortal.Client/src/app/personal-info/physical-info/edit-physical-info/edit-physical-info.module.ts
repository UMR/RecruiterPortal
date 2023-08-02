import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

import { EditPhysicalInfoRoutingModule } from './edit-physical-info-routing.module';
import { EditPhysicalInfoComponent } from './edit-physical-info.component';
import { EditPhysicalInfoService } from './edit-physical-info.service';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [EditPhysicalInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditPhysicalInfoRoutingModule,
    ToastModule,
    LoadingImageModule,
    AutoCompleteModule,
    InputBehaviorModule,
    CalendarModule,
    InputMaskModule
  ],
  providers: [EditPhysicalInfoService]
})
export class EditPhysicalInfoModule { }
