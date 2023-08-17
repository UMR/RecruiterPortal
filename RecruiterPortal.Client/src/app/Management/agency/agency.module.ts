import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { SharedModule } from '../../common/shared.module';


@NgModule({
    declarations: [AgencyComponent],
    imports: [
        CommonModule,
        AgencyRoutingModule,
        SharedModule
    ]
})
export class AgencyModule { }
