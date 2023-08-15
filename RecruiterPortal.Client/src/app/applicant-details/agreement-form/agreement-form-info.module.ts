import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementFormInfoRoutingModule } from './agreement-form-info-routing.module';
import { AgreementFormInfoComponent } from './agreement-form-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { AgreementFormInfoService } from './agreement-form-info.service';
import { ToastModule } from 'primeng/toast';
import { StorageService } from '../../common/services/storage.service';


@NgModule({
  declarations: [AgreementFormInfoComponent],
    imports: [
        CommonModule,
        AgreementFormInfoRoutingModule,
        ReactiveFormsModule, LoadingImageModule, ToastModule
    ],
  providers: [MessageService, AgreementFormInfoService, StorageService]
})
export class AgreementFormInfoModule { }
