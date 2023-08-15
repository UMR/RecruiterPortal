import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: TermsConditionsComponent
      },
      {
        path: 'add-edit-terms-conditions', loadChildren: './add-edit-terms-conditions/add-edit-terms-conditions.module#AddEditTermsConditionsModule'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionsRoutingModule { }
