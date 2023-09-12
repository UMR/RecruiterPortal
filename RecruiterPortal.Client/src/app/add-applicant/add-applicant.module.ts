import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddApplicantRoutingModule } from './add-applicant-routing.module';
import { AddApplicantComponent } from './add-applicant.component';
import { SharedModule } from '../common/shared.module';


@NgModule({
    declarations: [AddApplicantComponent],
    imports: [
        CommonModule,
        AddApplicantRoutingModule,
        SharedModule
    ]
})
export class AddApplicantModule { }
