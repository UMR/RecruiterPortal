import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CBCFormInfoRoutingModule } from './cbc-form-info-routing.module';
import { CBCFormInfoComponent } from './cbc-form-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { CBCFormInfoService } from './cbc-form-info.service';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [CBCFormInfoComponent],
    imports: [
        CommonModule,
        CBCFormInfoRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule
    ],
    providers: [MessageService, CBCFormInfoService]
})
export class CBCFormInfoModule { }
