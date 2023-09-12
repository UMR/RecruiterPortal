import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddApplicantComponent } from './add-applicant.component';



const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: AddApplicantComponent
            }
        ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddApplicantRoutingModule { }
