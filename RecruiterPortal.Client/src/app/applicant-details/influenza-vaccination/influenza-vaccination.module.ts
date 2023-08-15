import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { InfluenzaVaccinationRoutingModule } from './influenza-vaccination-routing.module';
import { InfluenzaVaccinationComponent } from './influenza-vaccination.component';
import { InfluenzaVaccinationService } from './influenza-vaccination.service';


@NgModule({
  declarations: [InfluenzaVaccinationComponent],
  imports: [
    CommonModule,
    InfluenzaVaccinationRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule
  ],
  providers: [MessageService, InfluenzaVaccinationService]
})
export class InfluenzaVaccinationModule { }
