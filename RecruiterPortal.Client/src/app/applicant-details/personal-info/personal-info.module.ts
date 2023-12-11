import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';

import { PersonalInfoComponent } from './personal-info.component';
import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { EditApplicantInfoService } from './applicant-info/edit-applicant-info/edit-applicant-info.service';


@NgModule({
  declarations: [PersonalInfoComponent],
  imports: [
    CommonModule,
    StepsModule,
    PersonalInfoRoutingModule
    ],
    providers: [EditApplicantInfoService]
})
export class PersonalInfoModule { }
