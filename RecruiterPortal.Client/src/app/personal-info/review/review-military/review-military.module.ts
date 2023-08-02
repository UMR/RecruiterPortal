import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

import { ReviewMilitaryComponent } from './review-military.component';
import { MilitaryService } from '../../military/military.service';
import { ToastModule } from 'primeng/toast';
import { LoadingImageModule } from '../../../common/loading-image.module';



@NgModule({
  declarations: [ReviewMilitaryComponent],
  imports: [
    CommonModule,
    LoadingImageModule,
    ToastModule,
  ],
  providers: [MessageService, MilitaryService],
  exports: [ReviewMilitaryComponent]
})
export class ReviewMilitaryModule { }
