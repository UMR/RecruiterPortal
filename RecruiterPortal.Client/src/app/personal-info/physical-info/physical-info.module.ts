import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { PhysicalInfoRoutingModule } from './physical-info-routing.module';
import { PhysicalInfoComponent } from './physical-info.component';
import { PhysicalInfoService } from './physical-info.service';

@NgModule({
  declarations: [PhysicalInfoComponent],
  imports: [
    CommonModule,
    LoadingImageModule,
    ToastModule,
    PhysicalInfoRoutingModule
  ],
  providers: [MessageService, PhysicalInfoService]
})
export class PhysicalInfoModule { }
