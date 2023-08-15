import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditTermsConditionsComponent } from './add-edit-terms-conditions.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: AddEditTermsConditionsComponent
      }
    ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditTermsConditionsRoutingModule { }
