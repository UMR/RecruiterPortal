import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditAgreementComponent } from './add-edit-agreement.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
            component: AddEditAgreementComponent
            }
        ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditAgreementRoutingModule { }
