import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmergencyInfoRoutingModule } from './emergency-info-routing.module';
import { EmergencyInfoComponent } from './emergency-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { EmergencyInfoService } from './emergency-info.service';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [EmergencyInfoComponent],
    imports: [
        CommonModule,
        EmergencyInfoRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule
    ],
    providers: [MessageService, EmergencyInfoService]
})
export class EmergencyInfoModule { }
