import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { SharedModule } from '../../common/shared.module';
import { TableModule } from 'primeng/components/table/table';
import { RoleService } from './role.service';


@NgModule({
    declarations: [RoleComponent],
    imports: [
        CommonModule,
        RoleRoutingModule,
        SharedModule,
        TableModule
    ],
    providers: [RoleService]
})
export class RoleModule { }
