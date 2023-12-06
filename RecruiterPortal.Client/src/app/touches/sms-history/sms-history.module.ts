import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ConfirmationService, MessageService } from 'primeng/primeng';

import { SmsHistoryService } from './sms-history.service';
import { SmsHistoryComponent } from './sms-history.component';
import { SmsHistoryRoutingModule } from './sms-history-routing.module';


@NgModule({
    declarations: [SmsHistoryComponent],
    exports: [SmsHistoryComponent],
    imports: [
        CommonModule,
        SharedModule,
        LoadingImageModule,
        SmsHistoryRoutingModule
    ],
    providers: [ConfirmationService, MessageService, SmsHistoryService]
})
export class SmsHistoryModule {

}
