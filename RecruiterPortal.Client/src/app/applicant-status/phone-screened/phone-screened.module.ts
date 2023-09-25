import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneScreenedRoutingModule } from './phone-screened-routing.module';
import { PhoneScreenedComponent } from './phone-screened.component';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { StatusModule } from '../status/status.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [PhoneScreenedComponent],
    imports: [
        CommonModule,
        PhoneScreenedRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class PhoneScreenedModule { }
