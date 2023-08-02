import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRequirementsRoutingModule } from './upload-requirements-routing.module';
import { UploadRequirementsComponent } from './upload-requirements.component';


@NgModule({
  declarations: [UploadRequirementsComponent],
  imports: [
    CommonModule,
    UploadRequirementsRoutingModule
  ]
})
export class UploadRequirementsModule { }
