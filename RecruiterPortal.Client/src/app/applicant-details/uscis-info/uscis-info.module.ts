import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { UscisInfoRoutingModule } from './uscis-info-routing.module';
import { UscisInfoComponent } from './uscis-info.component';
import { USCISInfoService } from './uscis-info.service';



@NgModule({
  declarations: [UscisInfoComponent],
  imports: [
    CommonModule,
    LoadingImageModule,
    ToastModule,
    UscisInfoRoutingModule
  ],
  providers: [MessageService, USCISInfoService]
})
export class UscisInfoModule { }
