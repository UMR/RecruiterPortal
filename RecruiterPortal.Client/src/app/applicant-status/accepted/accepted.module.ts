import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptedRoutingModule } from './accepted-routing.module';
import { AcceptedComponent } from './accepted.component';
import { SharedModule, DialogModule, MessageService } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import { StatusModule } from '../status/status.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [AcceptedComponent],
  imports: [
    CommonModule,
      AcceptedRoutingModule,
        SharedModule,
        TableModule,
        StatusModule,
        DialogModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class AcceptedModule { }
