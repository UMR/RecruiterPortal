import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionListRoutingModule } from './institution-list-routing.module';
import { InstitutionListComponent } from './institution-list.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { AddInstitutionModule } from '../../quick-add/add-institution/add-institution.module';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    declarations: [InstitutionListComponent],
    imports: [
        CommonModule,
        InstitutionListRoutingModule,
        SharedModule,
        TableModule,
        AddInstitutionModule,
        DialogModule
    ]
})
export class InstitutionListModule { }
