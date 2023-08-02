import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPhysicalInfoComponent } from './edit-physical-info.component';

const routes: Routes = [{ path: '', component: EditPhysicalInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPhysicalInfoRoutingModule { }
