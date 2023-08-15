import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUscisComponent } from './add-edit-uscis.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: AddEditUscisComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditUscisRoutingModule { }
