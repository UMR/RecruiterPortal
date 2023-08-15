import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NurseFormComponent } from './nurse-form.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: NurseFormComponent
      },
      {
        path: 'add-edit-nurse-form', loadChildren: './add-edit-nurse-form/add-edit-nurse-form.module#AddEditNurseFormModule'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseFormRoutingModule { }
