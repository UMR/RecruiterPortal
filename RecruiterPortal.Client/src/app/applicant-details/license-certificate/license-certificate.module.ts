import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { LicenseCertificateRoutingModule } from './license-certificate-routing.module';
import { LicenseCertificateComponent } from './license-certificate.component';
import { LoadingImageModule } from '../../common/loading-image.module';
import { LicenseCertificateService } from './license-certificate.service';


@NgModule({
    declarations: [LicenseCertificateComponent],
    imports: [
        CommonModule,
        LicenseCertificateRoutingModule,
        ReactiveFormsModule, LoadingImageModule,
        ConfirmDialogModule, ToastModule
    ],
    providers: [MessageService, LicenseCertificateService]
})
export class LicenseCertificateModule { }
