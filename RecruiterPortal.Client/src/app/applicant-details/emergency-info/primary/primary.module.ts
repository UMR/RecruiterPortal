import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimaryRoutingModule } from './primary-routing.module';
import { PrimaryComponent } from './primary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { EmergencyInfoService } from '../emergency-info.service';


@NgModule({
    declarations: [PrimaryComponent],
    imports: [
        CommonModule,
        PrimaryRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule,InputBehaviorModule
  ],
  providers: [MessageService, EmergencyInfoService]
})
export class PrimaryModule { }
