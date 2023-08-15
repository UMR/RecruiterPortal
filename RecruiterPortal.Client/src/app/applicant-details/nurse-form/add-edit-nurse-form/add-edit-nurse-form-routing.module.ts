import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditNurseFormComponent } from './add-edit-nurse-form.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: AddEditNurseFormComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditNurseFormRoutingModule { }
