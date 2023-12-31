import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../common/shared.module';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; 
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
    declarations: [CalendarComponent],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        SharedModule,
        FormsModule,
        FullCalendarModule,
        DialogModule,
        ReactiveFormsModule,
        ToastModule,
        ButtonModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class CalendarModule { }
