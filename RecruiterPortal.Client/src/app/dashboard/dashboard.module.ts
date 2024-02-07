import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../common/shared.module';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from './dashboard.service';
import { FullCalendarModule } from 'primeng/fullcalendar';


@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        ChartModule,
        FullCalendarModule
    ],
    providers: [DashboardService]
})
export class DashboardModule { }
