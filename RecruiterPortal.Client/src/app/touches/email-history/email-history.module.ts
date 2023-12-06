import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ConfirmationService, MessageService } from 'primeng/primeng';

import { EmailHistoryService } from './email-history.service';
import { EmailHistoryComponent } from './email-history.component';
import { EmailHistoryRoutingModule } from './email-history-routing.module';
import { TableModule } from 'primeng/components/table/table';


@NgModule({
    declarations: [EmailHistoryComponent],
    exports: [EmailHistoryComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoadingImageModule,
        EmailHistoryRoutingModule,
        TableModule
    ],
    providers: [ConfirmationService, MessageService, EmailHistoryService]
})
export class EmailHistoryModule {

}
