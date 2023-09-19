import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailSettingsRoutingModule } from './mail-settings-routing.module';
import { MailSettingsComponent } from './mail-settings.component';


@NgModule({
  declarations: [MailSettingsComponent],
  imports: [
    CommonModule,
    MailSettingsRoutingModule
  ]
})
export class MailSettingsModule { }
