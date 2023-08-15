import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { HepabHippaInfoRoutingModule } from './hepab-hippa-info-routing.module';
import { HepabHippaInfoComponent } from './hepab-hippa-info.component';
import { HepabHippaInfoService } from './hepab-hippa-info.service';


@NgModule({
  declarations: [HepabHippaInfoComponent],
  imports: [
    CommonModule,
    HepabHippaInfoRoutingModule,
    ToastModule,
    LoadingImageModule
  ],
  providers: [MessageService, HepabHippaInfoService]
})
export class HepabHippaInfoModule { }
