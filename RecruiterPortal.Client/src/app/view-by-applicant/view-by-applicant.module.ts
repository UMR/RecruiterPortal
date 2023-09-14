import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/components/table/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/components/toast/toast';

import { ViewByApplicantRoutingModule } from './view-by-applicant-routing.module';
import { ViewByApplicantComponent } from './view-by-applicant.component';
import { ViewByApplicantService } from './view-by-applicant.service';
import { SharedModule } from '../common/shared.module';
import { StorageService } from '../common/services/storage.service';
import { DialogModule } from 'primeng/dialog';
import { StatusModule } from '../applicant-status/status/status.module';


@NgModule({
    declarations: [
        ViewByApplicantComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoadingImageModule,
        ToastModule,
        DropdownModule,
        AutoCompleteModule,
        TableModule,
        ViewByApplicantRoutingModule,
        SharedModule,
        DialogModule,
        StatusModule
    ],
    providers: [ViewByApplicantService, MessageService, StorageService]
})
export class ViewByApplicantModule { }
