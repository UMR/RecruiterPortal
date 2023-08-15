import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';
import { ReviewApplicantInfoModule } from './review-applicant-info/review-applicant-info.module';
import { ReviewPhysicalInfoModule } from './review-physical-info/review-physical-info.module';
import { ReviewEducationModule } from './review-education/review-education.module';
import { ReviewEmploymentModule } from './review-employment/review-employment.module';
import { ReviewMilitaryModule } from './review-military/review-military.module';
import { ReviewReferenceModule } from './review-reference/review-reference.module';


@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    ReviewApplicantInfoModule,
    ReviewPhysicalInfoModule,
    ReviewEducationModule,
    ReviewEmploymentModule,
    ReviewMilitaryModule,
    ReviewReferenceModule
  ]
})
export class ReviewModule { }
