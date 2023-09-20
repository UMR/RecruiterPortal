import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../common/shared.module';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from './dashboard.service';


@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        ChartModule
    ],
    providers: [DashboardService]
})
export class DashboardModule { }
