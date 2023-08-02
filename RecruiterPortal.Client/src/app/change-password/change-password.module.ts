import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ChangePasswordService } from './change-password.service';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../common/shared.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChangePasswordRoutingModule,
    ReactiveFormsModule, LoadingImageModule, ToastModule
  ],
  providers: [MessageService, ChangePasswordService]
})
export class ChangePasswordModule { }
