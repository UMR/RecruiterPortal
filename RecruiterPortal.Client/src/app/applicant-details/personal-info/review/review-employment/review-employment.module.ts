import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewEmploymentComponent } from './review-employment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewEmploymentService } from './review-employment.service';


@NgModule({
  declarations: [ReviewEmploymentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ReviewEmploymentService],
  exports: [ReviewEmploymentComponent]
})
export class ReviewEmploymentModule { }
