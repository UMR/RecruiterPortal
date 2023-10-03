import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterHistoryRoutingModule } from './recruiter-history-routing.module';
import { RecruiterHistoryComponent } from './recruiter-history.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RecruiterHistoryComponent],
    imports: [
        CommonModule,
        RecruiterHistoryRoutingModule,
        SharedModule,
        TableModule,
        ToastModule,
        ReactiveFormsModule
    ],
    providers: [MessageService]
})
export class RecruiterHistoryModule { }
