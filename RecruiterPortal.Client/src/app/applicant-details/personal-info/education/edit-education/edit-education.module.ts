import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditEducationRoutingModule } from './edit-education-routing.module';
import { EditEducationComponent } from './edit-education.component';
import { EditEducationService } from './edit-education.service';
import { LoadingImageModule } from '../../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../../common/input-behavior.module';

@NgModule({
    declarations: [EditEducationComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EditEducationRoutingModule,
        ToastModule,
        LoadingImageModule,
        InputBehaviorModule,
        CalendarModule,
        DropdownModule,
    ],
    providers: []
})
export class EditEducationModule { }
