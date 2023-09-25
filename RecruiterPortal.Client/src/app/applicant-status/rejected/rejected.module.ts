import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RejectedRoutingModule } from './rejected-routing.module';
import { RejectedComponent } from './rejected.component';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { StatusModule } from '../status/status.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [RejectedComponent],
    imports: [
        CommonModule,
        RejectedRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class RejectedModule { }
