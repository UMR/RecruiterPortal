import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferedRoutingModule } from './offered-routing.module';
import { OfferedComponent } from './offered.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { StatusModule } from '../status/status.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
    declarations: [OfferedComponent],
    imports: [
        CommonModule,
        OfferedRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class OfferedModule { }
