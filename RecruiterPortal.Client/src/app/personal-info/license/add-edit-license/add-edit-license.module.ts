import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LicenseService } from '../license.service';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ToastModule } from 'primeng/toast';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';

import { AddEditLicenseComponent } from './add-edit-license.component';
import { AddEditLicenseRoutingModule } from './add-edit-license-routing.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [AddEditLicenseComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputBehaviorModule,
        LoadingImageModule,
        ToastModule,
        TooltipModule,
        CalendarModule,
        AddEditLicenseRoutingModule
    ],
    providers: [MessageService, LicenseService]
})
export class AddEditLicenseModule { }
