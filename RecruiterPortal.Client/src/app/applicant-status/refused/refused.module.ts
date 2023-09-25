import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefusedRoutingModule } from './refused-routing.module';
import { RefusedComponent } from './refused.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { StatusModule } from '../status/status.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
    declarations: [RefusedComponent],
    imports: [
        CommonModule,
        RefusedRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class RefusedModule { }
