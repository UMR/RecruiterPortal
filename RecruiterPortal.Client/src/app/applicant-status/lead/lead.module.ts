import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadComponent } from './lead.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { StatusModule } from '../status/status.module';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    declarations: [LeadComponent],
    imports: [
        CommonModule,
        LeadRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule
    ]
})
export class LeadModule { }
