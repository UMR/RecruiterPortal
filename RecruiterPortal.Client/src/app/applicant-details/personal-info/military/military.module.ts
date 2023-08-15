import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageModule } from '../../../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { MilitaryRoutingModule } from './military-routing.module';
import { MilitaryComponent } from './military.component';
import { MilitaryService } from './military.service';


@NgModule({
    declarations: [MilitaryComponent],
    imports: [
        CommonModule,
        LoadingImageModule,
        ToastModule,
        MilitaryRoutingModule
    ],
    providers: [MessageService, MilitaryService]
})
export class MilitaryModule { }
