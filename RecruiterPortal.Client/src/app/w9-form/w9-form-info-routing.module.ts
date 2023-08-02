import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { W9FormInfoComponent } from './w9-form-info.component';

const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: W9FormInfoComponent
      },
      {
        path: 'add-edit-w9', loadChildren: './add-edit-w9/add-edit-w9.module#AddEditW9Module'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class W9FormInfoRoutingModule { }
