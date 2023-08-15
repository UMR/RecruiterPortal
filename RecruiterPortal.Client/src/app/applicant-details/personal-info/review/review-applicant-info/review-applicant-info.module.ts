import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewApplicantInfoComponent } from './review-applicant-info.component';
import { ReviewApplicantInfoService } from './review-applicant-info.service';


@NgModule({
  declarations: [ReviewApplicantInfoComponent],
  imports: [
    CommonModule
  ],
  providers: [ReviewApplicantInfoService],
  exports: [ReviewApplicantInfoComponent]
})
export class ReviewApplicantInfoModule { }
