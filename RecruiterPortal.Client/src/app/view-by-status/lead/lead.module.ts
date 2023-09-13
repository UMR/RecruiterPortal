import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadComponent } from './lead.component';
import { SharedModule } from '../../common/shared.module';


@NgModule({
    declarations: [LeadComponent],
    imports: [
        CommonModule,
        LeadRoutingModule,
        SharedModule
    ]
})
export class LeadModule { }
