import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadFileRoutingModule } from './download-file-routing.module';
import { DownloadFileComponent } from './download-file.component';


@NgModule({
  declarations: [DownloadFileComponent],
  imports: [
    CommonModule,
    DownloadFileRoutingModule
  ]
})
export class DownloadFileModule { }
