import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../../../common/loading-image.module';
import { InputBehaviorModule } from '../../../common/input-behavior.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { AddEditReferenceRoutingModule } from './add-edit-reference-routing.module';
import { AddEditReferenceComponent } from './add-edit-reference.component';
import { ReferenceService } from '../reference.service';


@NgModule({
    declarations: [AddEditReferenceComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputBehaviorModule,
        LoadingImageModule,
        ToastModule,
        TooltipModule,
        AddEditReferenceRoutingModule
    ],
    providers: [MessageService, ReferenceService]
})
export class AddEditReferenceModule { }
