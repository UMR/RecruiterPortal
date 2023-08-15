import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalInfoComponent } from './physical-info.component';

const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: PhysicalInfoComponent
      },
      {
        path: 'edit', loadChildren: './edit-physical-info/edit-physical-info.module#EditPhysicalInfoModule'
      }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhysicalInfoRoutingModule { }
