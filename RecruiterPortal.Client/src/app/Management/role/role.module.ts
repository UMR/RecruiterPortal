import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { SharedModule } from '../../common/shared.module';


@NgModule({
    declarations: [RoleComponent],
    imports: [
        CommonModule,
        RoleRoutingModule,
        SharedModule
    ]
})
export class RoleModule { }
