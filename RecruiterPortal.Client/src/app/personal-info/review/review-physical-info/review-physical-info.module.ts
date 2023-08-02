import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewPhysicalInfoComponent } from './review-physical-info.component';
import { ReviewPhysicalInfoService } from './review-physical-info.service';


@NgModule({
  declarations: [ReviewPhysicalInfoComponent],
  imports: [
    CommonModule
  ],
  providers: [ReviewPhysicalInfoService],
  exports: [ReviewPhysicalInfoComponent]
})
export class ReviewPhysicalInfoModule { }
