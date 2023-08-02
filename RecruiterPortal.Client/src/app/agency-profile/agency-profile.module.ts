import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/components/toast/toast';
import { SharedModule } from '../common/shared.module';

import { AgencyProfileRoutingModule } from './agency-profile-routing.module';
import { AgencyProfileComponent } from './agency-profile.component';
import { AgencyProfileService } from './agency-profile.service';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [AgencyProfileComponent],
  imports: [
    CommonModule,
    AgencyProfileRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule,
    DropdownModule,
    AutoCompleteModule,
    SharedModule,
    InputMaskModule
  ],
  providers: [AgencyProfileService,MessageService]
})
export class AgencyProfileModule { }
