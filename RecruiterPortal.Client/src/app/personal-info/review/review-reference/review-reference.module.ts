import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewReferenceComponent } from './review-reference.component';
import { ReferenceService } from '../../reference/reference.service';


@NgModule({
  declarations: [ReviewReferenceComponent],
  imports: [
    CommonModule
  ],
  providers: [ReferenceService],
  exports: [ReviewReferenceComponent]
})
export class ReviewReferenceModule { }
