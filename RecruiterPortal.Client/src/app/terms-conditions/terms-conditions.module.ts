import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { TermsConditionsRoutingModule } from './terms-conditions-routing.module';
import { TermsConditionsComponent } from './terms-conditions.component';
import { TermsConditionsService } from './terms-conditions.service';


@NgModule({
  declarations: [TermsConditionsComponent],
  imports: [
    CommonModule,
    TermsConditionsRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule
  ],
  providers: [MessageService, TermsConditionsService]
})
export class TermsConditionsModule { }
