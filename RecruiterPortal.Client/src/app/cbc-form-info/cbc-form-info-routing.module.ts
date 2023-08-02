import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CBCFormInfoComponent } from './cbc-form-info.component';

const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: CBCFormInfoComponent
      },
      {
        path: 'add-edit-cbc', loadChildren: './add-edit-cbc/add-edit-cbc.module#AddEditCBCModule'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CBCFormInfoRoutingModule { }
