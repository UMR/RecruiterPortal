import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageModule } from '../../../../common/loading-image.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { EditMilitaryService } from './edit-military.service';
import { InputBehaviorModule } from '../../../../common/input-behavior.module';
import { EditMilitaryRoutingModule } from './edit-military-routing.module';
import { EditMilitaryComponent } from './edit-military.component';
import { CompareValidatorModule } from '../../../../common/compare-validator.module';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
    declarations: [EditMilitaryComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingImageModule,
        CalendarModule,
        ToastModule,
        TooltipModule,
        EditMilitaryRoutingModule,
        InputBehaviorModule,
        CompareValidatorModule,
        CheckboxModule
    ],
    providers: [MessageService,EditMilitaryService]
})

export class EditMilitaryModule { }
