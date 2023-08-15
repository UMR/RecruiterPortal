import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobOrdersRoutingModule } from './job-orders-routing.module';
import { JobOrdersComponent } from './job-orders.component';
import { SharedModule } from '../common/shared.module';


@NgModule({
    declarations: [JobOrdersComponent],
    imports: [
        CommonModule,
        JobOrdersRoutingModule,
        SharedModule
    ]
})
export class JobOrdersModule { }
