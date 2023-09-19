import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionListRoutingModule } from './institution-list-routing.module';
import { InstitutionListComponent } from './institution-list.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';


@NgModule({
    declarations: [InstitutionListComponent],
    imports: [
        CommonModule,
        InstitutionListRoutingModule,
        SharedModule,
        TableModule
    ]
})
export class InstitutionListModule { }
