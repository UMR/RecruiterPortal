import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../common/shared.module';

import { ScheduleAllModule, RecurrenceEditorAllModule } from "@syncfusion/ej2-angular-schedule";
import {
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule
} from "@syncfusion/ej2-angular-calendars";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CalendarComponent],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        SharedModule,
        ScheduleAllModule,
        RecurrenceEditorAllModule,
        DatePickerAllModule,
        TimePickerAllModule,
        DateTimePickerAllModule,
        FormsModule
    ]
})
export class CalendarModule { }
