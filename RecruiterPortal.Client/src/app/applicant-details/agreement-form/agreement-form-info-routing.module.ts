import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgreementFormInfoComponent } from './agreement-form-info.component';

const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: AgreementFormInfoComponent
      },
      {
        path: 'add-edit-agreement', loadChildren: './add-edit-agreement/add-edit-agreement.module#AddEditAgreementModule'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementFormInfoRoutingModule { }
