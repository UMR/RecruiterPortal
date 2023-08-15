import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageModule } from '../../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './license.component';
import { LicenseService } from './license.service';


@NgModule({
  declarations: [LicenseComponent],
  imports: [
      CommonModule,
      LoadingImageModule,
      ToastModule,
      ConfirmDialogModule,
      LicenseRoutingModule
    ],
    providers: [LicenseService, MessageService, ConfirmationService]
})
export class LicenseModule { }
