import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationCenterRoutingModule } from './communication-center-routing.module';
import { CommunicationCenterComponent } from './communication-center.component';
import { SharedModule } from '../common/shared.module';


@NgModule({
    declarations: [CommunicationCenterComponent],
    imports: [
        CommonModule,
        CommunicationCenterRoutingModule,
        SharedModule
    ]
})
export class CommunicationCenterModule { }
