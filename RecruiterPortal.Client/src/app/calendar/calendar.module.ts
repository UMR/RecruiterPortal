import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../common/shared.module';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CalendarComponent],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        SharedModule,
        FormsModule,
        FullCalendarModule
    ]
})
export class CalendarModule { }
