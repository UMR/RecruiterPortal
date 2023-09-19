import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormListRoutingModule } from './form-list-routing.module';
import { FormListComponent } from './form-list.component';
import { SharedModule } from '../../common/shared.module';


@NgModule({
    declarations: [FormListComponent],
    imports: [
        CommonModule,
        FormListRoutingModule,
        SharedModule
    ]
})
export class FormListModule { }
