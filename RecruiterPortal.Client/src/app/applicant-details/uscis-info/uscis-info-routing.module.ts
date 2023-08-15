import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UscisInfoComponent } from './uscis-info.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: UscisInfoComponent
      },
      {
        path: 'add-edit-uscis', loadChildren: './add-edit-uscis/add-edit-uscis.module#AddEditUscisModule'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UscisInfoRoutingModule { }
