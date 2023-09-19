import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTemplateTypeComponent } from './mail-template-type.component';



@NgModule({
  declarations: [MailTemplateTypeComponent],
  imports: [
    CommonModule
    ],
    exports: [MailTemplateTypeComponent]
})
export class MailTemplateTypeModule { }
