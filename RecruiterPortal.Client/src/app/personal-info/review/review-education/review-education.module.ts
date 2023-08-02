import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewEducationComponent } from './review-education.component';
import { EditEducationService } from '../../education/edit-education/edit-education.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReviewEducationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ EditEducationService],
  exports: [ReviewEducationComponent]
})
export class ReviewEducationModule { }
