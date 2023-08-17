import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { SharedModule } from '../../common/shared.module';
import { LoadingImageModule } from '../../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/components/table/table';


@NgModule({
    declarations: [AgencyComponent],
    imports: [
        CommonModule,
        AgencyRoutingModule,
        SharedModule,
        LoadingImageModule,
        ToastModule,
        TableModule
    ]
})
export class AgencyModule { }
