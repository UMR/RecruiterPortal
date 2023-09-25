import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalInterviewRoutingModule } from './final-interview-routing.module';
import { FinalInterviewComponent } from './final-interview.component';
import { DialogModule, MessageService } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import { StatusModule } from '../status/status.module';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../../common/shared.module';


@NgModule({
    declarations: [FinalInterviewComponent],
    imports: [
        CommonModule,
        FinalInterviewRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class FinalInterviewModule { }
