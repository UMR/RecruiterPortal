import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperScreenedRoutingModule } from './paper-screened-routing.module';
import { PaperScreenedComponent } from './paper-screened.component';
import { TableModule } from 'primeng/components/table/table';
import { SharedModule } from '../../common/shared.module';
import { StatusModule } from '../status/status.module';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [PaperScreenedComponent],
    imports: [
        CommonModule,
        PaperScreenedRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class PaperScreenedModule { }
