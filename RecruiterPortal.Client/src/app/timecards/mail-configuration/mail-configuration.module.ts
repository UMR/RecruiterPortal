import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailConfigurationRoutingModule } from './mail-configuration-routing.module';
import { MailConfigurationComponent } from './mail-configuration.component';


@NgModule({
  declarations: [MailConfigurationComponent],
  imports: [
    CommonModule,
    MailConfigurationRoutingModule
  ]
})
export class MailConfigurationModule { }
