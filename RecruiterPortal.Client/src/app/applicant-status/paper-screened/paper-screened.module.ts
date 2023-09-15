import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperScreenedRoutingModule } from './paper-screened-routing.module';
import { PaperScreenedComponent } from './paper-screened.component';
import { TableModule } from 'primeng/components/table/table';
import { SharedModule } from '../../common/shared.module';


@NgModule({
    declarations: [PaperScreenedComponent],
    imports: [
        CommonModule,
        PaperScreenedRoutingModule,
        SharedModule,
        TableModule
    ]
})
export class PaperScreenedModule { }
