import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';

import { PersonalInfoComponent } from './personal-info.component';
import { PersonalInfoRoutingModule } from './personal-info-routing.module';


@NgModule({
  declarations: [PersonalInfoComponent],
  imports: [
    CommonModule,
    StepsModule,
    PersonalInfoRoutingModule
  ]
})
export class PersonalInfoModule { }
