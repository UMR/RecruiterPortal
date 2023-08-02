import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W9FormInfoRoutingModule } from './w9-form-info-routing.module';
import { W9FormInfoComponent } from './w9-form-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { W9FormInfoService } from './w9-form-info.service';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [W9FormInfoComponent],
    imports: [
        CommonModule,
        W9FormInfoRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule
    ],
  providers: [MessageService, W9FormInfoService]
})
export class W9FormInfoModule { }
