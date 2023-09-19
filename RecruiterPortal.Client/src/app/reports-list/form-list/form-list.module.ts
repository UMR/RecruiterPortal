import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormListRoutingModule } from './form-list-routing.module';
import { FormListComponent } from './form-list.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';


@NgModule({
    declarations: [FormListComponent],
    imports: [
        CommonModule,
        FormListRoutingModule,
        SharedModule,
        TableModule
    ]
})
export class FormListModule { }
