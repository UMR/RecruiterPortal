import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AddEditW9RoutingModule } from './add-edit-w9-routing.module';
import { AddEditW9Component } from './add-edit-w9.component';
import { AddEditW9Service } from './add-edit-w9.service';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
    declarations: [AddEditW9Component],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AddEditW9RoutingModule,
        ToastModule,
        LoadingImageModule,
        InputBehaviorModule,
        CalendarModule,
        DropdownModule,
        AutoCompleteModule,
        InputMaskModule
    ],
    providers: [AddEditW9Service]
})
export class AddEditW9Module { }
