import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondaryEditRoutingModule } from './edit-routing.module';
import { SecondaryEditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputBehaviorModule } from '../../../../common/input-behavior.module';
import { EmergencyInfoService } from '../../emergency-info.service';


@NgModule({
    declarations: [SecondaryEditComponent],
    imports: [
        CommonModule,
        SecondaryEditRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule, InputBehaviorModule
    ],
  providers: [MessageService, EmergencyInfoService]
})
export class SecondaryEditModule { }
